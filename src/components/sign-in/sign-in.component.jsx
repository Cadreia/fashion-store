import React, { Component } from "react";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.utils";
import {
  ButtonsContainer,
  SigninContainer,
  TitleContainer,
} from "./sign-in.styles";
import { onGoogleSignInStart } from "../../redux/user/user.sagas";
import { googleSignInStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await signInWithEmailAndPassword(auth, email, password);

      this.setState({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    }
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
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
          />
          <ButtonsContainer>
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton type="button" onClick={startGoogleSignIn} isGoogleSignIn>
              SignIn with Google
            </CustomButton>
          </ButtonsContainer>
        </form>
      </SigninContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startGoogleSignIn: () => dispatch(googleSignInStart())
});

export default connect(null, mapDispatchToProps)(SignIn);
