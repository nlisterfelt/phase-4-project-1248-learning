import React, {useContext, useState} from "react";
import DeckNameForm from "./DeckNameForm";
import { CardContext } from "../context/CardContext";

function DeckCard({deck}){
    const [isEdit, setIsEdit]=useState(false)
    const {deckItems, setDeckItems, deckOptions, setDeckOptions, handleEditDeck, handleDeleteReview}=useContext(CardContext)

    function handleDeckEditSubmit(values){
        fetch(`/api/decks/${deck.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values, null, 2)
        }).then(r=> {
            if (r.ok) {
                r.json().then(data=>handleEditDeck(data))
                setIsEdit(false)
            }
        })
    }
    function handleDeckDelete(id){
        fetch(`/api/decks/${id}`, {
            method: 'DELETE'
        }).then(r=> {
            if (r.ok) {
                handleDeleteDeck(id)
            }
        })
    }
    function handleDeleteDeck(id){
        const selectedDeck = deckItems.find(deck=>deck.id===id)
        for(let i=0;i<selectedDeck.reviews.length;i++){
            handleDeleteReview(selectedDeck.reviews[i])
        }
        const filteredDeckItems = deckItems.filter(deck=>deck.id!==id)
        setDeckItems(filteredDeckItems)
        const filteredDeckOptions = deckOptions.filter(option=>option.value!==id)
        setDeckOptions(filteredDeckOptions)
    }
    return(
        <div  className="deck_cards">
            <h4>{deck.name}</h4>
            <p>{deck.cards.length} {deck.cards.length==1 ? 'card' : 'cards'}</p>
            <button onClick={e=>{setIsEdit(!isEdit)}}>Edit</button>
            <button onClick={e=>handleDeckDelete(deck.id)}>X</button>
            {isEdit ? <DeckNameForm onSubmitName={handleDeckEditSubmit} />: null}
        </div>
    )
}

export default DeckCard
