import React, {useState} from "react";
import Card from "./Card";
import NewCard from "./NewCard";

function AllCards({cardItems, deckItems}){
    const [cardItemsFiltered, setCardItemsFiltered]=useState(cardItems)

    const cardList = cardItemsFiltered.map(card=><Card key={card.id} card={card}/>)
    const deckOptions = deckItems.map(deck=><option key={deck.id} id={deck.id}>{deck.name}</option>)

    function handleDeckSelect(id){
        
    }
    return (
        <div>
            <button>Create a new card</button>
            <h3>All cards</h3>
            <select>
                <option>All decks</option>
                {deckOptions}
            </select>
            {cardList}
        </div>
    )
}

export default AllCards