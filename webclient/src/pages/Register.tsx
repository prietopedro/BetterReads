import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { object, ref, string } from 'yup';

import FormInput from '../components/FormInput';
import AuthWrapper from '../layout/AuthWrapper';
import useAuth from '../hooks/useAuth';

type RegisterForm = {
  name: '';
  email: '';
  password: '';
  confirmPassword: '';
};
function Register() {
  const navigate = useNavigate();
  const { isLoggedIn, register, registerError, registerIsLoading } = useAuth();
  const onSubmit = async (values: RegisterForm) => {
    register({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/home');
  }, [isLoggedIn, navigate]);

  return (
    <AuthWrapper
      heading="Register to BetterReads"
      redirectText="Already have an account?"
      redirectText2="Login here."
      redirectLink="/login"
    >
      <Formik
        initialValues={
          {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          } as RegisterForm
        }
        validationSchema={object({
          email: string()
            .email('Please provide a valid email address')
            .required('Email address is required'),
          password: string().required('Password is required'),
          name: string().required('Full name is required to register'),
          confirmPassword: string().oneOf(
            [ref('password')],
            'Passwords must match',
          ),
        })}
        onSubmit={onSubmit}
      >
        <FormControl isInvalid={!!registerError}>
          <Form>
            <FormInput
              name="name"
              placeholder="Enter your name"
              label="Full Name"
            />
            <FormInput
              name="email"
              placeholder="Enter your email"
              label="Email Address"
            />
            <FormInput
              name="password"
              placeholder="Enter a password"
              label="Password"
              type="password"
            />
            <FormInput
              name="confirmPassword"
              placeholder="Reenter your password"
              label="Confirm Password"
              type="password"
            />
            <FormErrorMessage>{registerError}</FormErrorMessage>
            <Button
              type="submit"
              isLoading={registerIsLoading}
              width="100%"
              backgroundColor="teal.400"
              color="white"
              mt="1rem"
            >
              Register
            </Button>
          </Form>
        </FormControl>
      </Formik>
    </AuthWrapper>
  );
}
export default Register;
