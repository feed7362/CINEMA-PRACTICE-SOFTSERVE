export interface IMovie {
  id: string;
  title: string;
  poster: string;
  ageRating: string;
  sessions?: string[];
  hall?: string;
}

export interface MovieCardProps {
  movie: IMovie;
  isBlurred?: boolean;
}

export interface MoviePreviewProps {
  id: string;
  title: string;
  poster: string;
  releaseDate: string;
  ageRating: string;
  isBlurred?: boolean;
}

export interface IMovieScheduleItem {
  date: string;
  times: string[];
}

export interface IMovieDetails {
  id: string;
  title: string;
  poster: string;
  ageRating: string;
  originalTitle: string;
  director: string;
  year: number | string;
  country: string;
  genre: string;
  rating: number;
  language: string;
  subtitles: string;
  cast: string[] | string;
  description: string;
  schedule: IMovieScheduleItem[];
  trailerUrl?: string;
}