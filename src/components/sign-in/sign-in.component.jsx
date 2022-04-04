import React, { Component } from "react";
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

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { startEmailSignIn } = this.props;
    const emailAndPassword = this.state;
    startEmailSignIn(emailAndPassword);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { startGoogleSignIn } = this.props;
    return (
      <SigninContainer>
        <TitleContainer>I already have an account</TitleContainer>
        <span>Signin with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
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
  }
}

const mapDispatchToProps = (dispatch) => ({
  startGoogleSignIn: () => dispatch(googleSignInStart()),
  startEmailSignIn: (emailAndPassword) =>
    dispatch(emailSignInStart(emailAndPassword)),
});

export default connect(null, mapDispatchToProps)(SignIn);
