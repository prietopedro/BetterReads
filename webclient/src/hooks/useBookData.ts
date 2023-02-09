import { useQuery } from '@tanstack/react-query';
import { fetchBook } from '../api/books';

function useBookData(id: string | undefined) {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBook(id),
  });

  return {
    data,
    isLoading,
    error,
    isSuccess,
  };
}
export default useBookData;
