import axiosWithCredentials from './axios';

export type Book = {
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
  userRating: number;
};

type UserBooksAxiosResponse = {
  data: { books: Book[] };
};

export const fetchUserBooks = async () => {
  const res = await axiosWithCredentials.get<UserBooksAxiosResponse>(
    'api/users/books',
  );
  return res.data.data.books;
};

export default {
  fetchUserBooks,
};
