import React from "react";
import * as yup from "yup"
import { useFormik } from "formik";

const NewCard = ({deckItems, setError}) => {
    const formSchema=yup.object().shape({
        front_sentence: yup.string().required("The front of a card must have a sentence.").min(1).max(100),
        front_description: yup.string().max(500),
        front_url: yup.string().url(),
        back_sentence: yup.string().max(100),
        back_description: yup.string().max(500),
        back_url: yup.string().url(),
        deck_id: yup.number().positive().integer().required("A deck is required in order to create a card.")
    })
    const formik = useFormik({
        initialValues: {
            front_sentence: "",
            front_description: "",
            front_url: "",
            back_sentence: "",
            back_description: "",
            back_url: "",
            deck_id: []
        },
        validationSchema: formSchema,
        onSubmit: submitCard
    })
    function submitCard(values){
        fetch('/api/cards', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                front_sentence: values.front_sentence,
                front_description: values.front_description,
                front_url: values.front_url,
                back_sentence: values.back_sentence,
                back_description: values.back_description,
                back_url: values.back_url
            })
            .then(r=>{
                if(r.ok){
                    console.log(r)
                }
            })
        })
    }
    
    const deckOptions = deckItems.map(deck=><option key={deck.id} id={deck.id}>{deck.name}</option>)

    return (
        <form style={{textAlign: 'center'}} onSubmit={formik.onSubmit}>
            <h2 >New Card Form</h2>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="medium_card">
                    <h4>Front of card</h4>
                    <div>
                        <label html="front_sentence">Sentence</label>
                        <input type="text" name="front_sentence" id="front_sentence" values={formik.values.front_sentence}/>
                        <p style={{color: 'red'}}>{formik.errors.front_sentence}</p>
                    </div>
                    <div>
                        <label html="front_description">Description</label>
                        <input type="text" name="front_description" id="front_description" values={formik.values.front_description}/>
                        <p style={{color: 'red'}}>{formik.errors.front_description}</p>
                    </div>
                    <div>
                        <label html="front_url">Image url</label>
                        <input type="text" name="front_url" id="front_url" values={formik.values.front_url}/>
                        <p style={{color: 'red'}}>{formik.errors.front_url}</p>
                    </div>
                </div>
                <div className="medium_card">
                    <h4>Back of card</h4>
                    <div>
                        <label html="back_sentence">Sentence</label>
                        <input type="text" name="back_sentence" id="back_sentence" values={formik.values.back_sentence}/>
                        <p style={{color: 'red'}}>{formik.errors.back_sentence}</p>
                    </div>
                    <div>
                        <label html="back_description">Description</label>
                        <input type="text" name="back_description" id="back_description" values={formik.values.back_description}/>
                        <p style={{color: 'red'}}>{formik.errors.back_description}</p>
                    </div>
                    <div>
                        <label html="back_url">Image url</label>
                        <input type="text" name="back_url" id="back_url" values={formik.values.back_url}/>
                        <p style={{color: 'red'}}>{formik.errors.back_url}</p>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <p style={{paddingRight: '10px'}}>Select a deck for this card.</p>
                <select>
                    {deckOptions}
                </select>
            </div>
            <button type="Submit">Submit</button>
        </form>
    )
}

export default NewCard