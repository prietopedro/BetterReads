import {
  ModalBody,
  Text,
  Stack,
  ModalFooter,
  Input,
  FormLabel,
  FormControl,
  Button,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineWarning,
} from 'react-icons/ai';
import useAuth from '../../../hooks/useAuth';

import { ComponentToRender } from '../components/types';

type Props = {
  setModal: React.Dispatch<React.SetStateAction<ComponentToRender>>;
};

interface Inputs {
  emailOrUsername: string;
  password: string;
}

function LoginWithEmail({ setModal }: Props) {
  const [showPassword, setShowIsPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { emailOrUsername: '', password: '' },
  });
  const { login, isLoggedIn, loginError, loginIsLoading } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formValues = { password: data.password, email: '', username: '' };
    if (data.emailOrUsername.indexOf('@') !== -1)
      formValues.email = data.emailOrUsername;
    else formValues.username = data.emailOrUsername;
    login(formValues);
  };
  const isGood = watch('emailOrUsername').length && watch('password').length;
  return (
    <>
      <ModalBody>
        <Text as="h2" textAlign="center" fontSize="1.8rem" py="1rem">
          Login
        </Text>
        <Stack spacing={4} direction="column" align="center">
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <FormControl paddingBottom="0.5rem">
              <FormLabel htmlFor="email-username">Email or username</FormLabel>
              <Input
                id="email-username"
                placeholder="Email or username"
                size="md"
                variant="filled"
                _focus={{ backgroundColor: '#E2E8F0' }}
                {...register('emailOrUsername')}
              />
            </FormControl>
            <FormControl paddingBottom="0.5rem" isInvalid={!!loginError}>
              <InputGroup>
                <Input
                  id="password"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  size="md"
                  variant="filled"
                  _focus={{ backgroundColor: '#E2E8F0' }}
                  {...register('password')}
                />
                <InputRightElement position="absolute" right="1.2rem">
                  {!!loginError && <AiOutlineWarning color="red" />}
                </InputRightElement>
                <InputRightElement>
                  {showPassword ? (
                    <AiFillEye
                      cursor="pointer"
                      onClick={() => setShowIsPassword((lastVal) => !lastVal)}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      cursor="pointer"
                      onClick={() => setShowIsPassword((lastVal) => !lastVal)}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{loginError}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              w="100%"
              isDisabled={!isGood}
              background="teal"
              color="white"
              isLoading={loginIsLoading}
            >
              Login
            </Button>
          </form>
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

export default LoginWithEmail;
