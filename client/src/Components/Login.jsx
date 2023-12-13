import React, {useState} from "react";
import Signup from "./Signup";

function Login({showLogin}){
    if (showLogin === 'login') {
        return <Login />
    } else if (showLogin === 'signup') {
        return <Signup />
    }
}
export default Login;