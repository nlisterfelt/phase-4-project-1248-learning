import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom"
import * as yup from "yup"
import {useFormik} from "formik"

const SignupForm = ({onLogin, onSetShowLogin, setError}) => {
    const navigate = useNavigate()

    useEffect(()=>{
        return () => {setError(null)}
    }, [])
    const formSchema = yup.object().shape({
        username: yup.string().required("Username is required.").min(3).max(30),
        password: yup.string().required("Password is required.").min(3)
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: submitUser
    })

    function submitUser(values){
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
                    onLogin(user)
                    onSetShowLogin(null)
                    navigate('/')
                })
            } //else {
                //r.json().then(err => setError(err.errors))
            //}
        })
    }
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <h3>Sign Up form</h3>
            <div>
                <label html="username">username</label>
                <input type='text' name='username' id='username' values={formik.values.username} onChange={formik.handleChange}/>
                <p style={{color: 'red'}}>{formik.errors.username}</p>
            </div>
            <div>
                <label html="password">password</label>
                <input type='text' name='password' id='password' values={formik.values.password} onChange={formik.handleChange}/>
                <p style={{color: 'red'}}>{formik.errors.password}</p>
            </div>
            <button type='Submit'>Submit</button>
        </form>
    )
}

export default SignupForm