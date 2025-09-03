// src/service/subjects.ts
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import api from "./api";
import type { Subject, SubjectsResponse } from "../types/subjects";

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("access_token");
        const response = await api.get<SubjectsResponse>(`subjects/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setSubjects(response.data.results);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return { subjects, loading, error };
}
