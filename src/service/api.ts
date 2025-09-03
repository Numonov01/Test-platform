import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const res = await axios.post<{ access: string }>(
            `${API_URL}refresh/`,
            { refresh: refreshToken }
          );

          const newAccess = res.data.access;
          localStorage.setItem("access_token", newAccess);

          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
          }

          return api(originalRequest);
        } catch {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login"; // refresh ishlamasa -> login sahifa
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
