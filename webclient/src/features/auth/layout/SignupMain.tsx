import { ModalBody, ModalFooter, Text, Stack } from '@chakra-ui/react';
import FacebookButton from '../components/FacebookButton';
import GoogleButton from '../components/GoogleButton';
import TwitterButton from '../components/TwitterButton';
import { ComponentToRender } from '../components/types';
import UserAuthButton from '../components/UserAuthButton';

type Props = {
  setModal: React.Dispatch<React.SetStateAction<ComponentToRender>>;
};
function SignupMain({ setModal }: Props) {
  return (
    <>
      <ModalBody>
        <Text as="h2" textAlign="center" fontSize="1.8rem" py="1rem">
          Sign up for Better Reads
        </Text>
        <Stack spacing={4} direction="column" align="center">
          <UserAuthButton
            onClick={() => setModal(ComponentToRender.SignupWithEmailModal)}
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
            cursor="pointer"
            onClick={() => setModal(ComponentToRender.LoginMainModal)}
          >
            Log in
          </Text>
        </Text>
      </ModalFooter>
    </>
  );
}

export default SignupMain;
