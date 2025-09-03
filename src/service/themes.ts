// src/service/themes.ts - Update the useThemes hook and add a new hook for theme details
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import api from "./api";
import type { Theme, ThemesResponse } from "../types/themes";
import type { ThemeDetail } from "../types/themeDetail";

export function useThemes(subjectName: string) {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subjectName) return;

    const fetchThemes = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("access_token");
        const response = await api.get<ThemesResponse>(
          `themes/?subject__name=${encodeURIComponent(subjectName)}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setThemes(response.data.results);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, [subjectName]);

  return { themes, loading, error };
}

// New hook for fetching theme details
export function useThemeDetail(themeId: string | undefined) {
  const [theme, setTheme] = useState<ThemeDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!themeId) return;

    const fetchThemeDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("access_token");
        const response = await api.get<ThemeDetail>(`themes/${themeId}/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setTheme(response.data);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchThemeDetail();
  }, [themeId]);

  return { theme, loading, error };
}
