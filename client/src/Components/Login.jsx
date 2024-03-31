import React, { useContext } from "react";
import {useNavigate} from "react-router-dom"
import UserForm from "./UserForm";
import { UserContext } from "../context/UserContext";

function Login({userInformation}){
    const {setShowLogin, setError} = useContext(UserContext)
    const navigate = useNavigate() 

    function handleSubmitLogin(values){
        fetch("/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(values, null, 2)
        }).then(r => {
            if (r.ok) {
                r.json().then(user => {
                    userInformation(user)
                    setShowLogin(null)
                    navigate('/')
                })
            } else {
                r.json().then(data=>setError(data.error))
            }
        })
    }
    
    return (
        <div>
            <h3>Log In form</h3>
            <UserForm onSubmitUser={handleSubmitLogin}/>
        </div>
    )
}

export default Login;