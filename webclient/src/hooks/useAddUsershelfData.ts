import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import queryClient from '../api/queryClient';
import { addUserShelf } from '../api/usershelves';
import useErrorToast from './useErrorToast';

function useAddUsershelfData() {
  const errorToast = useErrorToast();
  const { mutate: addShelf } = useMutation({
    mutationFn: (params: string) => addUserShelf(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shelves'] });
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err?.response?.status === 401)
        window.location.reload();
      errorToast();
      queryClient.invalidateQueries({ queryKey: ['shelves'] });
    },
  });
  return { addShelf };
}

export default useAddUsershelfData;
