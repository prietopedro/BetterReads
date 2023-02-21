import { Button } from '@chakra-ui/react';
import { SiTwitter } from 'react-icons/si';

function TwitterButton() {
  return (
    <Button
      leftIcon={<SiTwitter color="#00acee" />}
      width="100%"
      variant="outline"
      height="3rem"
    >
      Continue with Twitter
    </Button>
  );
}

export default TwitterButton;
