import React from "react";
import DeckCard from "./DeckCard";
import DeckNameForm from "./DeckNameForm";

const Deck = ({deckItems, onNewDeck, onDeleteDeck, onEditDeck, setError}) => {
    
    function handleNewDeckSubmit(values){
        fetch('/api/decks', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values,null,2)
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
            <DeckNameForm onSubmitName={handleNewDeckSubmit} setError={setError}/>
            <h4>Decks of Cards</h4>
            <div className="card_container">
                {deckList}   
            </div>
        </div>
    )
}

export default Deck