import { Box, Text, IconButton, Flex, Button, Heading } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import FormInput from './FormInput';
import Wrapper from '../layout/Wrapper';

function SearchBooks() {
  const router = useNavigate();

  return (
    <Box backgroundColor="rgb(243, 246, 245)" py={2} pb={3}>
      <Wrapper centered variant="regular">
        <Box m={0}>
          <Heading fontSize="2.2rem" fontWeight="bold" color="teal.400">
            What are you reading?
          </Heading>
          <Text>
            Search for a book that you want to track and add to shelves.
          </Text>
        </Box>

        <Formik
          initialValues={{ bookQuery: '' }}
          onSubmit={async (values) => {
            router({
              pathname: '/search',
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
                    label=""
                  />
                  <IconButton
                    mt="1rem"
                    isLoading={isSubmitting}
                    backgroundColor="teal.400"
                    color="white"
                    icon={<FaSearch />}
                    aria-label="Search Books"
                    as={Button}
                    type="submit"
                  />
                </Flex>
              </Wrapper>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Box>
  );
}

export default SearchBooks;
