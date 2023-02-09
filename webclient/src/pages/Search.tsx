import { Flex, Button } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import SearchBooks from '../components/SearchBooks';
import PageLayout from '../layout/PageLayout';
import BookCard from '../components/Bookcard';
import useBooksData from '../hooks/useBooksData';

function Search() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBooksData(name);

  if (isSuccess)
    return (
      <>
        <SearchBooks />
        <PageLayout>
          <Flex direction="row" justifyContent="space-between" flexWrap="wrap">
            {data &&
              data.pages.map((page) =>
                page.data.map((book, i) => (
                  <BookCard
                    id={book.id}
                    key={book.id + i.toString()}
                    imageUrl={book.thumbnail || ''}
                    onlyImage={false}
                    title={book.title}
                    author={
                      Array.isArray(book.authors)
                        ? book.authors[0]
                        : book.authors
                    }
                    rating={book.average_rating || 0}
                    ISBN10={book.ISBN10}
                    status={book.status}
                    favorited={book.favorited}
                    googleID={book.googleID}
                    userRating={book.rating}
                  />
                )),
              )}
            {hasNextPage && (
              <Button
                isLoading={isFetchingNextPage}
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
                onClick={() => fetchNextPage()}
              >
                Load More
              </Button>
            )}
          </Flex>
        </PageLayout>
      </>
    );
  return <div>HELLO</div>;
}

export default Search;
