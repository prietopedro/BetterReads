import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa';
import { BookAction } from '../../types';
import CapitalizeFirstChar from '../../utils/CapitalizeFirstChar';

type Props = {
  statusOnClickHandler: (info: BookAction) => void;
  deleteOnClickHandler: () => void;
  status: string;
};

function BookcardStatusMenu({
  statusOnClickHandler,
  deleteOnClickHandler,
  status,
}: Props) {
  return (
    <Menu>
      <MenuButton
        width="100%"
        color="white"
        backgroundColor="teal.400"
        borderRadius="none"
        fontSize="0.8rem"
        height="30px"
      >
        {status ? CapitalizeFirstChar(status) : 'Track This'}
        <Icon fontSize={16}>
          <FaChevronDown />
        </Icon>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => statusOnClickHandler({ status: 'planned' })}>
          Planned
        </MenuItem>
        <MenuItem onClick={() => statusOnClickHandler({ status: 'reading' })}>
          Reading
        </MenuItem>
        <MenuItem onClick={() => statusOnClickHandler({ status: 'finished' })}>
          Finished
        </MenuItem>
        {!!status && (
          <MenuItem
            onClick={() => {
              deleteOnClickHandler();
            }}
          >
            Remove
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}

export default BookcardStatusMenu;
