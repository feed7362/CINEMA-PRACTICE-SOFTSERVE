export interface IMovie {
    id: string | number;
    title: string;
    poster: string;
    ageRating: string;
    sessions?: Session[];
    hall?: string;
}

export interface MovieCardProps {
    movie: IMovie;
    isBlurred?: boolean;
}

export interface Session {
    id: number;
    time: string;
}

export interface MoviePreviewProps {
    id: string | number;
    title: string;
    poster: string;
    releaseDate: string;
    ageRating: string;
    isBlurred?: boolean;
}

export interface IMovieScheduleItem {
    date: string;
    sessions: Session[];
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
    rating: number | string;
    language: string;
    subtitles: string;
    cast: string[];
    description: string;
    schedule?: IMovieScheduleItem[];
    trailerUrl?: string;
}