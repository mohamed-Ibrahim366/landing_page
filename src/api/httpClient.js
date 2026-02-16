import axios from "axios";

const LOCAL_API_BASE_URL = "http://localhost:8000/api/v1";
const PROD_API_BASE_URL = "https://api.sijill.gov/api/v1";

export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === "string") {
    return envUrl.replace(/\/+$/, "");
  }

  const hostname = window.location.hostname;
  const isLocalHost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1";

  return isLocalHost ? LOCAL_API_BASE_URL : PROD_API_BASE_URL;
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response.data,
  (axiosError) => {
    const payload = axiosError?.response?.data;
    const status = axiosError?.response?.status;
    const message =
      typeof payload?.message === "string"
        ? payload.message
        : Array.isArray(payload?.message)
          ? payload.message.join(", ")
          : axiosError.message || "Request failed";

    const error = new Error(message);
    error.status = status;
    error.payload = payload;
    return Promise.reject(error);
  }
);

export default api;
