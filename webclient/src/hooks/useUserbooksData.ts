import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';
import { fetchUserBooks } from '../api/userbooks';
import useErrorToast from './useErrorToast';

function useUserbooksData() {
  const errorToast = useErrorToast();
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['userbooks'],
    queryFn: () => fetchUserBooks(),
    onError: (err) => {
      if (axios.isAxiosError(err) && err?.response?.status === 401)
        window.location.reload();
      errorToast();
    },
  });
  const favoriteBooks = useMemo(
    () => (data ? data?.filter((book) => book.favorited) : []),
    [data],
  );
  const plannedBooks = useMemo(
    () => (data ? data?.filter((book) => book.status === 'planned') : []),
    [data],
  );
  const readingBooks = useMemo(
    () => (data ? data?.filter((book) => book.status === 'reading') : []),
    [data],
  );
  const finishedBooks = useMemo(
    () => (data ? data?.filter((book) => book.status === 'finished') : []),
    [data],
  );
  return {
    data,
    isLoading,
    error,
    isSuccess,
    favoriteBooks,
    plannedBooks,
    readingBooks,
    finishedBooks,
  };
}
export default useUserbooksData;
