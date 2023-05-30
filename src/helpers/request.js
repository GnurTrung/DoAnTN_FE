// import Axios from 'axios';
import { getCookie } from "../utils/cookie-utils";
import AxiosInstance from "./axios-interceptor";
import axios from "axios";

export async function postFormAsync(url, body, config = {}) {
  let response;
  try {
    response = await AxiosInstance({
      method: "POST",
      url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: body,
      config,
    });
    const { status, data } = response;
    return Promise.resolve({ status, data });
  } catch (ex) {
    const { status = 400, data = {} } = ex?.response || {};
    return Promise.resolve({ status, data });
  }
}

export async function getAsync(url, param) {
  try {
    const response = await AxiosInstance.get(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      params: param,
    });

    return response;
  } catch (ex) {
    const { status = 400, data = {} } = ex?.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: {},
      message: error[0]?.message || "",
      code: error[0]?.code || 0,
    };
  }
}

export async function getCMSAsync(url, param) {
  try {
    const response = await axios.get(url, {
      headers: {
        // Authorization: "Bearer " + getCMSCookie(),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      params: param,
    });

    return response;
  } catch (ex) {
    const { status = 400, data = {} } = ex?.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: {},
      message: error[0]?.message || "",
      code: error[0]?.code || 0,
    };
  }
}

export async function patchAsync(url, data) {
  try {
    let formData = new FormData();
    for (const i in data) {
      formData.append(i, data[i]);
    }
    const response = await AxiosInstance.patch(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (ex) {
    const { status = 400, data = {}, errors = [] } = ex?.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || "",
    };
  }
}

export async function patchNormalAsync(url, data) {
  try {
    const response = await AxiosInstance.patch(url, data);
    return response;
  } catch (ex) {
    const { status = 400, data = {}, errors = [] } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || "",
    };
  }
}

export async function patchFormAsync(url, data) {
  try {
    let formData = new FormData();
    for (const i in data) {
      formData.append(i, data[i]);
    }
    const response = await AxiosInstance.patch(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (ex) {
    const { status = 400, data = {}, errors = [] } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || "",
    };
  }
}

export async function deleteAsync(url) {
  try {
    const response = await AxiosInstance.delete(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (ex) {
    const { status = 400, data = {}, errors = [] } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || "",
    };
  }
}

export async function postAsync(url, data) {
  try {
    const response = await AxiosInstance.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization" :   `Bearer ` + getCookie() 
      },
    });
    return response;
  } catch (ex) {
    const { status = 400, data = {}, errors = [] } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || "",
    };
  }
}

export async function putAsync(url, data) {
  try {
    const response = await AxiosInstance.put(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (ex) {
    const { status = 400, data = {}, errors = [] } = ex.response || {};
    const error = data?.errors || [];
    return {
      status,
      data: ex?.response?.data || {},
      errors,
      message: error[0]?.message || "",
    };
  }
}
