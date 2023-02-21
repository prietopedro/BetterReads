import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type Props = {
  googleID: string;
  thumbnail: string;
};

function BookcardThumbnail({ googleID, thumbnail }: Props) {
  return (
    <Link to={`/book/${googleID}`}>
      <Box
        as="img"
        src={thumbnail}
        alt={`Image of book thumbnail with google ID of ${googleID}`}
        height="118px"
        width="86px"
      />
    </Link>
  );
}

export default BookcardThumbnail;
