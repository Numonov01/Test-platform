export interface Author {
  first_name: string;
  last_name: string;
  profile_photo: string | null;
}

export interface Subject {
  id: string;
  name: string;
  category: {
    name: string;
  };
  theme_count: number;
  authors: Author[];
  description: string;
}

export interface SubjectsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Subject[];
}
