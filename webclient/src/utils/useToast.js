import {useToast, Box, Text} from "@chakra-ui/core"

const useBookToast = () => {
    const toast = useToast();
    const toastSuccessful = (message) => {
        toast({
            title: `${message}`,
            duration: 3000,
            isClosable: true,
            render: () => (
              <Box backgroundColor="teal.400">
                <Text color="white" padding="1rem 4rem">
                  {message}
                </Text>
              </Box>
            ),
          })
    }
      return {toastSuccessful};
}

export default useBookToast;