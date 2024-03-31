import React, {useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup"
import Select from "react-select"


const TranslateForm = () => {
    const [translatedSentence, setTranslatedSentence]=useState("")
    const languageOptions = [{value: 1, label: "English"}, {value: 2, label: "Spanish"}]
    const formSchema = yup.object().shape({
        sentence: yup.string().required("Sentence is required."),
        first_language: yup.string().required("A starting language is required."),
        second_language: yup.string().required("A translating language is required.")
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
        setTranslatedSentence(formik.values.sentence)
    }
    const defaultValue = (options, value) => {
        return options ? options.find(option=>option.value===value):""
    }
    
    return (
        <div>
            <h3>Translate Form</h3>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <label htmlFor="">Starting language</label>
                <Select 
                    name="first_language"
                    id="first_language"
                    value={defaultValue(languageOptions, formik.values.first_language)}
                    options={languageOptions}
                    onChange={value=>formik.setFieldValue('first_language', value.value)}
                />
                {formik.errors.first_language ? <div className="errors">{formik.errors.first_language}</div> : null}
                <div style={{paddingTop: "20px", paddingBottom: "20px"}}>
                    <label htmlFor="sentence">Sentence</label>
                    <input type="text" name="sentence" id="sentence" values={formik.values.sentence} onChange={formik.handleChange}/>
                    {formik.errors.sentence ? <div className="errors">{formik.errors.sentence}</div> : null}
                </div>
                
                <label htmlFor="second_language">Translating language</label>
                <Select
                    name="second_language"
                    id="second_language"
                    value={defaultValue(languageOptions, formik.values.second_language)}
                    options={languageOptions}
                    onChange={value=>formik.setFieldValue('second_language', value.value)}
                />
                {formik.errors.second_language? <div className="errors">{formik.errors.second_language}</div> : null}
                <button type="Submit">Translate</button>
                {translatedSentence ? <p>Translated sentence: {translatedSentence}</p> : null}
            </form>
        </div>
    )
}

export default TranslateForm