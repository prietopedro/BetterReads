import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Wrapper from '../layout/Wrapper';
import { useAppSelector, useAppDispatch } from '../state/store/store';
import { reset } from '../state/store/features/userSlice';

function Navbar() {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.user);
  // const isAuth = useAuth();
  let body = null;
  if (isLoggedIn) {
    body = (
      <>
        <Link to="/home">
          <Text
            fontSize="1.2rem"
            color="#333"
            textDecoration="none"
            cursor="pointer"
          >
            Home
          </Text>
        </Link>
        <Menu>
          <MenuButton>
            <Box ml={6} as={FaUserCircle} size="2rem" color="#7E8D88" />
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={async () => {
                dispatch(reset());
                router('/');
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  } else {
    body = (
      <>
        <Link to="/register">
          <Text
            fontSize="1.2rem"
            color="#333"
            textDecoration="none"
            cursor="pointer"
          >
            Register
          </Text>
        </Link>
        <Link to="/login">
          <Text
            fontSize="1.2rem"
            color="#333"
            textDecoration="none"
            cursor="pointer"
            ml={6}
          >
            Login
          </Text>
        </Link>
      </>
    );
  }
  return (
    <Box>
      <Wrapper variant="regular" centered>
        <Flex justify="space-between" align="center">
          <Link to="/">
            <Text
              fontSize="1.6rem"
              fontWeight={700}
              color="teal.400"
              textDecoration="none"
              cursor="pointer"
            >
              BetterReads
            </Text>
          </Link>
          <Flex justifyContent="flex-end">{body}</Flex>
        </Flex>
      </Wrapper>
    </Box>
  );
}
export default Navbar;
