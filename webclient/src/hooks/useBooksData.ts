import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBooks } from '../api/books';

function useBooksData(search: string | null) {
  const {
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['books', search || 'Hello World'],
    queryFn: ({ pageParam = 0 }) =>
      fetchBooks({ page: pageParam, search: search || 'Hello World' }),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = lastPage.totalItems / 10;
      const nextPage = allPages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
  });

  return {
    data,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  };
}
export default useBooksData;
