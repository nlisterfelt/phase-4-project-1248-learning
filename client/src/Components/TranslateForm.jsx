import React, {useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup"
import Select from "react-select"
import axios from "axios";

const API_KEY = "AIzaSyCd2LzbLKlVEp8WH5ntDBiJKiU4Y52p1nA"
const project_number = "learning-418920"

const TranslateForm = ({sentence}) => {
    const [isTranslate, setIsTranslate]=useState(false)
    const [translated, setTranslated]=useState("")    
    const languageOptions = [{value: "fr", label: "French"}, {value: "pl", label: "Polish"}, {value: "es", label: "Spanish"}]
    const API_URL = `https://translation.googleapis.com/language/translate/v2`

    const formSchema = yup.object().shape({
        language: yup.string().required("A translating language is required.")
    })
    const formik = useFormik({
        initialValues: {
            language: ""
        },
        validationSchema: formSchema,
        onSubmit: handleSubmit
    })

    function handleSubmit(values){
        setIsTranslate(true)
        async function doTranslation(){
            const {data}=await axios.post(API_URL, {}, {
                params: {
                    q: sentence,
                    target: values.language,
                    key: API_KEY
                }
            })
            setTranslated(data.data.translations[0].translatedText)
        }
        doTranslation()
    }
    
    const defaultValue = (options, value) => {
        return options ? options.find(option=>option.value===value):""
    }
    return (
        <div>
            <h3>Translate Front Sentence</h3>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="language">Language</label>
                <Select
                    name="language"
                    id="language"
                    value={defaultValue(languageOptions, formik.values.language)}
                    options={languageOptions}
                    onChange={value=>formik.setFieldValue('language', value.value)}
                />
                {formik.errors.language ? <div className="errors">{formik.errors.language}</div> : null}
                <button type="Submit">Translate</button>
                {isTranslate ? <div>Translated sentence: {translated}</div> : null}
            </form>
        </div>
    )
}

export default TranslateForm
