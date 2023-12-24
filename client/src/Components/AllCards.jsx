import React, {useState} from "react";
import Card from "./Card";

const AllCards = ({cardItems, deckItems}) => {
    const [category, setCategory] = useState('all_decks')
    
    const deckOptions = deckItems.map(deck=><option key={deck.id} id={deck.id} value={deck.name}>{deck.name}</option>)
    const cardList = cardItems.filter(card=>filterCards(card)).map(card=><Card key={card.id} id={card.id} card={card}/>)

    function filterCards(card){
        if(category==='all_decks'){
            return true
        } else {
            for (let i=0; i<card.decks.length; i++){
                if(card.decks[i].name===category){
                    return true
                }
            }
        }     
        return false
    }
    return (
        <div>
            <button>Create a new card</button>
            <h3>All cards</h3>
            <select onChange={e=>setCategory(e.target.value)}>
                <option id={'all_decks'} value={'all_decks'}>All decks</option>
                {deckOptions}
            </select>
            <div style={{display: 'flex'}}>
                {cardList.length === 0 ? <p>There are no cards in this deck...yet.</p> : cardList}
            </div>
        </div>
    )
}

export default AllCards