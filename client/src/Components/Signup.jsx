import React, { useContext } from "react";
import {useNavigate} from "react-router-dom"
import UserForm from "./UserForm";
import { UserContext } from "../context/UserContext";

const Signup = ({userInformation}) => {
    const {setShowLogin, setError}=useContext(UserContext)
    const navigate = useNavigate()

    function handleSubmitUser(values){
        fetch('/api/signup', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
        }).then(r => {
            if (r.ok){
                r.json().then(user => {
                    userInformation(user)
                    setShowLogin(null)
                    navigate('/')
                })
            } else {
                r.json().then(err => setError(err.error))
            }
        })
    }
    
    return (
        <div>
            <h3>Sign Up form</h3>
            <UserForm onSubmitUser={handleSubmitUser} setError={setError}/>
        </div>
        
    )
}

export default Signup