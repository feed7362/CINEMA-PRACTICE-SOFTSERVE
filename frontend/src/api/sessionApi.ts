import axiosClient from './axiosClient';

export interface ReadSessionDto {
    id: number;
    movieId: number;
    hallName: string;
    hallFormat: string;
    startTime: string;
    endTime: string;
}

const formatEnum = (val: string) => val?.startsWith('_') ? val.substring(1) : val;

export const sessionApi = {
    getSessionById: async (id: number): Promise<ReadSessionDto> => {
        const response = await axiosClient.get<ReadSessionDto>(`/session/${id}`);
        const data = response.data;

        return {
            ...data,
            hallFormat: formatEnum(data.hallFormat)
        };
    },
};