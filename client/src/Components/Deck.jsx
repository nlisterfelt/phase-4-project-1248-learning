import React, { useContext } from "react";
import DeckCard from "./DeckCard";
import DeckNameForm from "./DeckNameForm";
import { UserContext } from "../context/UserContext";
import { CardContext } from "../context/CardContext";

const Deck = () => {
    const {setError}=useContext(UserContext)
    const {deckItems, setDeckItems, deckOptions, setDeckOptions}=useContext(CardContext)
    
    const handleNewDeck = (deck)=>{
        const newDeckItems =[...deckItems, deck]
        setDeckItems(newDeckItems)
        const newDeckOptions=[...deckOptions, {value: deck.id, label: deck.name}]
        setDeckOptions(newDeckOptions)
    }
    function handleNewDeckSubmit(values){
        fetch('/api/decks', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values,null,2)
        }).then(r=>{
            if (r.ok){
                r.json().then(deck =>{
                    handleNewDeck(deck)
                    setError(null)
                })
            } else {
                r.json().then(data=>setError(data.error))
            }
        })
    }    

    const deckList = deckItems
        .sort((a,b)=>a.name>b.name?1:-1)
        .map(deck => <DeckCard key={deck.id} deck={deck}/>)

    
    return(
        <div>
            <h4>New Deck Form</h4>
            <DeckNameForm onSubmitName={handleNewDeckSubmit}/>
            <h4>Decks of Cards</h4>
            <div className="card_container">
                {deckList}   
            </div>
        </div>
    )
}

export default Deck