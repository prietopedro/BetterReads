import { Box, Button, Text, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  favorites,
  planned,
  reading,
} from '../state/store/features/userBookSlice';
import { useAppDispatch, useAppSelector } from '../state/store/store';
// import { CreateShelfModal } from '.';

function Shelves() {
  const router = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const favoriteBooks = useAppSelector(favorites);
  const plannedBooks = useAppSelector(planned);
  const readingBooks = useAppSelector(reading);

  const defaultValue = (
    <Box
      mx="0.5rem"
      onClick={() => router(`/shelves`)}
      cursor="pointer"
      background={`url("/lockedBook.svg") no-repeat center /cover`}
      width="50px"
      height="69px"
    />
  );

  return (
    <>
      {/* <CreateShelfModal setIsOpen={setIsOpen} isOpen={isOpen} /> */}
      <Flex
        direction="column"
        w={['100%', '100%', '100%', '20%']}
        my={['2rem', '2rem', '2rem', '0rem']}
      >
        <Text
          fontSize="1.5rem"
          color="teal.400"
          lineHeight="1.875rem"
          fontWeight="bold"
          fontFamily="Frank Ruhl Libre"
          cursor="pointer"
          onClick={() => router('/shelves')}
        >
          My Shelves {'>'}
        </Text>
        <Text m="0.5rem 0" color="#4e4c4a" lineHeight="1.375rem">
          Create shelves and add books to your custom shelf.
        </Text>
        <Button
          fontWeight={500}
          bg="teal.400"
          width="10rem"
          fontSize="1rem"
          color="white"
          border="1px solid #6d9a7f"
          lineHeight="1.375rem"
          cursor="pointer"
          _hover={{ background: 'none', color: 'teal.400' }}
          onClick={() => setIsOpen(!isOpen)}
        >
          Create new shelf
        </Button>
        <Flex flexDirection={['row', 'row', 'row', 'column']} mt="1rem">
          <Flex
            border="1px solid rgb(217,217,217)"
            w="60%"
            mt="1rem"
            p="0.5rem 1rem"
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Text>Reading</Text>
            <Flex justify="center">
              {readingBooks?.length
                ? readingBooks
                    .filter((_, i) => i < 2)
                    .map((x, i) => {
                      return (
                        <Box
                          key={(x.toString() + i).toString()}
                          mx="0.5rem"
                          onClick={() => router(`/book/${x.ISBN10}`)}
                          cursor="pointer"
                          background={`url(${x.thumbnail}) no-repeat center /cover`}
                          width="50px"
                          height="69px"
                        />
                      );
                    })
                : defaultValue}
            </Flex>
            <Text>{readingBooks?.length || 0} Books</Text>
          </Flex>
          <Flex
            border="1px solid rgb(217,217,217)"
            w="60%"
            mt="1rem"
            p="0.5rem 1rem"
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Text color="#333">Planned</Text>
            <Flex justify="center">
              {plannedBooks?.length
                ? plannedBooks
                    .filter((_, i) => i < 2)
                    .map((x, i) => {
                      return (
                        <Box
                          key={(x.toString() + i).toString()}
                          mx="0.5rem"
                          onClick={() => router(`/book/${x.ISBN10}`)}
                          cursor="pointer"
                          background={`url(${x.thumbnail}) no-repeat center /cover`}
                          width="50px"
                          height="69px"
                        />
                      );
                    })
                : defaultValue}
            </Flex>
            <Text>{plannedBooks?.length || 0} Books</Text>
          </Flex>
          <Flex
            border="1px solid rgb(217,217,217)"
            w="60%"
            mt="1rem"
            p="0.5rem 1rem"
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Text>Favorites</Text>
            <Flex justify="center">
              {favoriteBooks.length
                ? favoriteBooks
                    ?.filter((_, i) => i < 2)
                    .map((x, i) => {
                      return (
                        <Box
                          key={(x.toString() + i).toString()}
                          mx="0.5rem"
                          onClick={() => router(`/book/${x.ISBN10}`)}
                          cursor="pointer"
                          background={`url(${x.thumbnail}) no-repeat center /cover`}
                          width="50px"
                          height="69px"
                        />
                      );
                    })
                : defaultValue}
            </Flex>
            <Text>{favoriteBooks.length || 0} Books</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Shelves;
