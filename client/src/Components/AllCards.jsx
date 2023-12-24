import React, {useState} from "react";
import Card from "./Card";

const AllCards = ({cardItems, deckItems}) => {
    const [category, setCategory] = useState('all_decks')
    
    const deckOptions = deckItems.map(deck=><option key={deck.id} id={deck.id}>{deck.name}</option>)
    //const cardList = cardItems.filter(card=>card.decks.includes(category)).map(card=><Card key={card.id} id={card.id} card={card}/>)
    const printCards=cardItems.map(card=>console.log(card))
    return (
        <div>
            <button>Create a new card</button>
            <h3>All cards</h3>
            <select onSelect={e=>setCategory(e.target.id)}>
                <option id={'all_decks'}>All decks</option>
                {deckOptions}
            </select>
            <div style={{display: 'flex'}}>
                
            </div>
        </div>
    )
}

export default AllCards