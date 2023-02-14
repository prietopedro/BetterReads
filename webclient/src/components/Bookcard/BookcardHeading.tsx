import { Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  author: string;
  googleID: string;
};

function BookcardHeading({ title, author, googleID }: Props) {
  return (
    <>
      <Link to={`/book/${googleID}`}>
        <Heading cursor="pointer" fontSize="1rem" fontFamily="Frank Ruhl Libre">
          {title?.length > 70 ? `${title.substring(0, 70)} ...` : title}
        </Heading>
      </Link>
      <Text fontSize="0.875rem" fontFamily="Frank Ruhl Libre">
        {author}
      </Text>
    </>
  );
}

export default BookcardHeading;
