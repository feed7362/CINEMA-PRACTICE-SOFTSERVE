import axiosClient from './axiosClient';

export const getMe = () =>
  axiosClient.get('/auth/me').then(r => r.data);

export const getMyTickets = (page = 1, pageSize = 50) =>
  axiosClient.get('/ticket', {
    params: { page, pageSize }
  }).then(r => r.data);

export const getMyBookings = (page = 1, pageSize = 50) =>
  axiosClient.get('/booking', {
    params: { page, pageSize }
  }).then(r => r.data);
