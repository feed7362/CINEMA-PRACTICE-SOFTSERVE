import type { IMovieBase } from './common';
import type {IMovieScheduleItem } from './session';
import type { SessionDisplay } from "./session";

export interface MoviePreviewProps {
    movie: IMovieCard & { 
        sessions?: SessionDisplay[] 
    };
    isBlurred?: boolean;
}

export interface IMovieCard extends IMovieBase {
    rating?: number;
    genres?: string[];
    isBlurred?: boolean;
    releaseDate?: string;
    hall?: string;
}

export interface IMovieDetails extends IMovieBase {
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
    status?: string;
    genreIds?: number[];
    actorIds?: number[];
    studioId?: number;
    schedule: IMovieScheduleItem[];
    rating: number;
}