import React, { useContext, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { UserContext } from "../context/UserContext";

const DeckNameForm = ({onSubmitName}) => {
    const {setError}=useContext(UserContext)
    useEffect(()=>{
        return ()=>{setError(null)}
    },[])
    const formSchema = yup.object().shape({
        name: yup.string().required("Name required.").max(100)
    })
    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: formSchema,
        onSubmit: onSubmitName
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type='text' name="name" id="name" values={formik.values.name} onChange={formik.handleChange} />
            <p className="errors">{formik.errors.name}</p>
            <button type="Submit">Submit</button>
        </form>
    )
}

export default DeckNameForm