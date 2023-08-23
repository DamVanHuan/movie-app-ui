import { Constant } from "../consts/constant";

const API_ROOT = process.env.REACT_APP_API_URL;

export const method = {
  get: "get",
  post: "post",
  put: "put",
  delete: "delete"
};

const generalMessage = "An error has occur, please try again";

const callApi = async (path, method, headers, body) => {
  const url = `${API_ROOT}${path}`;
  try {
    const resp = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });

    const status = resp.status;
    let data = await resp.json();

    let success = false;
    let error = {
      code: "error",
      message: generalMessage
    };

    if (resp.ok) {
      success = true;
    } else if (status === 400) {
      error = data;
    } else if (status === 401) {
      error = data;
    } else if (status === 403) {
      error = data;
    } else if (status === 404) {
      error = data;
    } else if (status >= 500) {
    }

    return success ? { success, data } : { success, error };
  } catch (err) {
    return {
      success: false,
      error: { code: "error", message: err.message || generalMessage }
    };
  }
};

export const publicApi = async (path, method = "get", body = null) => {
  const headers = { "Content-Type": "application/json" };
  return await callApi(path, method, headers, body);
};

export const privateApi = async (path, method, body = null) => {
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getCache(Constant.storageKey.token);
  headers["Authorization"] = `Bearer ${token}`;

  return await callApi(path, method, headers, body);
};
