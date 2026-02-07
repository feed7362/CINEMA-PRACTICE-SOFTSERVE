export interface Session {
    id: number;
    movieId: number;
    hallId: number;
    hallName: string;
    hallFormat: string;
    startTime: string;
    endTime: string;
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