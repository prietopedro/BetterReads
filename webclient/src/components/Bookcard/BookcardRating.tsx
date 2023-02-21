import { Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import BookcardRatingStar from './BookcardRatingStar';
import { BookAction } from '../../types';

type Props = {
  rating: number;
  isUserRating: boolean;
  onClickHandler: (info: BookAction) => void;
};

function BookcardRating({ rating, isUserRating, onClickHandler }: Props) {
  const stars = useMemo(() => [1, 2, 3, 4, 5], []);
  return (
    <Flex>
      {stars.map((num) => (
        <BookcardRatingStar
          key={num}
          checked={Math.round(rating) >= num}
          color={isUserRating ? '#b59919' : '#EA7258'}
          placement={num}
          onClickHandler={onClickHandler}
        />
      ))}
    </Flex>
  );
}

export default BookcardRating;
