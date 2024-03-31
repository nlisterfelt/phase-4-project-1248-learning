import React, { useContext } from "react";
import { CardContext } from "../context/CardContext";

function Card({card, onViewCard}){
    const {cardItems, deckItems, setCardItems, handleEditDeck}=useContext(CardContext)
    function handleDeleteCard(card) {
        fetch(`/api/cards/${card.id}`, {
            method: 'DELETE'
        }).then(r=>{
            if (r.ok){
                const newCardItems = cardItems.filter(item=>item.id !== card.id)
                setCardItems(newCardItems)
                for(let i=0; i<card.decks.length; i++){
                    const updatedDeck = deckItems.find(item=>item.id===card.decks[i].id)
                    if(updatedDeck){
                        const filteredCardsList = updatedDeck.cards.filter(item=>item.id!==card.id)
                        const newUpdatedDeck = {...updatedDeck, cards: filteredCardsList}
                        handleEditDeck(newUpdatedDeck)
                    }
                }
            }
        })
    }
    return (
        <div className="cards">
            <h4>{card.front_title}</h4>
            <div style={{display: "flex", justifyContent: "center"}}>
                <button onClick={e=>onViewCard(card)}>View</button>
                <button onClick={e=>handleDeleteCard(card)}>X</button>
            </div>
        </div>
    ) 
}

export default Card