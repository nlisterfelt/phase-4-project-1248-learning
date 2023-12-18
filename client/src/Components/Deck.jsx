import React, {useEffect, useState} from "react";
import DeckCard from "./DeckCard";

function Deck({user, deckItems}){
    
    const deckList = deckItems.map(deck => <DeckCard key={deck.id} deck={deck}/>)

    return(
        <div>
            <h4>Decks of Cards</h4>
            {deckList}
        </div>
    )
}

export default Deck