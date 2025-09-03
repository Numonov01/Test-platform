import { useState } from "react";
import axios, { AxiosError } from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface LoginError {
  detail?: string;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (
    username: string,
    password: string
  ): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<LoginResponse>(`${API_URL}login/`, {
        username,
        password,
      });
      const { access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      return access;
    } catch (err) {
      const axiosError = err as AxiosError<LoginError>;
      const message =
        axiosError.response?.data?.detail || "Login muvaffaqiyatsiz bo‘ldi";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
}
