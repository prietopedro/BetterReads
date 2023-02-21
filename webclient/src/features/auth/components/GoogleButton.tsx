import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

function GoogleButton() {
  return (
    <Button
      leftIcon={<FcGoogle />}
      width="100%"
      variant="outline"
      height="3rem"
    >
      Continue with Google
    </Button>
  );
}

export default GoogleButton;
