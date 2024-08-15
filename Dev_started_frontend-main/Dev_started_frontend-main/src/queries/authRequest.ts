import axios, { AxiosRequestConfig } from "axios";
import { getToken } from "../utils/auth";

export default function authRequest(config: AxiosRequestConfig) {
  const token = getToken();
  config.headers = config.headers || {};
  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }

  return axios(config);
}
