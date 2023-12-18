import React, {useState} from "react";
import DeckCard from "./DeckCard";

function Deck({user, deckItems, setDeckItems}){
    const [newDeckName, setNewDeckName]=useState('')

    function handleNewDeck(e){
        e.preventDefault()
        fetch('/api/decks', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: newDeckName,
                user_id: user.id
            })
        }).then(r=>{
                if (r.ok){
                    setNewDeckName('')
                    r.json().then(deck =>setDeckItems([...deckItems, deck]))
                }
        })
    }    

    const deckList = deckItems.map(deck => <DeckCard key={deck.id} deck={deck} setDeckItems={setDeckItems} deckItems={deckItems}/>)

    return(
        <div>
            <h4>New Deck Form</h4>
            <form onSubmit={handleNewDeck}>
                <label>Name</label>
                <input value={newDeckName} onChange={e=>setNewDeckName(e.target.value)}/>
                <button>Create</button>
            </form>
            <h4>Decks of Cards</h4>
            {deckList}
        </div>
    )
}

export default Deck