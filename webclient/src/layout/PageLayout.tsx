import { Flex, Box } from '@chakra-ui/react';
import Shelves from '../components/Shelves';

import { useAppSelector } from '../state/store/store';
import Wrapper from './Wrapper';

type Props = {
  children: React.ReactNode;
};
export default function PageLayout({ children }: Props) {
  const user = useAppSelector((state) => state.user);
  return (
    <Wrapper variant="regular" centered>
      <Flex justifyContent="space-between" flexWrap="wrap" my="2rem">
        <Box w={['100', '100%', '100%', user.isLoggedIn ? '60%' : '100%']}>
          {children}
        </Box>
        {user.isLoggedIn && <Shelves />}
      </Flex>
    </Wrapper>
  );
}
