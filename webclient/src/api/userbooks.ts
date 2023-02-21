import {
  AddUserBook,
  EditUserBook,
  UserBookAxiosResponse,
  UserBooksAxiosResponse,
} from '../types';
import axiosWithCredentials from './axios';

export const fetchUserBooks = async () => {
  const res = await axiosWithCredentials.get<UserBooksAxiosResponse>(
    'api/users/books',
  );
  return res.data.data.books;
};
export const deleteUserBook = async (id: string) => {
  await axiosWithCredentials.delete<UserBooksAxiosResponse>(
    `api/users/books/${id}`,
  );
  return true;
};
export const addUserBook = async (params: AddUserBook) => {
  const res = await axiosWithCredentials.post<UserBookAxiosResponse>(
    `api/users/books`,
    params,
  );
  return res.data.data.book;
};
export const editUserBook = async (params: EditUserBook) => {
  const { userbookID, ...rest } = params;
  const res = await axiosWithCredentials.put<UserBookAxiosResponse>(
    `api/users/books/${userbookID}`,
    rest,
  );
  return res.data.data.book;
};

export default {
  fetchUserBooks,
  deleteUserBook,
  editUserBook,
  addUserBook,
};
