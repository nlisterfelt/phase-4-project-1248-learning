import React from "react";
import * as yup from "yup"
import { useFormik } from "formik";

const ReviewListForm = ({sessionAdvances, review, setIsEditReview, onReviewPatch}) => {
    const formSchema = yup.object().shape({
        session: yup.number().positive().integer().required("Session required").min(1).max(1000),
        level: yup.number().integer().positive().min(1).max(sessionAdvances.length-1).required("Level required")
    })
    const formik = useFormik({
        initialValues: {
            session: review.session,
            level: review.level
        },
        validationSchema: formSchema,
        onSubmit: submitEditReview
    })

    function submitEditReview(values){
        setIsEditReview(false)
        onReviewPatch(review, values.session, values.level)
        
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <h4>Edit review</h4>
            <label htmlFor="session">Session: </label>
            <input type="number" name="session" id="session" values={formik.values.session} onChange={formik.handleChange} />

            <label htmlFor="level">Level: </label>
            <input type="number" name="level" id="level" values={formik.values.level} onChange={formik.handleChange} />
            <button type="Submit">Submit</button>
            {formik.errors.session ? <div className="errors">{formik.errors.session}</div> : null}
            {formik.errors.level ? <div className="errors">{formik.errors.level}</div> : null}
        </form>
    )
}

export default ReviewListForm