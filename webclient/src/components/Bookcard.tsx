import { Box, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BooksAxiosResponse } from '../api/books';
import useAddUserbookData from '../hooks/useAddUserbookData';
import useAuth from '../hooks/useAuth';
import useDeleteUserbookData from '../hooks/useDeleteUserbookData';
import useEditUserbookData from '../hooks/useEditUserbookData';
import BookcardHeading from './Bookcard/BookcardHeading';
import BookcardRating from './Bookcard/BookcardRating';
import BookcardStatusMenu from './Bookcard/BookcardStatusMenu';
import FavoriteIcon from './Bookcard/FavoriteIcon';
import { BookAction } from './Bookcard/types';

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
  const { deleteBook } = useDeleteUserbookData();
  const { editBook } = useEditUserbookData();
  const { addBook } = useAddUserbookData();
  const addOrEditOrRedirect = (info: BookAction) => {
    if (!isLoggedIn) navigate('/login');
    else if (!props.id)
      addBook({
        googleID: props.googleID,
        ...info,
      });
    else {
      editBook({
        userbookID: props.id,
        ...info,
      });
    }
  };

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
        <BookcardStatusMenu
          statusOnClickHandler={addOrEditOrRedirect}
          deleteOnClickHandler={() => deleteBook(props.id)}
          status={props.status}
        />
      </Box>
      {!onlyImage && (
        <Box ml="1rem">
          <BookcardHeading
            title={props.title}
            author={props.author}
            googleID={props.googleID}
          />
          <BookcardRating
            rating={props.userRating ? props.userRating : props.rating}
            isUserRating={!!props.userRating}
            onClickHandler={addOrEditOrRedirect}
          />
        </Box>
      )}
      {!onlyImage && (
        <FavoriteIcon
          favorited={props.favorited}
          onClickHandler={addOrEditOrRedirect}
        />
      )}
    </Flex>
  );
}
export default BookCard;
