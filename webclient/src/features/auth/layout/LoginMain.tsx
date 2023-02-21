import { ModalBody, ModalFooter, Text, Stack } from '@chakra-ui/react';
import FacebookButton from '../components/FacebookButton';
import GoogleButton from '../components/GoogleButton';
import TwitterButton from '../components/TwitterButton';
import { ComponentToRender } from '../components/types';
import UserAuthButton from '../components/UserAuthButton';

type Props = {
  setModal: React.Dispatch<React.SetStateAction<ComponentToRender>>;
};
function LoginMain({ setModal }: Props) {
  return (
    <>
      <ModalBody>
        <Text as="h2" textAlign="center" fontSize="1.8rem" py="1rem">
          Login To Better Reads
        </Text>
        <Stack spacing={4} direction="column" align="center">
          <UserAuthButton
            onClick={() => setModal(ComponentToRender.LoginWithEmailModal)}
          />
          <GoogleButton />
          <FacebookButton />
          <TwitterButton />
        </Stack>
      </ModalBody>
      <ModalFooter
        justifyContent="center"
        borderTop="1px solid rgba(22, 24, 35, 0.12)"
      >
        <Text textAlign="center">
          Don&apos;t have an account?{' '}
          <Text
            color="teal"
            as="span"
            onClick={() => setModal(ComponentToRender.LoginWithEmailModal)}
          >
            Sign up
          </Text>
        </Text>
      </ModalFooter>
    </>
  );
}

export default LoginMain;
