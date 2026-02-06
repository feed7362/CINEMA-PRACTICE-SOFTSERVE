export interface Session {
    id: number;
    movieId: number;
    hallId: number;
    startTime: string;
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