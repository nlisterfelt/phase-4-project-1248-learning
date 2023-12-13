import React, {useState} from "react";
import LoginForm from "./LoginForm";
import Signup from "./Signup";

function Login({showLogin}){
    if (showLogin === 'login') {
        return <LoginForm />
    } else if (showLogin === 'signup') {
        return <Signup />
    }
}
export default Login;