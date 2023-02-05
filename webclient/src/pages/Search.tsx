import { Flex, Button } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

function Search() {
  return (
    <>
      <h1>SEARCH</h1>
      {/* <Navbar />
      <SearchBooks />
      <PageLayout>
        <Flex direction="row" justifyContent="space-between" flexWrap="wrap">
          {!initialLoading
            ? results.map((book) => (
                <BookCard
                  key={book._id}
                  id={book._id}
                  imageUrl={book.thumbnail || ''}
                  search
                  title={book.title}
                  author={
                    book.authors.length ? book.authors[0].name : 'Unknown'
                  }
                  rating={book.average_rating || 0}
                  ISBN10={book.ISBN10}
                />
              ))
            : 'Loading...'}
          {total && fetchMore ? (
            <Button
              isLoading={additionalLoading}
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
              onClick={() => fetchMoreData()}
            >
              Load More
            </Button>
          ) : null}
        </Flex>
      </PageLayout> */}
    </>
  );
}

export default Search;
