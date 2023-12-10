import React, {useState} from "react";

function Login(){
    const [username, setUsername]=useState('')
    const [password, setPassword]=useState('')

    function handleSubmit(e){

    }
    return (
        <form onSubmit={handleSubmit}>
            <h3>Login form</h3>
            <div>
                <label>username</label>
                <input type='text' id='username' value={username} onChange={e => setUsername(e.target.value)}/>

                <label>password</label>
                <input type='text' id='password' value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <button type='Submit'>Submit</button>
        </form>
    )
}

export default Login;