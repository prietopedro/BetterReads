import { Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
  variant: string;
  centered: boolean;
};
function Wrapper({ children, variant = 'regular', centered = true }: Props) {
  return (
    <Box
      maxW={variant === 'regular' ? '1500px' : '400px'}
      w="95%"
      my={2}
      mx={centered ? 'auto' : 0}
    >
      {children}
    </Box>
  );
}

export default Wrapper;
