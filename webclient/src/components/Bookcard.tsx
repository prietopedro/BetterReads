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
import { editBook, addBook } from '../state/store/features/userBookSlice';
import { useAppDispatch, useAppSelector } from '../state/store/store';

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
  userBookID: string;
};
function BookCard({ onlyImage = false, ...props }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.user);
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
            onClick={() => navigate(`/book/${props.ISBN10}`)}
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
                } else if (!props.userBookID) {
                  dispatch(
                    addBook({
                      status: 'planned',
                      id: props.id,
                    }),
                  );
                } else {
                  dispatch(
                    editBook({
                      status: 'planned',
                      id: props.userBookID,
                      favorited: props.favorited,
                    }),
                  );
                }
              }}
            >
              Planned
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (!isLoggedIn) {
                  navigate('/login');
                } else if (!props.userBookID) {
                  dispatch(
                    addBook({
                      status: 'reading',
                      id: props.id,
                    }),
                  );
                } else {
                  dispatch(
                    editBook({
                      status: 'reading',
                      favorited: props.favorited,
                      id: props.userBookID,
                    }),
                  );
                }
              }}
            >
              Reading
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (!isLoggedIn) {
                  navigate('/login');
                } else if (!props.userBookID) {
                  dispatch(
                    addBook({
                      status: 'finished',
                      id: props.id,
                    }),
                  );
                } else {
                  dispatch(
                    editBook({
                      status: 'finished',
                      id: props.userBookID,
                      favorited: props.favorited,
                    }),
                  );
                }
              }}
            >
              Finished
            </MenuItem>
            {props.userBookID && (
              <MenuItem onClick={async () => {}}>Remove</MenuItem>
            )}
          </MenuList>
        </Menu>
      </Box>
      {!onlyImage && (
        <Box ml="1rem">
          <Heading
            onClick={() => navigate(`/book/${props.ISBN10}`)}
            cursor="pointer"
            fontSize="1rem"
            fontFamily="Frank Ruhl Libre"
          >
            {props.title.length > 70
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
                      props.rating && Math.round(props.rating) >= i + 1
                        ? '#EA7258'
                        : '#E8E8E8'
                    }
                    pr=".125rem"
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
            fill={!props.favorited ? 'grey' : '#EA7258'}
            cursor="pointer"
            onClick={() => {
              if (!isLoggedIn) {
                navigate('/login');
              } else if (!props.userBookID) {
                dispatch(
                  addBook({
                    favorited: true,
                    id: props.id,
                  }),
                );
              } else {
                dispatch(
                  editBook({
                    favorited: !props.favorited,
                    id: props.userBookID,
                  }),
                );
              }
            }}
          />
        </Flex>
      )}
    </Flex>
  );
}
export default BookCard;
