import React, { useEffect, useState } from "react";
import * as yup from "yup"
import { useFormik } from "formik";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const NewCard = ({deckItems, setError, cardItems, setCardItems}) => {
    const navigate = useNavigate()
    const [deckOptions, setDeckOptions]=useState([])
    const [isSubmitting, setIsSubmitting]=useState(false)

    useEffect(()=>{
        let newDeckOptions=[]
        for (let i=0; i<deckItems.length; i++){
            newDeckOptions = [...newDeckOptions, {'value': deckItems[i].id, 'label': deckItems[i].name}]
        }
        setDeckOptions(newDeckOptions)
        return ()=> {setError(null)}
    }, [])
    const interval = ()=>setInterval(()=>{setIsSubmitting(false)}, 10000)

    const formSchema=yup.object().shape({
        front_title: yup.string().required("The front of a card must have a sentence.").min(1).max(100),
        front_description: yup.string().max(500),
        front_image: yup.string().url(),
        back_title: yup.string().max(100),
        back_description: yup.string().max(500),
        back_image: yup.string().url(),
        deck_id: yup.number().positive().integer().required("A deck is required in order to create a card.")
    })
    const formik = useFormik({
        initialValues: {
            front_title: "",
            front_description: "",
            front_image: "",
            back_title: "",
            back_description: "",
            back_image: "",
            deck_id: 1
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
            body: JSON.stringify(values, null, 2)
        }).then(r=>{
            if(r.ok){
                r.json().then(data=>{
                    console.log(values)
                    submitReview(data, values.deck_id)
                })
            } 
        })
    }
    function submitReview(card_data, deck_id){
        fetch('/api/reviews', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                card_id: card_data.id,
                deck_id: deck_id
            })
        }).then(r=>{
            if(r.ok){
                r.json().then(data=>{
                    setCardItems([...cardItems, card_data])
                    setIsSubmitting(true)
                    interval()
                })
            } 
        })
    }
    const defaultValue = (options, value) => {
        return options ? options.find(option=>option.value===value):""
    }
    
    return (
        <div>
            <button onClick={e => navigate('/cards')}>Back to All Cards</button>
            <form style={{textAlign: 'center'}} onSubmit={formik.handleSubmit}>
                <h2 >New Card Form</h2>
                {isSubmitting ? <p>Your card has been created.</p> : null }
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
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <p style={{paddingRight: '10px'}}>Select a deck for this card.</p>
                    <Select 
                        name='deck_id' 
                        id='deck_id' 
                        value={defaultValue(deckOptions, formik.values.deck_id)} 
                        options={deckOptions} 
                        onChange={value=>formik.setFieldValue('deck_id', value.value)}
                    />
                </div>
                {formik.errors.deck_id ? <div>{formik.errors.deck_id}</div> : null}
                <button type='Submit'>Submit</button>
            </form>
        </div>
    )
}

export default NewCard