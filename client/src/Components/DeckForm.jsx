import React from "react";
import Select from "react-select"
import * as yup from "yup"
import { useFormik } from "formik";

const DeckForm = ({filteredDeckOptions, card, onNewReview}) => {
    const formSchema=yup.object().shape({
        deck_id: yup.number().positive().integer().required("A deck is required.")
    })
    const formik = useFormik({
        initialValues: {
            deck_id: ''
        },
        validationSchema: formSchema,
        onSubmit: submitAddDeck
    })
    function submitAddDeck(values){
        fetch('/api/reviews', {
            method: 'POST', 
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                card_id: card.id,
                deck_id: values.deck_id
            })
        }).then(r=>{
            if(r.ok){
                r.json().then(data=>{
                    onNewReview(data)
                })
            }
        })
    }
    const defaultValue = (options, value) => {
        return options ? options.find(option=>option.value===value):""
    }
    
    return (
        <form style={{display: 'flex'}} onSubmit={formik.handleSubmit}>
            <label>Add this card to another deck: </label>
            <Select 
                name='deck_options'
                id='deck_options'
                value={defaultValue(filteredDeckOptions, formik.values.deck_id)}
                options={filteredDeckOptions}
                onChange={value=>formik.setFieldValue('deck_id', value.value)}
            />
            <button type="Submit" >Submit</button>
            {formik.errors.deck_id ? <div className="errors">{formik.errors.deck_id}</div> : null}
        </form>
    )
}

export default DeckForm