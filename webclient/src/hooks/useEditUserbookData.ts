import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { BooksAxiosResponse } from '../api/books';
import queryClient from '../api/queryClient';
import { Book, EditUserBook, editUserBook } from '../api/userbooks';
import useErrorToast from './useErrorToast';

export interface InfiniteBooks {
  pages: BooksAxiosResponse[];
  pageParams: string;
}

function useEditUserbookData() {
  const errorToast = useErrorToast();
  const { id: bookID } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const { mutate: editBook, isLoading: editUserBookLoading } = useMutation({
    mutationFn: (params: EditUserBook) => editUserBook(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userbooks'] });
    },
    onMutate: (variables) => {
      const bookPageData = queryClient.getQueryData(['book', bookID]);
      if (bookPageData) {
        queryClient.setQueryData(['book', bookID], {
          ...bookPageData,
          ...variables,
        });
      }
      const userBookData = queryClient.getQueryData<Book[]>(['userbooks']);

      if (userBookData) {
        queryClient.setQueryData(
          ['userbooks'],
          userBookData.map((userBook) => {
            if (userBook.id === variables.userbookID)
              return { ...userBook, ...variables };
            return userBook;
          }),
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
              if (book.id === variables.userbookID)
                return { ...book, ...variables };
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
  return { editBook, editUserBookLoading };
}

export default useEditUserbookData;
