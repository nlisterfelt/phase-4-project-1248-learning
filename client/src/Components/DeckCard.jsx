import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

function DeckCard({deck, findReviewDeck, onEditDeck, onDeleteDeck}){
    const [isEdit, setIsEdit]=useState(false)
    const [newDeckName, setNewDeckName]=useState('')
    
    const navigate = useNavigate()

    function handleDeckEditSubmit(e){
        e.preventDefault()
        fetch(`/api/decks/${deck.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: newDeckName
            })
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
            {isEdit ? <form onSubmit={handleDeckEditSubmit}>
                <label>New name</label>
                <input value={newDeckName} onChange={e=>setNewDeckName(e.target.value)}></input>
                <button>Submit</button>
            </form>: null}
        </div>
    )
}

export default DeckCard
