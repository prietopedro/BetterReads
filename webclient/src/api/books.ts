import axiosWithCredentials from './axios';
import { Book } from './userbooks';

export type BookWithDetails = {
  id: string;
  thumbnail: string;
  title: string;
  authors: string[];
  average_rating: number;
  ISBN10: string;
  favorited: boolean;
  status: string;
  googleID: string;
  rating: number;
  subtitle: string;
  description: string;
  publisher: string;
  ISBN13: string;
  length: number;
  categories: string[];
  userRating: number;
};
export type FetchBooksParams = {
  page: number;
  search: string;
};
type BookWithDetailsAxiosResponse = {
  data: { book: BookWithDetails };
};

export type BooksAxiosResponse = {
  data: Book[];
  totalItems: number;
};

export const fetchBook = async (id: string | undefined) => {
  const res = await axiosWithCredentials.get<BookWithDetailsAxiosResponse>(
    `api/books/${id}`,
  );
  return res.data.data.book;
};

export const fetchBooks = async ({ page, search }: FetchBooksParams) => {
  const url = new URL('api/books', 'http://localhost:3000');
  url.searchParams.append('page', page.toString());
  url.searchParams.append('search', search);
  const res = await axiosWithCredentials.get<BooksAxiosResponse>(
    url.toString(),
  );
  return res.data;
};

export default {
  fetchBook,
  fetchBooks,
};
