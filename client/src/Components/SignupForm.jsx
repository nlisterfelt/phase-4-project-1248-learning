import React, {useState} from "react";
import {useNavigate} from "react-router-dom"

function SignupForm({onLogin, onSetShowLogin}){
    const navigate = useNavigate()
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')
    const [errors, setErrors]=useState([])

    function handleSubmit(e){
        e.preventDefault()
        fetch('/api/signup', {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({
                username,
                password,
            }),
        }).then(r => {
            if (r.ok){
                r.json().then(user => {
                    onLogin(user)
                    onSetShowLogin(null)
                    navigate('/')
                })
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        })
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h3>Sign Up form</h3>
            <div>
                <label>username</label>
                <input type='text' id='username' value={username} onChange={e => setUsername(e.target.value)}/>
            </div>
            <div>
                <label>password</label>
                <input type='text' id='password' value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <button type='Submit'>Submit</button>
            <div>
                {errors.map(err => (<Error key={err}>{err}</Error>))}
            </div>
        </form>
    )
}

export default SignupForm