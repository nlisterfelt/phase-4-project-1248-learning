import React, {useEffect, useState} from "react";
import Card from "./Card";
import {useNavigate} from "react-router-dom"
import CardView from "./CardView";

const AllCards = ({cardItems, setCardItems, deckItems, onEditDeck, deckOptions, onEditCard, onEditReview, sessionAdvances, onReviewPatch, isFront, setIsFront}) => {
    const [category, setCategory] = useState('all_decks')
    const [isEdit, setIsEdit]=useState(false)
    const [editCard, setEditCard]=useState({})
    const navigate = useNavigate()

    const deckOptionsList = deckOptions
        .sort((a,b)=>a.label>b.label?1:-1)
        .map(deck=><option key={deck.value} id={deck.value} value={deck.label}>{deck.label}</option>)
    const cardList = cardItems
        .sort((a,b)=>a.front_title>b.front_title?1:-1)
        .filter(card=>filterCards(card)).map(card=><Card key={card.id} id={card.id} card={card} onEditCard={handleEditCard} onDeleteCard={handleDeleteCard}/>)
    
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
                        onEditDeck(newUpdatedDeck)
                    }
                }
            }
        })
    }
    function handleEditCard(card){
        setIsEdit(true)
        setEditCard(card)
    }
    
    return (
        <div>
            {!isEdit ? 
                <div>
                    <button onClick={e => navigate('/cards/new')}>Create a new card</button>
                    <h3>All cards</h3>
                    <label>Select a deck: </label>
                    <select onChange={e=>setCategory(e.target.value)}>
                        <option id={'all_decks'} value={'all_decks'}>All decks</option>
                        {deckOptionsList}
                    </select>
                    <div className="card_container">
                        {cardList.length === 0 ? <p>There are no cards in this deck...yet.</p> : cardList}
                    </div> 
                </div>:
                <div>
                    <button onClick={e=>setIsEdit(false)}>Back to All cards</button>
                    <CardView card={editCard} deckOptions={deckOptions} onEditReview={onEditReview} onEditCard={onEditCard} deckItems={deckItems} sessionAdvances={sessionAdvances} onReviewPatch={onReviewPatch} isFront={isFront} setIsFront={setIsFront}/>
                </div>
            }
        </div>
    )
}

export default AllCards