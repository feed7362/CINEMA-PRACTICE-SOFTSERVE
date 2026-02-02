import axiosClient from './axiosClient';

export const login = async (email: string, password: string) => {
  const res = await axiosClient.post('/auth/login', {
    email,
    password,
  });

  return res.data;
};

export const register = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  const res = await axiosClient.post('/auth/register', {
    email,
    password,
    confirmPassword,
  });

  return res.data;
};
