import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import queryClient from '../api/queryClient';
import { EditShelf, editUserShelf } from '../api/usershelves';
import useErrorToast from './useErrorToast';

function useEditUsershelfData() {
  const errorToast = useErrorToast();
  const { mutate: editShelf } = useMutation({
    mutationFn: (params: EditShelf) => editUserShelf(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shelves'] });
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err?.response?.status === 401)
        window.location.reload();
      errorToast();
    },
  });
  return { editShelf };
}

export default useEditUsershelfData;
