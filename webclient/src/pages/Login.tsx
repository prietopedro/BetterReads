import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../state/store/store';
import { login, LoginData } from '../state/store/features/userSlice';
import FormInput from '../components/FormInput';
import AuthWrapper from '../layout/AuthWrapper';

type LoginForm = {
  email: string;
  password: string;
};
function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isLoggedIn } = useAppSelector((state) => state.user);
  const onSubmit = async (values: LoginForm) => {
    const loginData: LoginData = {
      email: values.email,
      password: values.password,
    };
    dispatch(login(loginData));
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
        onSubmit={onSubmit}
      >
        <Form>
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
          <Button
            mt="1rem"
            type="submit"
            isLoading={false}
            width="100%"
            backgroundColor="teal.400"
            color="white"
            disabled={isLoading}
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
            isLoading={false}
            width="100%"
            backgroundColor="teal.400"
            color="white"
          >
            Demo Account
          </Button>
        </Form>
      </Formik>
    </AuthWrapper>
  );
}
export default Login;
