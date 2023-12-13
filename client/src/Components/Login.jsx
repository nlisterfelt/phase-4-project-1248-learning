import React, {useState} from "react";
import LoginForm from "./LoginForm";
import Signup from "./Signup";

function Login({showLogin, onLogin}){
    if (showLogin === 'login') {
        return <LoginForm onLogin={onLogin}/>
    } else if (showLogin === 'signup') {
        return <Signup onLogin={onLogin}/>
    }
}
export default Login;