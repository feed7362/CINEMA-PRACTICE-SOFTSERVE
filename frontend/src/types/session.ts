export interface Session {
  id: number;
  movieId: string;
  hallId: string;
  time: string;
  date: string;
  price: number;
  hallFormat: string;
}

export interface SessionData {
  movieId: number;
  hallId: number;
  startTime: string;
  price: number;
}

export interface SessionFormData {
    movieId: string;
    hallId: string;
    time: string;
    date: string;
}

export interface Option {
    value: string;
    label: string;
}