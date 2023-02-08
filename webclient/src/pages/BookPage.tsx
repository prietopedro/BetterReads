import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Text, Heading, Flex, Tag } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import SearchBooks from '../components/SearchBooks';
import BookCard from '../components/Bookcard';
import PageLayout from '../layout/PageLayout';
import { useAppDispatch } from '../state/store/store';
import { fetchBook } from '../api/books';

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
  rating: number;
  subtitle: string;
  description: string;
  publisher: string;
  ISBN13: string;
  length: number;
  categories: string[];
  userRating: number;
};
function BookPage() {
  const router = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBook(id),
  });

  // const [book, setBook] = useState<Book>({} as Book);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   const initialSearch = async () => {
  //     const res = await axios.get(`/api/books/${id}`);
  //     if (!res.data.data.book) {
  //       router('/home');
  //     } else {
  //       setBook(res.data.data.book);
  //     }
  //   };
  //   initialSearch();
  // }, [id, router]);
  // if (isLoading) return <h1>Loading...</h1>;
  // if (error) return <h1>Error...</h1>;
  return (
    <>
      <SearchBooks />
      <PageLayout>
        {!isLoading && isSuccess ? (
          <Box>
            <BookCard
              key={data.id}
              id={data.id}
              onlyImage={false}
              ISBN10={data.ISBN10}
              imageUrl={data.thumbnail || ''}
              status={data.status}
              title={data.title}
              author={data.authors?.length ? data.authors[0] : 'Unknown'}
              rating={data.average_rating || 0}
              userBookID={data.userbookID}
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
                {data.categories.map((x) => {
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
          <div>Loading...</div>
        )}
      </PageLayout>
    </>
  );
}

export default BookPage;
