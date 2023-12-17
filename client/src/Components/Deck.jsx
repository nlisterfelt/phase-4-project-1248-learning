import React, {useEffect, useState} from "react";

function Deck({user}){
    const [deckName, setDeckName]=useState("")
    const [deckItems, setDeckItems]=useState([])

    useEffect(() => {
        fetch('/api/decks')
        .then(r => r.json())
        .then(data => {setDeckItems(data.filter(deck => deck.user_id === user.id))})    
    }, [])

    function handleSubmit(e){
        e.preventDefault()
        fetch("/api/decks", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({name: deckName, user_id: user.id})
        })
        .then(r => {
            if (r.ok) {
                r.json().then(data => {setDeckItems([...deckItems, data])})
            } 
        })
    }

    function handleDeckClick(e){
        console.log(e.target.id)
    }
    
    const deckList = deckItems.map(deck => <li key={deck.id} id={deck.id} onClick={handleDeckClick}>{deck.name}</li>)

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h4>Deck of Cards</h4>
                    <ul>{deckList}</ul>
                </div>
                <h4>Create a new deck of cards.</h4>
                <div>
                    <label>Name</label>
                    <input type='text' id='deck_name' value={deckName} onChange={e => setDeckName(e.target.value)}/>
                </div>
                <button type="Submit">Create</button>
            </form>
        </div>
    )
}

export default Deck