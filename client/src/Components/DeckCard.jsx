import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

function DeckCard({deck, deckItems, setDeckItems, findReviewDeck}){
    const [isEdit, setIsEdit]=useState(false)
    const [newDeckName, setNewDeckName]=useState('')
    const [numberOfCards, setNumberOfCards]=useState(0)

    const navigate = useNavigate()

    useEffect(()=>{
        setNumberOfCards(deck.cards.length)
    }, [])
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
                r.json().then(updatedDeck=>setDeckItems(deckItems.map(item=>{
                    if(updatedDeck.id===item.id){
                        return updatedDeck
                    } else {
                        return item
                    }
                })))
            }
        })
        setIsEdit(false)
    }
    function handleDeckDelete(id){
        fetch(`/api/decks/${id}`, {
            method: 'DELETE'
        }).then(r=> {
            if (r.ok) {setDeckItems(deckItems=>deckItems.filter(deck=>deck.id !== id))}
        })
    }
    function handleReviewClick(id){
        findReviewDeck(id)
        navigate('/review')
    }

    return(
        <div  className="deck_cards">
            <h4>{deck.name}</h4>
            <p>{numberOfCards} cards</p>
            <button onClick={e=>handleReviewClick(deck.id)}>Review</button>
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
