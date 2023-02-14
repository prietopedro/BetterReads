import { IconButton } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { BookAction } from './types';

type Props = {
  checked: boolean;
  color: string;
  placement: number;
  onClickHandler: (info: BookAction) => void;
};

function BookcardRatingStar({
  checked,
  placement,
  onClickHandler,
  color,
}: Props) {
  return (
    <IconButton
      aria-label="book rating"
      icon={<FaStar size="2rem" />}
      color={checked ? color : '#E8E8E8'}
      backgroundColor="transparent"
      _hover={{ backgroundColor: 'transparent' }}
      minWidth="0px"
      minHeight="0px"
      width="1.2rem"
      height="1.2rem"
      onClick={() => onClickHandler({ rating: placement })}
    />
  );
}

export default BookcardRatingStar;
