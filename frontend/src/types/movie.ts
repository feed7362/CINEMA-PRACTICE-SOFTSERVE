export interface IMovie {
    id: number | string;
    title: string;
    poster: string;
    ageRating: string;
    hall?: string;
    sessions?: { id: number; time: string }[];
    genres?: string[];
    duration?: number;
    year?: number;
    rating?: number;
}

export interface IMovieDetails extends IMovie {
    originalTitle: string;
    director: string;
    country: string;
    genre: string;
    language: string;
    subtitles: string;
    cast: string[];
    description: string;
    schedule: IMovieScheduleItem[];
    trailerUrl: string;
}

export interface MoviePreviewProps {
    id: number | string;
    title: string;
    poster: string;
    ageRating: string;
    releaseDate: string;
    isBlurred: boolean;
    rating: number;
}

export interface Session {
    id: number;
    time: string;
    hallName: string;
    hallFormat: string;
}

export interface IMovieScheduleItem {
    date: string;
    sessions: Session[];
}

export interface CreateMovie {
    studioId: number;
    titleOrg: string;
    titleUkr: string;
    description: string;
    duration: number;
    releaseDate: string; 
    finishDate: string; 
    ageRating: number;
    imdbRating: number;
    director: string;
    country: string;
    subtitles: boolean;
    imageUrl: string;
    trailerUrl: string;
    genreIds: number[];
    actorIds: number[];
}