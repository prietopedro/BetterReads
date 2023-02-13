import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { BooksAxiosResponse } from '../api/books';
import queryClient from '../api/queryClient';
import { Book, deleteUserBook } from '../api/userbooks';
import useErrorToast from './useErrorToast';

export interface InfiniteBooks {
  pages: BooksAxiosResponse[];
  pageParams: string;
}

function useDeleteUserbookData() {
  const errorToast = useErrorToast();
  const { id: bookID } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const { mutate: deleteBook } = useMutation({
    mutationFn: (id: string) => deleteUserBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userbooks'] });
    },
    onMutate: (variables) => {
      const bookPageData = queryClient.getQueryData(['book', bookID]);
      if (bookPageData) {
        queryClient.setQueryData(['book', bookID], {
          ...bookPageData,
          status: '',
          favorited: false,
          id: '',
          rating: '',
        });
      }
      const userBookData = queryClient.getQueryData<Book[]>(['userbooks']);

      if (userBookData) {
        queryClient.setQueryData(
          ['userbooks'],
          userBookData.filter((userBook) => userBook.id !== variables),
        );
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
              if (book.id === variables)
                return {
                  ...book,
                  status: '',
                  favorited: false,
                  id: '',
                  rating: '',
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
      errorToast();
    },
  });
  return { deleteBook };
}

export default useDeleteUserbookData;
