import { Flex, Box } from '@chakra-ui/react';
import Shelves from '../components/Shelves';
import useAuth from '../hooks/useAuth';

import Wrapper from './Wrapper';

type Props = {
  children: React.ReactNode;
};
export default function PageLayout({ children }: Props) {
  const { isLoggedIn } = useAuth();
  return (
    <Wrapper variant="regular" centered>
      <Flex justifyContent="space-between" flexWrap="wrap" my="2rem">
        <Box w={['100', '100%', '100%', isLoggedIn ? '60%' : '100%']}>
          {children}
        </Box>
        {isLoggedIn && <Shelves />}
      </Flex>
    </Wrapper>
  );
}
