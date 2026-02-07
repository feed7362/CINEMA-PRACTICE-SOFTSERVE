import axiosClient from './axiosClient';

export interface ReadSessionDto {
    id: number;
    movieId: number;
    hallId: number;
    hallName: string;
    hallFormat: string;
    startTime: string;
    endTime: string;
}

export interface CreateSessionDto {
    movieId: number;
    hallId: number;
    startTime: string;
}

export interface UpdateSessionDto {
    id: number;
    movieId: number;
    hallId: number;
    startTime: string;
}

const formatEnum = (val: string) => val?.startsWith('_') ? val.substring(1) : val;

export const sessionApi = {
    createSession: async (data: CreateSessionDto) => {
        return axiosClient.post('/session', data).then(r => r.data);
    },

    getAllSessions: async (): Promise<ReadSessionDto[]> => {
        const response = await axiosClient.get<ReadSessionDto[]>('/session');
        return response.data.map(session => ({
            ...session,
            hallFormat: formatEnum(session.hallFormat)
        }));
    },

    updateSession: async (data: UpdateSessionDto) => {
        return axiosClient.put('/session', data).then(r => r.data);
    },

    getSessionById: async (id: number): Promise<ReadSessionDto> => {
        const response = await axiosClient.get<ReadSessionDto>(`/session/${id}`);
        const data = response.data;

        return {
            ...data,
            hallFormat: formatEnum(data.hallFormat)
        };
    },

    deleteSession: async (id: number) => {
        return axiosClient.delete(`/session/${id}`).then(r => r.data);
    },
};