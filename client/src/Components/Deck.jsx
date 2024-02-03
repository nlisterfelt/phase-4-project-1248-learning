import React, { useEffect } from "react";
import DeckCard from "./DeckCard";
import { useFormik } from "formik";
import * as yup from "yup"

const Deck = ({deckItems, onNewDeck, onDeleteDeck, onEditDeck, setError}) => {
    useEffect(()=>{
        return ()=>setError(null)
    }, [])
    const formSchema=yup.object().shape({
        deckName: yup.string().min(1).max(100).required("Name required")
    })
    const formik = useFormik({
        initialValues: {
            deckName: ""
        },
        validationSchema: formSchema,
        onSubmit: handleNewDeckSubmit
    })
    function handleNewDeckSubmit(values){
        fetch('/api/decks', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: values.deckName
            })
        }).then(r=>{
            if (r.ok){
                r.json().then(deck =>{
                    onNewDeck(deck)
                    setError(null)
                })
            } else {
                r.json().then(data=>setError(data.error))
            }
        })
    }    

    const deckList = deckItems
        .sort((a,b)=>a.name>b.name?1:-1)
        .map(deck => <DeckCard key={deck.id} deck={deck} onEditDeck={onEditDeck} onDeleteDeck={onDeleteDeck} setError={setError}/>)

    return(
        <div>
            <h4>New Deck Form</h4>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="deckName">Name</label>
                <input value={formik.values.deckName} onChange={formik.handleChange} name="deckName" id="deckName"/>
                <button type="Submit">Create</button>
            </form>
            {formik.errors.deckName ? <div className="errors">{formik.errors.deckName}</div> : ""}
            <h4>Decks of Cards</h4>
            <div className="card_container">
                {deckList}   
            </div>
        </div>
    )
}

export default Deck