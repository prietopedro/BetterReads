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
import useAuth from '../hooks/useAuth';

function Navbar() {
  const router = useNavigate();
  const { isLoggedIn, logout } = useAuth();
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
            data-testid="navbar-home-text"
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
              data-testid="navbar-logout-text"
              onClick={async () => {
                logout();
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
        <Link to="/register" data-testid="navbar-register-link">
          <Text
            fontSize="1.2rem"
            color="#333"
            textDecoration="none"
            cursor="pointer"
            data-testid="navbar-register-text"
          >
            Register
          </Text>
        </Link>
        <Link to="/login" data-testid="navbar-login-link">
          <Text
            fontSize="1.2rem"
            color="#333"
            textDecoration="none"
            cursor="pointer"
            ml={6}
            data-testid="navbar-login-text"
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
        <Flex justify="space-between" align="center" data-test-id="navbar">
          <Link to="/" data-testid="navbar-logo-link">
            <Text
              fontSize="1.6rem"
              fontWeight={700}
              color="teal.400"
              textDecoration="none"
              cursor="pointer"
              data-testid="navbar-logo-text"
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
