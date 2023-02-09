import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchUserBooks } from '../api/userbooks';

function useUserbooksData() {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['userbooks'],
    queryFn: () => fetchUserBooks(),
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
