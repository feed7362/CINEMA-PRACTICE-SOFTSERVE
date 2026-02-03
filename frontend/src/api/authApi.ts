import axiosClient from './axiosClient';

export const login = async (email: string, password: string) => {
  const res = await axiosClient.post('/auth/login', {
    email,
    password,
  });

  return res.data;
};

export const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    recaptchaToken: string
) => {
  const res = await axiosClient.post('/auth/register', {
    name,
    email,
    password,
    confirmPassword,
    recaptcha_token: recaptchaToken,
  });

  return res.data;
};