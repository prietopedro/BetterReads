import { Button } from '@chakra-ui/react';
import { BsFacebook } from 'react-icons/bs';

function FacebookButton() {
  return (
    <Button
      leftIcon={<BsFacebook color="#3b5998" />}
      width="100%"
      variant="outline"
      height="3rem"
    >
      Continue with Facebook
    </Button>
  );
}

export default FacebookButton;
