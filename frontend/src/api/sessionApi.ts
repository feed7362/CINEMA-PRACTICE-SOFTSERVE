import axiosClient from './axiosClient';

export interface ReadSessionDto {
export interface CreateSessionDto {
    movieId: number;
    hallId: number;
    startTime: string;
}

export interface UpdateSessionDto {
    id: number;
    movieId: number;
    hallName: string;
    hallFormat: string;
    startTime: string;
    endTime: string;
}

const formatEnum = (val: string) => val?.startsWith('_') ? val.substring(1) : val;

export const sessionApi = {
    createSession: async (data: CreateSessionDto) => {
        return axiosClient.post('/session', data).then(r => r.data);
    },

    getAllSessions: async () => {
        return axiosClient.get('/session').then(r => r.data);
    },

    updateSession: async (data: UpdateSessionDto) => {
        return axiosClient.put('/session', data).then(r => r.data);
    },
    getSessionById: async (id: number): Promise<ReadSessionDto> => {
        const response = await axiosClient.get<ReadSessionDto>(`/session/${id}`);
        const data = response.data;

    deleteSession: async (id: number) => {
        return axiosClient.delete(`/session/${id}`).then(r => r.data);
        return {
            ...data,
            hallFormat: formatEnum(data.hallFormat)
        };
    },
};
