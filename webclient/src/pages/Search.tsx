import { useEffect } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import SearchBooks from '../components/SearchBooks';
import PageLayout from '../layout/PageLayout';
import BookCard from '../components/Bookcard';

import { useAppDispatch, useAppSelector } from '../state/store/store';
import { searchBooks, clear } from '../state/store/features/booksSlice';

type Book = {
  id: string;
  thumbnail: string;
  title: string;
  authors: string[];
  average_rating: number;
  ISBN10: string;
  favorited: boolean;
  status: string;
  userbookID: string;
};
function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const name = searchParams.get('name');
  const { isLoading, books, totalItems } = useAppSelector(
    (state) => state.books,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (name) {
      dispatch(clear());
      dispatch(searchBooks({ searchValue: name }));
    } else {
      dispatch(searchBooks({ searchValue: 'HELLO' }));
    }
  }, [name, dispatch, navigate]);

  return (
    <>
      <SearchBooks />
      <PageLayout>
        <Flex direction="row" justifyContent="space-between" flexWrap="wrap">
          {books.length
            ? books.map((book: Book, i) => (
                <BookCard
                  id={book.id}
                  key={book.id + i.toString()}
                  imageUrl={book.thumbnail || ''}
                  onlyImage={false}
                  title={book.title}
                  author={book.authors?.length ? book.authors[0] : 'Unknown'}
                  rating={book.average_rating || 0}
                  ISBN10={book.ISBN10}
                  status={book.status}
                  favorited={book.favorited}
                  userBookID={book.userbookID}
                />
              ))
            : 'Loading...'}
          {totalItems > books.length ? (
            <Button
              isLoading={isLoading}
              fontWeight={500}
              bg="transparent"
              width="100%"
              margin="1rem 0"
              fontSize="1rem"
              color="teal.400"
              border="1px solid #6d9a7f"
              lineHeight="1.375rem"
              cursor="pointer"
              _hover={{ backgroundColor: 'teal.400', color: 'white' }}
              onClick={() =>
                name &&
                dispatch(searchBooks({ searchValue: name, additional: true }))
              }
            >
              Load More
            </Button>
          ) : null}
        </Flex>
      </PageLayout>
    </>
  );
}

export default Search;
