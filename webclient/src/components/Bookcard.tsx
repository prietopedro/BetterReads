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
} from '@chakra-ui/react';
import { FaStar, FaHeart, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BooksAxiosResponse } from '../api/books';
import useAddUserbookData from '../hooks/useAddUserbookData';
import useAuth from '../hooks/useAuth';
import useDeleteUserbookData from '../hooks/useDeleteUserbookData';
import useEditUserbookData from '../hooks/useEditUserbookData';

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
  const { isLoggedIn } = useAuth();
  const actualRating = props.userRating ? props.userRating : props.rating;
  const actualRatingColor = props.userRating ? '#b59919' : '#EA7258';

  const { deleteBook } = useDeleteUserbookData();
  const { editBook } = useEditUserbookData();
  const { addBook } = useAddUserbookData();

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
            data-testid="BookCard-Current-Status"
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
            data-testid="BookCard-Title"
          >
            {props.title?.length > 70
              ? `${props.title.substring(0, 70)} ...`
              : props.title}
          </Heading>
          <Text
            fontSize="0.875rem"
            fontFamily="Frank Ruhl Libre"
            data-testid="BookCard-Author"
          >
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
          <Box
            as={FaHeart}
            size="1.5rem"
            data-testid="BookCard-Favorite"
            fill={!props.favorited ? 'grey' : '#EA7258'}
            cursor="pointer"
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
