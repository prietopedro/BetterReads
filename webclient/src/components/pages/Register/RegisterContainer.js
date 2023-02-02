import React, {useContext} from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../common";
// import { toErrorMap } from "../utils/toErrorMap";
import { Button } from "@chakra-ui/core";
import { AuthWrapper } from "../../common";
import {signup} from "../../../api"
import { AppContext } from "../../../state/context";
import useBookToast from "../../../utils/useToast";

const RegisterContainer = () => {
  const {setUser} = useContext(AppContext)
  const router = useNavigate();
  const {toastSuccessful} = useBookToast()
  const onSubmit = async (values) => {
    if(values.password !== values.confirmPassword) toastSuccessful("Password do not match")
    else if(!values.email) toastSuccessful("Must enter an email")
    else if(!values.name) toastSuccessful("Must enter a name")
    else if(!values.password || !values.confirmPassword) toastSuccessful("Must enter password twice")
    else{
      signup(values).then(x => {
        if(x.user) {
          setUser(x.user)
          sessionStorage.setItem("loggedIn", true)
          router("/dashboard")
        }
      }).catch(() => {
        toastSuccessful("Already a user with that email")
      })
    }
  }
  return (
<AuthWrapper
      heading="Register to BetterReads"
      redirectText="Already have an account?"
      redirectText2="Login here."
      redirectLink="/login"
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
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
              isFullWidth
              backgroundColor="teal.400"
              color="white"
              mt="1rem"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </AuthWrapper>
  );
};
export default RegisterContainer;