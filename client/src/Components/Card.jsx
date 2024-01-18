import React, {useState} from "react";

function Card({card, cardItems, setCardItems, onUpdateDeck, deckItems}){
    const [isEdit, setIsEdit]=useState(false)

    function handleDelete(id){
        fetch(`/api/cards/${id}`, {
            method: 'DELETE'
        }).then(r=>{
            if (r.ok){
                const newCardItems = cardItems.filter(item=>item.id !== id)
                setCardItems(newCardItems)
                for(let i=0; i<card.decks.length; i++){
                    const updatedDeck = deckItems.find(item=>item.id===card.decks[i].id)
                    if(updatedDeck){
                        const filteredCardsList = updatedDeck.cards.filter(item=>item.id!==card.id)
                        const newUpdatedDeck = {...updatedDeck, cards: filteredCardsList}
                        onUpdateDeck(newUpdatedDeck)
                    }
                }
            }
        })
    }

    return (
        <div className="cards">
            <h4>{card.front_title}</h4>
            <div style={{display: "flex"}}>
                <button>View</button>
                <button onClick={e=>handleDelete(card.id)}>X</button>
            </div>
        </div>
    ) 
}

export default Card