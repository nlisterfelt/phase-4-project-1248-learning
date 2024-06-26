import React, {useContext, useEffect} from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { UserContext } from "../context/UserContext";

const UserForm = ({onSubmitUser}) => {
    const {setError}=useContext(UserContext)
    useEffect(()=>{
        return () => {setError(null)}
    }, [])
    const formSchema = yup.object().shape({
        username: yup.string().required("Username is required.").min(3).max(30),
        password: yup.string().required("Password is required.").min(3).max(30)
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: onSubmitUser
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label html="username">username</label>
                <input type='text' name='username' id='username' values={formik.values.username} onChange={formik.handleChange}/>
                <p className="errors">{formik.errors.username}</p>
            </div>
            <div>
                <label html="password">password</label>
                <input type='text' name='password' id='password' values={formik.values.password} onChange={formik.handleChange}/>
                <p className="errors">{formik.errors.password}</p>
            </div>
            <button type='Submit'>Submit</button>
        </form>
    )
}

export default UserForm 