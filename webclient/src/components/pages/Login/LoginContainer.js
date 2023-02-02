import React, {useContext} from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../../common";
// import { toErrorMap } from "../utils/toErrorMap";
import { Button } from "@chakra-ui/core";
import { AuthWrapper } from "../../common";
import {login} from "../../../api"
import { AppContext } from "../../../state/context";
import useBookToast from "../../../utils/useToast";


const LoginContainer = () => {
  const {setUser} = useContext(AppContext)
  const router = useNavigate();
  const {toastSuccessful} = useBookToast()
  const onSubmit = async (values) => {
    if(!values.password) toastSuccessful("Must enter a password")
    else if(!values.email) toastSuccessful("Must enter an email")
    else{
    login(values).then(x => {
      if(x.user) {
        setUser(x.user)
        sessionStorage.setItem("loggedIn", true)
        router("/dashboard")
      }
    }).catch(() => {
      toastSuccessful("Wrong email and password combination")
    })
  }
}
  return (
    <AuthWrapper
      heading="Login to BetterReads"
      redirectText="Don't have an account?"
      redirectText2="Regisiter here."
      redirectLink="/register"
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
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
              isFullWidth
              backgroundColor="teal.400"
              color="white"
            >
              Login
            </Button>
            <Button
              mt="0.5rem"
              onClick={(e) => {
                e.preventDefault();
                onSubmit({email: "demo123@gmail.com", password: "demo123@gmail.com"})
              }}
              demo={true}
              isLoading={false}
              isFullWidth
              backgroundColor="teal.400"
              color="white"
            >
              Demo Account
            </Button>
          </Form>
      
      </Formik>
    </AuthWrapper>
  );
};
export default LoginContainer;