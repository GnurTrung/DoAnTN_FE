import { useState } from "react";
import { useCookies } from "react-cookie";
import { authenticate } from "services/authentication";
import {
  ACCESS_TOKEN,
  MESSAGE_BYTES,
  REFRESH_TOKEN,
  SIGNATURE,
} from "../constants/authentication";
import { cookieSetting } from "utils/cookie-utils";

const useAuthentication = () => {
  const [, setCookie, removeCookie] = useCookies(ACCESS_TOKEN);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const saveCookie = (name, value, expires) => {
    const options = { path: "/" };
    expires &&
      (options.expires = new Date(new Date().getTime() + expires * 1000));
    setCookie(name, value, { ...options, ...cookieSetting });
  };

  const login = async (options) => {
    try {
      const { status, data } = await authenticate(options);
      if (status === 200) {
        const {
          data: { token, refreshToken },
        } = data;
        token && saveCookie(ACCESS_TOKEN, token);
        refreshToken && saveCookie(REFRESH_TOKEN, refreshToken);
        saveCookie(MESSAGE_BYTES, options.messageBytes);
        saveCookie(SIGNATURE, options.signature);
        setIsAuthenticated(true);
        //setTimeout(() => window.location.reload(), 50)
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const logout = () => {
    try {
      removeCookie(ACCESS_TOKEN, cookieSetting);
      removeCookie(REFRESH_TOKEN, cookieSetting);
      removeCookie(MESSAGE_BYTES, cookieSetting);
      removeCookie(SIGNATURE, cookieSetting);
      setIsAuthenticated(false);
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    } catch (ex) { }
  };

  return { login, logout, isAuthenticated };
};

export default useAuthentication;
