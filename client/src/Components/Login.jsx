import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Login({showLogin, onLogin, onSetShowLogin}){
    if (showLogin === 'login') {
        return <LoginForm onLogin={onLogin} onSetShowLogin={onSetShowLogin}/>
    } else if (showLogin === 'signup') {
        return <SignupForm onLogin={onLogin} onSetShowLogin={onSetShowLogin}/>
    }
}
export default Login;