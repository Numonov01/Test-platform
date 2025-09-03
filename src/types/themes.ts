export interface Theme {
  id: string;
  name: string;
  description: string;
  duration: number;
}

export interface ThemesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Theme[];
}
