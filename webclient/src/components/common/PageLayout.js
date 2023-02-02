import React from 'react'
import { Wrapper,Shelves } from "./";
import { Flex, Box } from "@chakra-ui/core";

export default function PageLayout({children}) {
  return (
    <Wrapper>
      <Flex justifyContent="space-between" flexWrap="wrap" my="2rem">
        <Box w={["100", "100%", "100%", "60%"]}>{children}</Box>
        <Shelves />
      </Flex>
    </Wrapper>
  )
}
