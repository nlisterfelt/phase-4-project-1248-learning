import React, {useEffect, useState} from "react";
import DeckCard from "./DeckCard";

function Deck({user}){
    const [deckItems, setDeckItems]=useState([])

    useEffect(()=>{
        fetch('/api/decks').then(r => {
            if (r.ok) {
                r.json().then(decks=>{
                    const deck_list = decks.filter(deck=>deck.user_id === user.id)
                    setDeckItems([...deckItems])
                })
            }
        })
    }, [])

    const deckList = deckItems.map(deck => <DeckCard key={deck.id} deck={deck}/>)

    return(
        <div>
            {deckList}
        </div>
    )
}

export default Deck