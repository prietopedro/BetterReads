import { Flex, IconButton } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { BookAction } from './types';

type Props = {
  favorited: boolean;
  onClickHandler: (info: BookAction) => void;
};

function FavoriteIcon({ favorited, onClickHandler }: Props) {
  return (
    <Flex width="10%" ml="auto" justifyContent="flex-end">
      <IconButton
        aria-label="favorite book"
        icon={<FaHeart size="1.3rem" />}
        color={!favorited ? 'grey' : '#EA7258'}
        backgroundColor="transparent"
        _hover={{ backgroundColor: 'transparent' }}
        onClick={() => onClickHandler({ favorited: !favorited })}
      />
    </Flex>
  );
}

export default FavoriteIcon;
