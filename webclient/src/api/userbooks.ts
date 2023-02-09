import axiosWithCredentials from './axios';

export type Book = {
  id: string;
  thumbnail: string;
  title: string;
  authors: string;
  average_rating: number;
  ISBN10: string;
  favorited: boolean;
  status: string;
  googleID: string;
  rating: number;
  userRating: number;
};
export type EditUserBook = {
  userbookID: string;
  rating?: number;
  favorited?: boolean;
  status?: string;
};
export type AddUserBook = {
  googleID: string;
  rating?: number;
  favorited?: boolean;
  status?: string;
};

type UserBooksAxiosResponse = {
  data: { books: Book[] };
};
type UserBookAxiosResponse = {
  data: { book: Book };
};

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
