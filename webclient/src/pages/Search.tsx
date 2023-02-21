import { Flex, Button, Spinner } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import SearchBooks from '../components/SearchBooks';
import PageLayout from '../layout/PageLayout';
import BookCard from '../components/Bookcard/Bookcard';
import useBooksData from '../hooks/useBooksData';

function Search() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBooksData(name);

  return (
    <>
      <SearchBooks />
      <PageLayout>
        {isLoading ? (
          <Spinner />
        ) : (
          <Flex direction="row" justifyContent="space-between" flexWrap="wrap">
            {data &&
              data.pages.map((page) =>
                page.data.map((book, i) => (
                  <BookCard
                    key={book.id + i.toString()}
                    onlyImage={false}
                    book={book}
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
        )}
      </PageLayout>
    </>
  );
}

export default Search;
