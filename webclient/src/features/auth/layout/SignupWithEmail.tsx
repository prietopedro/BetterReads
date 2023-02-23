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
  Box,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineWarning,
} from 'react-icons/ai';
import axiosWithCredentials from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';
import PhonenumberInput from '../components/Forms/PhonenumberInput';
import RegularInput from '../components/Forms/RegularInput';

import { ComponentToRender } from '../components/types';

type Props = {
  setModal: React.Dispatch<React.SetStateAction<ComponentToRender>>;
};

interface Inputs {
  identifier: string;
  password: string;
  otp: string;
}
type Submission = {
  email?: string;
  phone?: string;
};
async function RequestOTP(values: Submission) {
  await axiosWithCredentials.post('/api/users/otp', values);
}
function SignupWithEmailOrPassword({ setModal }: Props) {
  const [showPassword, setShowIsPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState<'email' | 'phone'>('email');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { identifier: '', password: '', otp: '' },
  });
  const {
    register: registerUser,
    isLoggedIn,
    registerError,
    registerIsLoading,
  } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formValues = {
      password: data.password,
      [emailOrPhone]: data.identifier,
    };
    console.log(formValues);
    // registerUser(formValues);
  };
  const { mutate: requestOTP } = useMutation({
    mutationFn: (params: Submission) => RequestOTP(params),
  });
  const isGood = watch('identifier')?.length && watch('password')?.length;
  return (
    <>
      <ModalBody>
        <Text as="h2" textAlign="center" fontSize="1.8rem" py="1rem">
          Signup
        </Text>
        <Stack spacing={4} direction="column" align="center">
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <FormControl paddingBottom="0.5rem">
              <Box display="flex" justifyContent="space-between" width="100%">
                <FormLabel htmlFor="email">Email</FormLabel>
                <Text
                  cursor="pointer"
                  onClick={() =>
                    setEmailOrPhone((old) =>
                      old === 'email' ? 'phone' : 'email',
                    )
                  }
                >
                  {emailOrPhone === 'email'
                    ? 'Sign up with phone'
                    : 'Sign up with email'}
                </Text>
              </Box>
              {emailOrPhone === 'email' ? (
                <Input
                  placeholder="Email"
                  variant="filled"
                  size="md"
                  _focus={{ backgroundColor: '#E2E8F0' }}
                  {...register('identifier')}
                />
              ) : (
                <InputGroup>
                  <InputLeftAddon border="none">+1</InputLeftAddon>
                  <Input
                    type="tel"
                    id="identifier"
                    placeholder="phone"
                    variant="filled"
                    size="md"
                    _focus={{ backgroundColor: '#E2E8F0' }}
                    {...register('identifier')}
                  />
                </InputGroup>
              )}
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
            <FormControl>
              <InputGroup>
                <Input
                  type="tel"
                  id="phone"
                  placeholder="phone"
                  variant="filled"
                  size="md"
                  _focus={{ backgroundColor: '#E2E8F0' }}
                  {...register('otp')}
                />
                <InputRightAddon
                  border="none"
                  cursor="pointer"
                  onClick={() =>
                    requestOTP({ [emailOrPhone]: watch('identifier') })
                  }
                >
                  Send Code
                </InputRightAddon>
              </InputGroup>
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

export default SignupWithEmailOrPassword;
