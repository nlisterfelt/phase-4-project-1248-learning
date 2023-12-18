import React from "react";
import DeckCard from "./DeckCard";

function Deck({deckItems, setDeckItems}){

    function handleDeckDelete(id){
        fetch(`/api/decks/${id}`, {
            method: 'DELETE'
        }).then(r=> {
            if (r.ok) {setDeckItems(deckItems=>deckItems.filter(deck=>deck.id !== id))}
        })
    }

    const deckList = deckItems.map(deck => <DeckCard key={deck.id} deck={deck} onDeckDelete={handleDeckDelete}/>)

    return(
        <div>
            <h4>Decks of Cards</h4>
            {deckList}
        </div>
    )
}

export default Deck