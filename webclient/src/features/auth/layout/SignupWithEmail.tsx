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
  email: string;
  password: string;
}

function SignupWithEmail({ setModal }: Props) {
  const [showPassword, setShowIsPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { email: '', password: '' },
  });
  const {
    register: registerUser,
    isLoggedIn,
    registerError,
    registerIsLoading,
  } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formValues = { password: data.password, email: '', username: '' };
    registerUser(formValues);
  };
  const isGood = watch('email').length && watch('password').length;
  return (
    <>
      <ModalBody>
        <Text as="h2" textAlign="center" fontSize="1.8rem" py="1rem">
          Signup
        </Text>
        <Stack spacing={4} direction="column" align="center">
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <FormControl paddingBottom="0.5rem">
              <FormLabel htmlFor="email-username">Email</FormLabel>
              <Input
                id="email"
                placeholder="Email"
                size="md"
                variant="filled"
                _focus={{ backgroundColor: '#E2E8F0' }}
                {...register('email')}
              />
            </FormControl>
            <FormControl paddingBottom="0.5rem" isInvalid={!!registerError}>
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
                  {!!registerError && <AiOutlineWarning color="red" />}
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
              <FormErrorMessage>{registerError}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              w="100%"
              isDisabled={!isGood}
              background="teal"
              color="white"
              isLoading={registerIsLoading}
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

export default SignupWithEmail;
