export interface IMovie {
    id: number | string;
    title: string;
    poster: string;
    ageRating: string | number;
    hall?: string;
    sessions?: { id: number; time: string; price?: number }[];
    genres?: string[];
    duration?: number;
    year?: number;
    rating?: number;
    imageUrl?: string;
}

export interface IMovieDetails extends IMovie {
    originalTitle: string;
    titleUkr?: string;
    titleOrg?: string; 
    director: string;
    country: string;
    genre: string;
    language: string;
    subtitles: string | boolean;
    cast: string[];
    description: string;
    trailerUrl: string;
    releaseDate?: string;
    finishDate?: string;
    genreIds?: number[];
    actorIds?: number[];
    studioId?: number;
}

export interface CreateMovie {
    id?: number;
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

export interface Session {
    id: number;
    movieId: number;
    hallId: number;
    startTime: string;
    price: number;
}

export type SessionData = Omit<Session, "id">;

export interface IMovieScheduleItem {
    date: string;
    sessions: { id: number; time: string; price?: number }[];
}

export interface RevenueResponse {
    totalRevenue: number;
}

export interface OccupancyResponse {
    occupancyPercentage: number;
}

export interface SpecialTicketsResponse {
    specialTicketsCount: number;
}

export interface RevenuePoint {
    date: string;
    amount: number;
}

export interface HeatmapSeat {
    row: number;
    number: number;
    purchaseCount: number;
    color: 'Red' | 'Blue' | string;
}

export interface PopularMoviesParams {
    DateFrom?: string;
    DateTo?: string;
    HallId?: number;
    GenreId?: number;
    Director?: string;
    Country?: string;
    MinImdbRating?: number;
    AgeRatingValue?: number;
    Amount?: number;
}