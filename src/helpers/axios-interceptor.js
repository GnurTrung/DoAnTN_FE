import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/authentication";
import { ACCOUNT_ADDRESS } from "../constants/wallets";
import { getData } from "../utils/storage-utils";
import { cookieSetting } from "utils/cookie-utils";

function getCookie(name = "access_token") {
  const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

let isRefreshing = false;
let failedQueue = [];

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

async function refreshToken() {
  try {
    const refreshToken = getCookie(REFRESH_TOKEN);
    const accessToken = getCookie(ACCESS_TOKEN);
    const address = getData(ACCOUNT_ADDRESS);
    // console.log('ACCOUNT_ADDRESS', address);
    const data = {
      accessToken,
      refreshToken,
      address,
    };
    return axios({
      method: "POST",
      // url: "http://localhost:8000/api/auth/refresh_token",
      url: process.env.REACT_APP_API_URL + "/auth/refresh_token",
      data,
    });
  } catch (ex) {
    console.log(ex);
  }
}

function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    // add other defaults here if necessary
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function refreshTokenFunc(error) {
  // const { response, config } = error;
  return refreshToken()
    .then((response) => {
      const { data } = response;
      // if (!data)
      //     return Promise.reject(error)
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;
      const expireIn = data.expires_in || 86400;
      //const config = response.config;
      if (accessToken && refreshToken) {
        //save token
        setCookie(ACCESS_TOKEN, accessToken, cookieSetting);

        setCookie(REFRESH_TOKEN, refreshToken, cookieSetting);
      }
      return response;
    })
    .catch(() => {
      return 0;
    });
}

AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response, config } = error;
    if (response) {
      const { status } = response;
      if (status === 401 && getCookie("refresh_token") && !config._retry) {
        // 401
        // get new token
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              config.headers["Authorization"] = "Bearer " + token;
              return axios(config);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        config._retry = true;
        isRefreshing = true;

        return refreshToken()
          .then((response) => {
            const { data } = response;

            if (!data || !data.success) return Promise.reject(error);
            const accessToken = data.data.token;
            const refreshToken = data.data.refreshToken;
            const expireIn = data.data.expires_in || 3600;
            //const config = response.config;

            if (accessToken && refreshToken) {
              //save token
              setCookie(ACCESS_TOKEN, accessToken, cookieSetting);

              setCookie(REFRESH_TOKEN, refreshToken, cookieSetting);

              processQueue(null, accessToken);

              if (config) {
                config.headers["Authorization"] = "Bearer " + accessToken;
                return AxiosInstance(config);
              }
            } else return Promise.reject(error);
          })
          .catch((err) => {
            processQueue(err, null);
            return Promise.reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        return response;
      }
    } else return Promise.reject(error);
  }
);

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie();
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
export default AxiosInstance;
