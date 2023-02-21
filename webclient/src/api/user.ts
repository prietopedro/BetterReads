import { LoginData, RegisterData } from '../types';
import axiosWithCredentials from './axios';

export const userLogin = async ({ email, password }: LoginData) => {
  const res = await axiosWithCredentials.post('api/users/login', {
    email,
    password,
  });
  return res.data;
};
export const userRegister = async ({ email, password }: RegisterData) => {
  const res = await axiosWithCredentials.post('api/users/signup', {
    email,
    password,
  });
  return res.data;
};
export const userLogout = async () => {
  const res = await axiosWithCredentials.post('api/users/logout');
  return res.data;
};
export const getMe = async () => {
  const res = await axiosWithCredentials.get('api/users/me');
  return res.data;
};
export default {
  userLogin,
  userRegister,
  getMe,
  userLogout,
};
