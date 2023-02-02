import React from "react";
import {
  Box,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/core";
import {Link} from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Wrapper } from "./";
import { useNavigate } from "react-router-dom";
import useAuth from "../../api/useAuth";
import { logout } from "../../api";


const Navbar = () => {
  const router = useNavigate();
  const isAuth = useAuth();
  let body = null;
  if (isAuth != null) {
    body = (
      <>
        <Link to="/dashboard">
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
                await logout()
                sessionStorage.removeItem("loggedIn");
                router("/")
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </>
    );
  } else  {
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
      <Wrapper>
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