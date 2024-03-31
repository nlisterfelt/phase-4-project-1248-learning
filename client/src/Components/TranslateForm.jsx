import React from "react";
import { useFormik } from "formik";
import * as yup from "yup"
import Select from "react-select"

const TranslateForm = () => {
    const languageOptions = ["English", "Spanish"]
    const formSchema = yup.object().shape({
        sentence: yup.string()
    })
    const formik = useFormik({
        initialValues: {
            sentence: "",
            first_language: "",
            second_language: ""
        },
        validationSchema: formSchema,
        onSubmit: handleSubmit
    })
    function handleSubmit(values){
        console.log(values)
    }
    const defaultValue = (options, value) => {
        return options ? options.find(option=>option.value===value):""
    }
    return (
        <div>
            <form>
                <h3>Translate Form</h3>
                <label htmlFor="">Starting language</label>
                <Select 
                    name="first_language"
                    id="first_language"
                    value={defaultValue(languageOptions, formik.values.first_language)}
                    options={languageOptions}
                    onChange={value=>formik.setFieldValue('first_language', value.value)}
                />
                <label htmlFor="">Sentence</label>

            </form>
        </div>
    )
}

export default TranslateForm