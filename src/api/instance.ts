import axios from "axios";
import { error } from "console";
const API_URL = "https://petstore.swagger.io/v2";
export const apiClient = axios.create({
  baseURL: API_URL,
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["api_key"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("api_key");
      return Promise.reject(error);
    }
  }
);
