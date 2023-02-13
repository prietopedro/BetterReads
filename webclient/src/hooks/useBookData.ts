import { useQuery } from '@tanstack/react-query';
import { fetchBook } from '../api/books';
import useErrorToast from './useErrorToast';

function useBookData(id: string | undefined) {
  const errorToast = useErrorToast();
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBook(id),
    onError: () => {
      errorToast();
    },
  });

  return {
    data,
    isLoading,
    error,
    isSuccess,
  };
}
export default useBookData;
