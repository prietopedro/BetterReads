import axiosWithCredentials from './axios';
import {
  FetchBooksParams,
  BookWithDetailsAxiosResponse,
  BooksAxiosResponse,
} from '../types';

export const fetchBook = async (id: string | undefined) => {
  const res = await axiosWithCredentials.get<BookWithDetailsAxiosResponse>(
    `api/books/${id}`,
  );
  return res.data.data.book;
};

export const fetchBooks = async ({ page, search }: FetchBooksParams) => {
  const res = await axiosWithCredentials.get<BooksAxiosResponse>(
    `api/books?page=${page}&search=${search}`,
  );
  return res.data;
};

export default {
  fetchBook,
  fetchBooks,
};
