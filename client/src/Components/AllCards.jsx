import React, {useState} from "react";
import Card from "./Card";
import NewCard from "./NewCard";

function AllCards({cardItems, deckItems}){
    const [cardItemsFiltered, setCardItemsFiltered]=useState(cardItems)

    const cardList = cardItemsFiltered.map(card=><Card key={card.id} card={card}/>)
    const deckOptions = deckItems.map(deck=><option key={deck.id} id={deck.id}>{deck.name}</option>)

    function handleDeckSelect(id){
        if (id === 'all_decks'){
            setCardItemsFiltered(cardItems)
        } else {
            filteredCards = [...cardItems].filter(card=>card.deck.id===id)
            setCardItemsFiltered(filteredCards)
        }
    }
    return (
        <div>
            <button>Create a new card</button>
            <h3>All cards</h3>
            <select onSelect={e => handleDeckSelect(e.target.id)}>
                <option id={'all_decks'}>All decks</option>
                {deckOptions}
            </select>
            <div style={{display: 'flex'}}>
                {cardList}
            </div>
        </div>
    )
}

export default AllCards