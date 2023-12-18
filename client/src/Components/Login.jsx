import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Login({showLogin, userInformation, onSetShowLogin}){
    if (showLogin === 'login') {
        return <LoginForm userInformation={userInformation} onSetShowLogin={onSetShowLogin}/>
    } else if (showLogin === 'signup') {
        return <SignupForm userInformation={userInformation} onSetShowLogin={onSetShowLogin}/>
    }
}
export default Login;