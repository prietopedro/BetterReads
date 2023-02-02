import React from "react";
import { Box, Text, IconButton, Flex, Button, Heading } from "@chakra-ui/core";
import { Wrapper,FormInput } from "./";
import { Formik, Form } from "formik";
import { useNavigate, useLocation  } from "react-router-dom";

const SearchBooks = ({}) => {
  const router = useNavigate();
  const location = useLocation();

  return (
    <Box backgroundColor="rgb(243, 246, 245)" py={2} pb={3}>
      <Wrapper>
        {location.pathname === "/dashboard" && (
          <Box m={0}>
            <Heading fontSize="2.2rem" fontWeight="bold" color="teal.400">
              What are you reading?
            </Heading>
            <Text>
              Search for a book that you want to track and add to shelves.
            </Text>
          </Box>
        )}
        <Formik
          initialValues={{ bookQuery: "" }}
          onSubmit={async (values) => {
            router({
              pathname: "/search",
              search: `name=${values.bookQuery}`,
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Wrapper centered={false} variant="small">
                <Flex w="100%" alignItems="center" justifyContent="flex-start">
                  <FormInput
                    placeholder="Search for a book"
                    name="bookQuery"
                  />
                  <IconButton
                    mt="1rem"
                    isLoading={isSubmitting}
                    backgroundColor="teal.400"
                    color="white"
                    icon="search"
                    aria-label="Search Books"
                    as={Button}
                    type="submit"
                  ></IconButton>
                </Flex>
              </Wrapper>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Box>
  );
};

export default SearchBooks