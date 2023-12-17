import React from "react";
import LoginForm from "./LoginForm";
import Signup from "./Signup";

function Login({showLogin, onLogin, onSetShowLogin}){
    if (showLogin === 'login') {
        return <LoginForm onLogin={onLogin} onSetShowLogin={onSetShowLogin}/>
    } else if (showLogin === 'signup') {
        return <Signup onLogin={onLogin} onSetShowLogin={onSetShowLogin}/>
    }
}
export default Login;