import axiosClient from './axiosClient';

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

    deleteSession: async (id: number) => {
        return axiosClient.delete(`/session/${id}`).then(r => r.data);
    },
};
