export type IdType = number | string;

export interface Option {
	value: string;
	label: string;
}

export interface IMovieBase {
	id: IdType;
	title: string;
	imageUrl?: string;
	ageRating: number | string;
	duration?: number;
	year?: number;
}