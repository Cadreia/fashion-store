import React, { useState } from "react";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import {
  ButtonsContainer,
  SigninContainer,
  TitleContainer,
} from "./sign-in.styles";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/user/user.actions";
import { connect } from "react-redux";

const SignIn = ({ startEmailSignIn, startGoogleSignIn }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    startEmailSignIn({ email, password });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };
  return (
    <SigninContainer>
      <TitleContainer>I already have an account</TitleContainer>
      <span>Signin with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <ButtonsContainer>
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            onClick={startGoogleSignIn}
            isGoogleSignIn
          >
            SignIn with Google
          </CustomButton>
        </ButtonsContainer>
      </form>
    </SigninContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startGoogleSignIn: () => dispatch(googleSignInStart()),
  startEmailSignIn: (emailAndPassword) =>
    dispatch(emailSignInStart(emailAndPassword)),
});

export default connect(null, mapDispatchToProps)(SignIn);
