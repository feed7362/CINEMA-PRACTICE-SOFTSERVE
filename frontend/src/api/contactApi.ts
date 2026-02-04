import axiosClient from './axiosClient';

export interface CreateContactDto {
  name: string;
  email: string;
  message: string;
}

export const contactApi = {
  sendMessage: async (data: CreateContactDto) => {
    return await axiosClient.post('/contact', data);
  }
};