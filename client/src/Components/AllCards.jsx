import React, {useContext, useState} from "react";
import Card from "./Card";
import {useNavigate} from "react-router-dom"
import CardView from "./CardView";
import { CardContext } from "../context/CardContext";

const AllCards = () => {
    const {deckItems, cardItems, setCardItems, deckOptions, setIsNewCard, handleEditDeck}=useContext(CardContext)
    const [category, setCategory] = useState('all_decks')
    const [isView, setIsView]=useState(false)
    const [editCard, setEditCard]=useState({})

    const navigate = useNavigate()

    const deckOptionsList = deckOptions
        .sort((a,b)=>a.label>b.label?1:-1)
        .map(deck=><option key={deck.value} id={deck.value} value={deck.label}>{deck.label}</option>)
    const cardList = cardItems
        .sort((a,b)=>a.front_title>b.front_title?1:-1)
        .filter(card=>filterCards(card)).map(card=><Card key={card.id} id={card.id} card={card}  onDeleteCard={handleDeleteCard} onViewCard={handleViewCard}/>)
    
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
                        handleEditDeck(newUpdatedDeck)
                    }
                }
            }
        })
    }
    function handleViewCard(card){
        setIsNewCard(false)
        setIsView(true)
        setEditCard(card)
    }
    
    return (
        <div>
            {!isView ? 
                <div>
                    <button onClick={e => {
                        setIsNewCard(true)
                        navigate('/cards/new')}
                        }>Create a new card</button>
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
                    <button onClick={e=>setIsView(false)}>Back to All cards</button>
                    <CardView card={editCard} setIsView={setIsView}/>
                </div>
            }
        </div>
    )
}

export default AllCards