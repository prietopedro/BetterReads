import { Box, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAddUserbookData from '../../hooks/useAddUserbookData';
import useAuth from '../../hooks/useAuth';
import useDeleteUserbookData from '../../hooks/useDeleteUserbookData';
import useEditUserbookData from '../../hooks/useEditUserbookData';
import BookcardHeading from './BookcardHeading';
import BookcardRating from './BookcardRating';
import BookcardStatusMenu from './BookcardStatusMenu';
import BookcardThumbnail from './BookcardThumbnail';
import FavoriteIcon from './FavoriteIcon';
import { Book, BookAction } from '../../types';

type Props = {
  book: Book;
  onlyImage: boolean;
};

function BookCard({ onlyImage = false, book }: Props) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { deleteBook } = useDeleteUserbookData();
  const { editBook } = useEditUserbookData();
  const { addBook } = useAddUserbookData();
  const addOrEditOrRedirect = (info: BookAction) => {
    if (!isLoggedIn) navigate('/login');
    else if (!book.id)
      addBook({
        googleID: book.googleID,
        ...info,
      });
    else {
      editBook({
        userbookID: book.id,
        ...info,
      });
    }
  };
  const getAuthor = () => {
    if (!book.authors.length) return 'Unknown';
    if (book.authors.length === 1) return book.authors[0];
    return `${book.authors[0]} and More`;
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
          <BookcardThumbnail
            googleID={book.googleID}
            thumbnail={book.thumbnail}
          />
        </Box>
        <BookcardStatusMenu
          statusOnClickHandler={addOrEditOrRedirect}
          deleteOnClickHandler={() => deleteBook(book.id)}
          status={book.status}
        />
      </Box>
      {!onlyImage && (
        <Box ml="1rem">
          <BookcardHeading
            title={book.title}
            author={getAuthor()}
            googleID={book.googleID}
          />
          <BookcardRating
            rating={book.rating ? book.rating : book.average_rating}
            isUserRating={!!book.rating}
            onClickHandler={addOrEditOrRedirect}
          />
        </Box>
      )}
      {!onlyImage && (
        <FavoriteIcon
          favorited={book.favorited}
          onClickHandler={addOrEditOrRedirect}
        />
      )}
    </Flex>
  );
}
export default BookCard;
