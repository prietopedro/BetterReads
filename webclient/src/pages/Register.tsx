import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../state/store/store';
import { register, RegisterData } from '../state/store/features/userSlice';
import FormInput from '../components/FormInput';
import AuthWrapper from '../layout/AuthWrapper';

type RegisterForm = {
  name: '';
  email: '';
  password: '';
  confirmPassword: '';
};
function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isLoggedIn } = useAppSelector((state) => state.user);
  const onSubmit = async (values: RegisterForm) => {
    const registerData: RegisterData = {
      email: values.email,
      password: values.password,
    };
    dispatch(register(registerData));
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
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
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
            <Button
              type="submit"
              isLoading={isSubmitting}
              width="100%"
              backgroundColor="teal.400"
              color="white"
              mt="1rem"
              disabled={isLoading}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </AuthWrapper>
  );
}
export default Register;
