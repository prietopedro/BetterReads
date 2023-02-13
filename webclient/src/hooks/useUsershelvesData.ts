import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { fetchUserShelves } from '../api/usershelves';
import useErrorToast from './useErrorToast';

function useUsershelvesData() {
  const errorToast = useErrorToast();
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['shelves'],
    queryFn: () => fetchUserShelves(),
    onError: (err) => {
      if (axios.isAxiosError(err) && err?.response?.status === 401)
        window.location.reload();
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
export default useUsershelvesData;
