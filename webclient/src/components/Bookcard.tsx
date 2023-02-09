import {
  Box,
  Flex,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Button,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { FaStar, FaHeart, FaChevronDown } from 'react-icons/fa';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { BooksAxiosResponse } from '../api/books';
import queryClient from '../api/queryClient';
import {
  AddUserBook,
  addUserBook,
  deleteUserBook,
  EditUserBook,
  editUserBook,
} from '../api/userbooks';
import // editBook,
// addBook,
// deleteBook,
'../state/store/features/userBookSlice';
import { useAppSelector } from '../state/store/store';

type Props = {
  id: string;
  onlyImage: boolean;
  ISBN10: string;
  imageUrl: string;
  status: string;
  favorited: boolean;
  title: string;
  author: string;
  rating: number;
  googleID: string;
  userRating: number;
};

export interface InfiniteBooks {
  pages: BooksAxiosResponse[];
  pageParams: string;
}

function BookCard({ onlyImage = false, ...props }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const actualRating = props.userRating ? props.userRating : props.rating;
  const actualRatingColor = props.userRating ? '#b59919' : '#EA7258';
  const name = searchParams.get('name');
  const { id: bookID } = useParams();

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
  });
  const { mutate: editBook, isLoading: editLoading } = useMutation({
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
  });

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
  });

  return (
    <Flex
      w={onlyImage ? '86px' : ['100%', '100%', '100%', '47%']}
      marginTop="1rem"
      paddingBottom="1rem"
      justifyContent="flex-start"
      mr="1rem"
    >
      <Box width="86px">
        <Box width="86px">
          <Box
            onClick={() => navigate(`/book/${props.googleID}`)}
            cursor="pointer"
            background={`url(${props.imageUrl}) no-repeat center /cover`}
            height="118px"
            width="86px"
          />
        </Box>
        <Menu>
          <MenuButton
            width="100%"
            color="white"
            backgroundColor="teal.400"
            borderRadius="none"
            fontSize="0.8rem"
            height="30px"
            // rightIcon={<FaChevronDown />}
          >
            {(props.status &&
              props.status.charAt(0).toUpperCase() + props.status.slice(1)) ||
              'Track This'}
            <Icon fontSize={16}>
              <FaChevronDown />
            </Icon>
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                if (!isLoggedIn) {
                  navigate('/login');
                } else if (!props.id) {
                  addBook({
                    googleID: props.googleID,
                    status: 'planned',
                  });
                } else {
                  editBook({
                    userbookID: props.id,
                    status: 'planned',
                  });
                }
              }}
            >
              Planned
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (!isLoggedIn) {
                  navigate('/login');
                } else if (!props.id) {
                  addBook({
                    googleID: props.googleID,
                    status: 'reading',
                  });
                } else {
                  editBook({
                    userbookID: props.id,
                    status: 'reading',
                  });
                }
              }}
            >
              Reading
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (!isLoggedIn) {
                  navigate('/login');
                } else if (!props.id) {
                  addBook({
                    googleID: props.googleID,
                    status: 'finished',
                  });
                } else {
                  editBook({
                    userbookID: props.id,
                    status: 'finished',
                  });
                }
              }}
            >
              Finished
            </MenuItem>
            {props.id && (
              <MenuItem
                onClick={async () => {
                  deleteBook(props.id);
                }}
              >
                Remove
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </Box>
      {!onlyImage && (
        <Box ml="1rem">
          <Heading
            onClick={() => navigate(`/book/${props.googleID}`)}
            cursor="pointer"
            fontSize="1rem"
            fontFamily="Frank Ruhl Libre"
          >
            {props.title?.length > 70
              ? `${props.title.substring(0, 70)} ...`
              : props.title}
          </Heading>
          <Text fontSize="0.875rem" fontFamily="Frank Ruhl Libre">
            {props.author}
          </Text>
          <Flex>
            {Array(5)
              .fill(0)
              .map((_, i) => {
                return (
                  <Box
                    key={String(_ + i)}
                    as={FaStar}
                    size="1.25rem"
                    cursor="pointer"
                    color={
                      actualRating && Math.round(actualRating) >= i + 1
                        ? actualRatingColor
                        : '#E8E8E8'
                    }
                    pr=".125rem"
                    onClick={() => {
                      if (!isLoggedIn) {
                        navigate('/login');
                      } else if (!props.id) {
                        addBook({
                          googleID: props.googleID,
                          rating: i + 1,
                        });
                      } else {
                        editBook({
                          userbookID: props.id,
                          rating: i + 1,
                        });
                      }
                    }}
                  />
                );
              })}
          </Flex>
        </Box>
      )}
      {!onlyImage && (
        <Flex width="10%" ml="auto" justifyContent="flex-end">
          <Button
            as={FaHeart}
            size="1.5rem"
            fill={!props.favorited ? 'grey' : '#EA7258'}
            cursor="pointer"
            isLoading={editLoading}
            onClick={() => {
              if (!isLoggedIn) {
                navigate('/login');
              } else if (!props.id) {
                addBook({
                  googleID: props.googleID,
                  favorited: true,
                });
              } else {
                editBook({
                  userbookID: props.id,
                  favorited: !props.favorited,
                });
              }
            }}
          />
        </Flex>
      )}
    </Flex>
  );
}
export default BookCard;
