import React, {useEffect, useState} from "react";
import DeckCard from "./DeckCard";

function Deck({user}){
    const [deckItems, setDeckItems]=useState([])

    useEffect(()=>{
        fetch('/api/decks').then(r => {
            if (r.ok) {
                r.json().then(decks=>{
                    deck_list = decks.filter(deck=>deck.user_id === user.id)
                    setDeckItems([...deckItems])
                })
            }
        })
    }, [])

    return(
        <div>

        </div>
    )
}

export default Deck