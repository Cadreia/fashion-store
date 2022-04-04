import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { SignupContainer, TitleContainer } from "./sign-up.styles";
import { signUpStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    const { onUserSignUp } = this.props;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    onUserSignUp({ email, password, displayName });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <SignupContainer>
        <TitleContainer>I do not have an account</TitleContainer>
        <span>Sign up aith your Email and Password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            name="displayName"
            type="text"
            label="Name"
            value={displayName}
            onChange={this.handleChange}
            required
          />
          <FormInput
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={this.handleChange}
            required
          />
          <FormInput
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={this.handleChange}
            required
          />
          <FormInput
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={this.handleChange}
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </SignupContainer>
    );
  }
}

const mapDispatchToPropss = (dispatch) => ({
  onUserSignUp: (userDetails) => dispatch(signUpStart(userDetails)),
});

export default connect(null, mapDispatchToPropss)(SignUp);
