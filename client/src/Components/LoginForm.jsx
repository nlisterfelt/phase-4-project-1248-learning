import React from "react";
import {useNavigate} from "react-router-dom"
import UserForm from "./UserForm";

function LoginForm({userInformation, onSetShowLogin, setError}){
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
                    onSetShowLogin(null)
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
            <UserForm onSubmitUser={handleSubmitLogin} setError={setError}/>
        </div>
    )
}

export default LoginForm;