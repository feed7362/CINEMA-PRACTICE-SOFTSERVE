export interface ISession {
  time: string;
  price?: number;
}

export interface IScheduleEntry {
  date: string;
  times: string[];
}

export interface IMovie {
  id: number;
  title: string;
  poster: string;
  ageRating: string;
  sessions: string[];
  fullSchedule?: IScheduleEntry[];
}

export interface MovieCardProps {
  movie: IMovie;
  isBlurred?: boolean;
}

export interface MovieScheduleProps {
  schedule: IScheduleEntry[];
}

export interface MoviePreviewProps {
  id: number;
  title: string;
  poster: string;
  releaseDate: string;
  ageRating: string;
  isBlurred?: boolean;
}