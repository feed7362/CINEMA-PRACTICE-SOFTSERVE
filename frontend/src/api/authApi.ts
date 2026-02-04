import axiosClient from './axiosClient';

export const login = async (email: string, password: string) => {
  const res = await axiosClient.post('/auth/login', {
    email,
    password,
  });

  return res.data;
};

export const externalLogin = async (idToken: string) => {
  try {
    const response = await axiosClient.post(`/auth/external-login`, {
      idToken: idToken
    });
    if (response.data.token && response.data.email) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
    }

    return response.data;
  } catch (error) {
    console.error("Google Login Handshake Failed:", error);
    throw error;
  }
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