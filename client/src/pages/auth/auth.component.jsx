import React from 'react'
import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component'
import { SigninAndSignupContainer } from './auth.styles'

const Auth = () => {
    return (
        <SigninAndSignupContainer>
            <SignIn />
            <SignUp />
        </SigninAndSignupContainer>
    )
}

export default Auth
