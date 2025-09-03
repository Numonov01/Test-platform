// src/types/themes.ts - Update types to include ThemeDetail
export interface Theme {
  id: string;
  name: string;
  description: string;
  duration: number;
  subject: string;
}

export interface ThemesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Theme[];
}

export interface Author {
  first_name: string;
  last_name: string;
  profile_photo: string | null;
}

export interface Category {
  name: string;
}

export interface Subject {
  id: string;
  name: string;
  category: Category;
  theme_count: number;
  authors: Author[];
  description: string;
}

export interface ThemeDetail {
  id: string;
  subject: Subject;
  created: string;
  updated: string;
  name: string;
  duration: number;
  description: string;
  full_html_file: string;
}
