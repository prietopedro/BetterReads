import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { BooksAxiosResponse } from '../api/books';
import queryClient from '../api/queryClient';
import { addUserBook, AddUserBook } from '../api/userbooks';
import useErrorToast from './useErrorToast';

export interface InfiniteBooks {
  pages: BooksAxiosResponse[];
  pageParams: string;
}

function useAddUserbookData() {
  const errorToast = useErrorToast();
  const { id: bookID } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const { mutate: addBook } = useMutation({
    mutationFn: (params: AddUserBook) => addUserBook(params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userbooks'] });
      const bookSearchData = queryClient.getQueryData<InfiniteBooks>([
        'books',
        name,
      ]);
      if (bookSearchData) {
        const newData = {
          ...bookSearchData,
          pages: bookSearchData.pages.map((page) => ({
            ...page,
            data: page.data.map((book) => {
              if (book.googleID === data.googleID) return data;
              return book;
            }),
          })),
        };
        queryClient.setQueryData(['books', name], newData);
      }
    },
    onMutate: (variables) => {
      const bookPageData = queryClient.getQueryData(['book', bookID]);
      if (bookPageData) {
        queryClient.setQueryData(['book', bookID], {
          ...bookPageData,
          ...variables,
        });
      }

      const bookSearchData = queryClient.getQueryData<InfiniteBooks>([
        'books',
        name,
      ]);
      if (bookSearchData) {
        const newData = {
          ...bookSearchData,
          pages: bookSearchData.pages.map((page) => ({
            ...page,
            data: page.data.map((book) => {
              if (book.googleID === variables.googleID)
                return {
                  ...book,
                  ...variables,
                  status: variables.status || 'planned',
                  favorited: variables.favorited || false,
                };
              return book;
            }),
          })),
        };
        queryClient.setQueryData(['books', name], newData);
      }
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err?.response?.status === 401)
        window.location.reload();
      else {
        errorToast();
      }
    },
  });
  return { addBook };
}

export default useAddUserbookData;
