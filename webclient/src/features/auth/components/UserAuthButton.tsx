import { Button } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';

function UserAuthButton({ onClick }: React.HTMLProps<HTMLButtonElement>) {
  return (
    <Button
      leftIcon={<AiOutlineUser />}
      width="100%"
      variant="outline"
      height="3rem"
      onClick={onClick}
    >
      Use phone / email / username
    </Button>
  );
}

export default UserAuthButton;
