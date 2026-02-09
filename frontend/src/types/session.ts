export type IdType = number | string;

export interface Session {
	id: number;
	movieId: number;
	hallId: number;
	startTime: string;
	price: number;
}

export interface SessionDisplay {
	id: number;
	time: string;
	hallName?: string;
	hallFormat?: string;
	price?: number;
}

export interface IMovieScheduleItem {
	date: string;
	sessions: SessionDisplay[];
}

export type SessionData = Omit<Session, 'id'>;