import React, { useContext } from "react";
import Select from "react-select"
import * as yup from "yup"
import { useFormik } from "formik";
import { UserContext } from "../context/UserContext";
import { CardContext } from "../context/CardContext";

const DeckForm = ({filteredDeckOptions, card, setIsView}) => {
    const {setError}=useContext(UserContext)
    const {cardItems, deckItems, handleEditCard, handleEditDeck}=useContext(CardContext)
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
                    handleNewReview(data)
                    setIsView(false)
                })
            } else {
                r.json().then(data=>setError(data.error))
            }
        })
    }
    const defaultValue = (options, value) => {
        return options ? options.find(option=>option.value===value):""
    }
    function handleNewReview(review){
        const card = cardItems.find(item=>item.id===review.card_id)
        card['reviews'].push(review)
        const deck = deckItems.find(item=>item.id===review.deck_id)
        deck['reviews'].push(review)

        card['decks'].push(deck)
        deck['cards'].push(card)
        handleEditCard(card)
        handleEditDeck(deck)
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