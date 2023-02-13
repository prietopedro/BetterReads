import { Box, useToast, Text } from '@chakra-ui/react';

function useErrorToast(errorMessage = 'Something went wrong, try again later') {
  const toast = useToast();
  return () => {
    toast({
      title: `${errorMessage}`,
      duration: 3000,
      isClosable: true,
      render: () => (
        <Box backgroundColor="teal.400">
          <Text color="white" padding="1rem 4rem">
            {errorMessage}
          </Text>
        </Box>
      ),
    });
  };
}
export default useErrorToast;
