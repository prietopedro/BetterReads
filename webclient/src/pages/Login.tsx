import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Button, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { string, object } from 'yup';

import FormInput from '../components/HTMLElements/FormInput';
import AuthWrapper from '../layout/AuthWrapper';
import useAuth from '../hooks/useAuth';

type LoginForm = {
  email: string;
  password: string;
};
function Login() {
  const navigate = useNavigate();
  const { isLoggedIn, login, loginError, loginIsLoading } = useAuth();

  const onSubmit = async (values: LoginForm) => {
    login({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (isLoggedIn) navigate('/home');
  }, [isLoggedIn, navigate]);

  return (
    <AuthWrapper
      heading="Login to BetterReads"
      redirectText="Don't have an account?"
      redirectText2="Regisiter here."
      redirectLink="/register"
    >
      <Formik
        initialValues={
          {
            email: '',
            password: '',
          } as LoginForm
        }
        validationSchema={object({
          email: string()
            .email('Please provide a valid email address')
            .required('Email address is required'),
          password: string().required('Password is required'),
        })}
        onSubmit={onSubmit}
      >
        <Form>
          <FormControl isInvalid={!!loginError}>
            <FormInput
              name="email"
              placeholder="Enter your email"
              label="Email Address"
            />
            <FormInput
              name="password"
              placeholder="Enter your password"
              label="Password"
              type="password"
            />

            <FormErrorMessage>{loginError}</FormErrorMessage>

            <Button
              mt="1rem"
              type="submit"
              isLoading={loginIsLoading}
              width="100%"
              backgroundColor="teal.400"
              color="white"
            >
              Login
            </Button>
            <Button
              mt="0.5rem"
              onClick={(e) => {
                e.preventDefault();
                onSubmit({
                  email: 'demo123@gmail.com',
                  password: 'demo123@gmail.com',
                });
              }}
              isLoading={loginIsLoading}
              width="100%"
              backgroundColor="teal.400"
              color="white"
            >
              Demo Account
            </Button>
          </FormControl>
        </Form>
      </Formik>
    </AuthWrapper>
  );
}
export default Login;
