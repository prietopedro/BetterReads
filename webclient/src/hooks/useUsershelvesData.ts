import { useQuery } from '@tanstack/react-query';
import { fetchUserShelves } from '../api/usershelves';

function useUsershelvesData() {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['shelves'],
    queryFn: () => fetchUserShelves(),
  });

  return {
    data,
    isLoading,
    error,
    isSuccess,
  };
}
export default useUsershelvesData;
