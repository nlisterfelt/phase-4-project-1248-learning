import React, {useState} from "react";
import DeckNameForm from "./DeckNameForm";

function DeckCard({deck, onEditDeck, onDeleteDeck, setError}){
    const [isEdit, setIsEdit]=useState(false)
    const [newDeckName, setNewDeckName]=useState('')

    function handleDeckEditSubmit(values){
        fetch(`/api/decks/${deck.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values, null, 2)
        }).then(r=> {
            if (r.ok) {
                r.json().then(data=>onEditDeck(data))
            }
        })
        setIsEdit(false)
    }
    function handleDeckDelete(id){
        fetch(`/api/decks/${id}`, {
            method: 'DELETE'
        }).then(r=> {
            if (r.ok) {
                onDeleteDeck(id)
            }
        })
    }

    return(
        <div  className="deck_cards">
            <h4>{deck.name}</h4>
            <p>{deck.cards.length} {deck.cards.length==1 ? 'card' : 'cards'}</p>
            <button onClick={e=>{
                setIsEdit(!isEdit)
                setNewDeckName(deck.name)
            }}>Edit</button>
            <button onClick={e=>handleDeckDelete(deck.id)}>X</button>
            {isEdit ? <DeckNameForm onSubmitName={handleDeckEditSubmit} setError={setError}/>: null}
        </div>
    )
}

export default DeckCard
