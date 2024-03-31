import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup"
import Select from "react-select";
import { CardContext } from "../context/CardContext";

const CardForm = ({onSubmitCard, initialVal}) => {
    const {deckOptions, isNewCard}=useContext(CardContext)
    const formSchema=yup.object().shape({
        front_title: yup.string().required("The front of a card must have a sentence.").min(1).max(100),
        front_description: yup.string().max(500),
        front_image: yup.string().url(),
        back_title: yup.string().max(100),
        back_description: yup.string().max(500),
        back_image: yup.string().url(),
        deck_id: yup.number().positive().integer()
    })
    const formik = useFormik({
        initialValues: initialVal,
        validationSchema: formSchema,
        onSubmit: onSubmitCard
    })
    const defaultValue = (options, value) => {
        return options ? options.find(option=>option.value===value):""
    }
    return (
        <div>
            <form style={{textAlign: 'center'}} onSubmit={formik.handleSubmit}>
                <h2 >{isNewCard? "New Card Form" : "Edit Card Form"}</h2>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="medium_card">
                        <h4>Front</h4>
                        <div>
                            <label htmlFor="front_title">Sentence</label>
                            <input type="text" name="front_title" id="front_title" values={formik.values.front_title} onChange={formik.handleChange}/>
                            <p style={{color: 'red'}}>{formik.errors.front_title}</p>
                        </div>
                        <div>
                            <label htmlFor="front_description">Description</label>
                            <input type="text" name="front_description" id="front_description" values={formik.values.front_description} onChange={formik.handleChange}/>
                            <p style={{color: 'red'}}>{formik.errors.front_description}</p>
                        </div>
                        <div>
                            <label htmlFor="front_image">Image url</label>
                            <input type="text" name="front_image" id="front_image" values={formik.values.front_image} onChange={formik.handleChange}/>
                            <p style={{color: 'red'}}>{formik.errors.front_image}</p>
                        </div>
                    </div>
                    <div className="medium_card">
                        <h4>Back</h4>
                        <div>
                            <label htmlFor="back_title">Sentence</label>
                            <input type="text" name="back_title" id="back_title" values={formik.values.back_title} onChange={formik.handleChange}/>
                            <p style={{color: 'red'}}>{formik.errors.back_title}</p>
                        </div>
                        <div>
                            <label htmlFor="back_description">Description</label>
                            <input type="text" name="back_description" id="back_description" values={formik.values.back_description} onChange={formik.handleChange}/>
                            <p style={{color: 'red'}}>{formik.errors.back_description}</p>
                        </div>
                        <div>
                            <label htmlFor="back_image">Image url</label>
                            <input type="text" name="back_image" id="back_image" values={formik.values.back_image} onChange={formik.handleChange}/>
                            <p style={{color: 'red'}}>{formik.errors.back_image}</p>
                        </div>
                    </div>
                </div>
                {isNewCard ? <div style={{display: 'flex', justifyContent: 'center'}}>
                    <p style={{paddingRight: '10px'}}>Select a deck for this card.</p>
                    <Select 
                        name='deck_id' 
                        id='deck_id' 
                        value={defaultValue(deckOptions, formik.values.deck_id)} 
                        options={deckOptions} 
                        onChange={value=>formik.setFieldValue('deck_id', value.value)}
                    />
                </div> : null}
                {formik.errors.deck_id ? <div className="errors">{formik.errors.deck_id}</div> : null}
                <button type='Submit'>Submit</button>
            </form>
        </div>
    )
}

export default CardForm