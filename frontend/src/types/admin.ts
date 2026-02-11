import type  { IMovieBase } from './common';

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

export interface IStatsMovie extends IMovieBase {
	revenue: number;
	ticketsSold: number;
	director: string;
	releaseYear: number;
	imdbRating: number;
	genres: string[];
	country: string;
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
	color: string;
}

export interface PopularMoviesParams {
	DateFrom?: string;
	DateTo?: string;
	Amount?: number;
	HallId?: number;
	GenreId?: number;
	Director?: string;
	Country?: string;
	MinImdbRating?: number;
	AgeRatingValue?: number;
}

export interface IFilterItem {
	id: number;
	name: string;
}

export interface ISoldTicket {
	id: number;
	movieTitle: string;
	seatNumber: string;
	price: number;
	discountCode?: number | null;
	discountAmount: number;
	soldAt: string;
}

export interface IDiscountSummary {
	code: string;
	count: number;
}

export interface IDiscountStats {
	id?: number;
	name?: string;
	promotionName?: string;
	code?: string;
	count?: number;
}