import React, { useEffect } from "react";
import DeckCard from "./DeckCard";
import { useFormik } from "formik";
import * as yup from "yup"

const Deck = ({deckItems, findReviewDeck, onNewDeck, onDeleteDeck, onEditDeck, setError}) => {
    useEffect(()=>{
        return ()=>setError(null)
    }, [])
    const formSchema=yup.object().shape({
        newDeckName: yup.string().min(1).max(100)
    })
    const formik = useFormik({
        initialValues: {
            newDeckName: ''
        },
        validationSchema: formSchema,
        onSubmit: handleNewDeckSubmit
    })
    function handleNewDeckSubmit(values){
        fetch('/api/decks', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: values.newDeckName
            })
        }).then(r=>{
            if (r.ok){
                r.json().then(deck =>onNewDeck(deck))
            } else {
                r.json().then(data=>setError(data.error))
            }
        })
    }    

    const deckList = deckItems
        .sort((a,b)=>a.name>b.name?1:-1)
        .map(deck => <DeckCard key={deck.id} deck={deck} findReviewDeck={findReviewDeck} onEditDeck={onEditDeck} onDeleteDeck={onDeleteDeck}/>)

    return(
        <div>
            <h4>New Deck Form</h4>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="newDeckName">Name</label>
                <input value={formik.values.newDeckName} onChange={formik.handleChange} name="newDeckName" id="newDeckName"/>
                <button type="Submit">Create</button>
            </form>
            <h4>Decks of Cards</h4>
            <div className="card_container">
                {deckList}   
            </div>
        </div>
    )
}

export default Deck