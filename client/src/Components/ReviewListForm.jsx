import React from "react";
import * as yup from "yup"
import { useFormik } from "formik";

const ReviewListForm = ({sessionAdvances}) => {
    const formSchema = yup.object().shape({
        session: yup.integer().required("Integer greater than zero.").min(1).max(1000),
        level: yup.integer().min(1).max(sessionAdvances.length-1)
    })
    const formik = useFormik({
        initialValues: {

        }
    })

    return (
        <div>

        </div>
    )
}

export default ReviewListForm