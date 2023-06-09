import { useParams } from 'react-router-dom';
import { Box, Text, Heading, Flex, Tag, Spinner } from '@chakra-ui/react';

import SearchBooks from '../components/SearchBooks';
import BookCard from '../components/Bookcard';
import PageLayout from '../layout/PageLayout';
import useBookData from '../hooks/useBookData';

function BookPage() {
  const { id } = useParams();
  const { data, isLoading, isSuccess } = useBookData(id);

  return (
    <>
      <SearchBooks />
      <PageLayout>
        {!isLoading && isSuccess && data ? (
          <Box>
            <BookCard
              key={data.id}
              id={data.id}
              onlyImage={false}
              ISBN10={data.ISBN10}
              imageUrl={data.thumbnail || ''}
              status={data.status}
              title={data.title}
              author={data.authors.length ? data.authors[0] : 'Unknown'}
              rating={data.average_rating || 0}
              googleID={data.googleID}
              userRating={data.rating}
              favorited={data.favorited}
            />
            <Box borderBottom="1px solid rgb(217,217,217)" pb="1rem">
              <Heading
                fontSize="1.3rem"
                fontFamily="Frank Ruhl Libre"
                pb="0.5rem"
              >
                Description
              </Heading>
              <Box
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
              />
            </Box>
            <Box borderBottom="1px solid rgb(217,217,217)" pb="1rem">
              <Heading
                fontSize="1.3rem"
                fontFamily="Frank Ruhl Libre"
                pb="0.5rem"
                pt="1rem"
              >
                Information
              </Heading>
              <Box w={['50%', '75%', '75%', '100%']}>
                <Flex wrap="wrap">
                  <Text
                    fontWeight="bold"
                    as="i"
                    w={['100%', '20%', '20%', '20%']}
                  >
                    Title:
                  </Text>
                  <Text>{data.title}</Text>
                </Flex>
                <Flex wrap="wrap">
                  <Text
                    fontWeight="bold"
                    as="i"
                    w={['100%', '20%', '20%', '20%']}
                  >
                    Subtitle:
                  </Text>
                  <Text>{data.subtitle}</Text>
                </Flex>
                <Flex wrap="wrap">
                  <Text
                    fontWeight="bold"
                    as="i"
                    w={['100%', '20%', '20%', '20%']}
                  >
                    Author(s):
                  </Text>
                  <Box>
                    {data.authors?.length
                      ? data.authors?.map((x) => <Text key={x}>{x}</Text>)
                      : 'Unknown'}
                  </Box>
                </Flex>
                <Flex flexWrap="wrap">
                  <Text
                    as="i"
                    fontWeight="bold"
                    w={['100%', '20%', '20%', '20%']}
                  >
                    Publisher:
                  </Text>
                  <Text>{data.publisher || 'Unknown'}</Text>
                </Flex>
                <Flex wrap="wrap">
                  <Text
                    as="i"
                    fontWeight="bold"
                    w={['100%', '20%', '20%', '20%']}
                  >
                    ISBN:
                  </Text>
                  <Text>{data.ISBN10 || data.ISBN13 || 'Unknown'}</Text>
                </Flex>
                <Flex wrap="wrap">
                  <Text
                    fontWeight="bold"
                    textDecor="bold"
                    as="i"
                    w={['100%', '20%', '20%', '20%']}
                  >
                    Length:
                  </Text>
                  <Text>{data.length || 'Unknown'}</Text>
                </Flex>
              </Box>
            </Box>
            <Box>
              <Heading
                fontSize="1.3rem"
                fontFamily="Frank Ruhl Libre"
                pb="0.5rem"
                pt="1rem"
              >
                Genres
              </Heading>
              <Flex wrap="wrap">
                {data.categories?.map((x) => {
                  return (
                    <Tag
                      key={x}
                      mr="0.7rem"
                      mb="0.7rem"
                      backgroundColor="teal.400"
                      color="white"
                    >
                      {x}
                    </Tag>
                  );
                })}
              </Flex>
            </Box>
          </Box>
        ) : (
          <Spinner />
        )}
      </PageLayout>
    </>
  );
}

export default BookPage;
