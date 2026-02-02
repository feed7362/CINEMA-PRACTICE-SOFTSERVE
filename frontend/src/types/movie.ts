// src/types/movie.ts

export interface IMovie {
  id: string | number; // Дозволяємо number, бо з БД приходить int
  title: string;
  poster: string;
  ageRating: string;
  sessions?: string[]; // Масив часів: ["10:00", "14:30"]
  hall?: string;
}

export interface MovieCardProps {
  movie: IMovie;
  isBlurred?: boolean;
}

export interface MoviePreviewProps {
  id: string | number;
  title: string;
  poster: string;
  releaseDate: string;
  ageRating: string;
  isBlurred?: boolean;
}

// Тип для одного дня розкладу на детальній сторінці
export interface IMovieScheduleItem {
  date: string;  // "02.05" або "Понеділок"
  times: string[]; // ["10:00", "15:00"]
}

export interface IMovieDetails {
  id: string | number;
  title: string;
  poster: string;
  ageRating: string;
  originalTitle: string;
  director: string;
  year: number | string;
  country: string;
  genre: string;
  
  // 👇 ВИПРАВЛЕНО: Рейтинг може бути числом (8.5) або рядком ("Відсутній")
  rating: number | string; 
  
  language: string;
  subtitles: string;
  
  // 👇 ВИПРАВЛЕНО: Масив рядків (імен акторів)
  cast: string[]; 
  
  description: string;
  
  // 👇 Розклад може бути відсутнім або пустим
  schedule?: IMovieScheduleItem[]; 
  
  trailerUrl?: string;
}