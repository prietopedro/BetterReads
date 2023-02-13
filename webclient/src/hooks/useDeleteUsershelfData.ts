import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import queryClient from '../api/queryClient';
import { deleteUserShelf } from '../api/usershelves';
import useErrorToast from './useErrorToast';

function useDeleteUsershelfData() {
  const errorToast = useErrorToast();
  const { mutate: deleteShelf } = useMutation({
    mutationFn: (params: string) => deleteUserShelf(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shelves'] });
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err?.response?.status === 401)
        window.location.reload();
      errorToast();
    },
  });
  return { deleteShelf };
}

export default useDeleteUsershelfData;

/*   const { mutate: addShelf } = useMutation({
    mutationFn: (params: string) => addUserShelf(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shelves'] });
    },
  }); */
