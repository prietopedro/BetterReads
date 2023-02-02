import React from "react";
import { Flex, Heading, Box, Text } from "@chakra-ui/core";
import { Wrapper } from "./";
import { useNavigate } from "react-router-dom";


const AuthWrapper = ({
  children,
  heading,
  redirectText,
  redirectText2,
  redirectLink,
}) => {
  const router = useNavigate();
  return (
    <Flex>
      <Flex
        direction="column"
        justify="center"
        align="center"
        w={["100%", "100%", "50%"]}
      >
        <Wrapper variant="small">
          <Heading color="teal.400" fontFamily="heading">
            {heading}
          </Heading>
          <Flex mt="0.5rem">
            <Text mr="0.5rem">{redirectText}</Text>
            <Text
              as="a"
              color="teal.400"
              onClick={() => router(redirectLink)}
              cursor="pointer"
            >
              {redirectText2}
            </Text>
          </Flex>
          {children}
        </Wrapper>
      </Flex>
      <Box
        width={["0", "0", "50%", "50%"]}
        height="100vh"
        backgroundColor="red"
        background={`url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=841&q=80") no-repeat center /cover`}
      />
    </Flex>
  );
};

export default AuthWrapper;