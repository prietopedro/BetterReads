import axiosWithCredentials from './axios';

export type BookWithDetails = {
  id: string;
  thumbnail: string;
  title: string;
  authors: string[];
  average_rating: number;
  ISBN10: string;
  favorited: boolean;
  status: string;
  userbookID: string;
  rating: number;
  subtitle: string;
  description: string;
  publisher: string;
  ISBN13: string;
  length: number;
  categories: string[];
  userRating: number;
};
type BookWithDetailsAxiosResponse = {
  data: { book: BookWithDetails };
};

export const fetchBook = async (id: string | undefined) => {
  const res = await axiosWithCredentials.get<BookWithDetailsAxiosResponse>(
    `api/books/${id}`,
  );
  return res.data.data.book;
};

export default {
  fetchBook,
};
