import axiosClient from './axiosClient';

export interface CreateHallDto {
	name: string;
	format: number;
}

export const hallApi = {
	createHall: async (data: CreateHallDto) => {
		return axiosClient.post('/hall', data).then((r) => r.data);
	},

	getAllHalls: async () => {
		return axiosClient.get('/hall').then((r) => r.data);
	},

	updateHall: async (data: { id: number | undefined; name: string; format: number; seatMap: string[] }) => {
		return axiosClient.put('/hall', data).then((r) => r.data);
	},

	deleteHall: async (id: number) => {
		return axiosClient.delete(`/hall/${id}`).then((r) => r.data);
	},
};
