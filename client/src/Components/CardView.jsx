import React, {useContext, useState} from "react";
import ReviewCard from "./ReviewCard";
import DeckForm from "./DeckForm";
import ReviewListCard from "./ReviewListCard";
import CardForm from "./CardForm";
import { UserContext } from "../context/UserContext";
import { CardContext } from "../context/CardContext";

const CardView = ({card, setIsView}) => {
    const {setError}=useContext(UserContext)
    const {deckOptions, setIsFront, handleEditCard, handleDeleteReview}=useContext(CardContext)
    const [isEdit, setIsEdit]=useState(false)
    const initialVal = {
        front_title: card.front_title,
        front_description: card.front_description,
        front_image: card.front_image,
        back_title: card.back_title,
        back_description: card.back_description,
        back_image: card.back_image,
        deck_id: 1
    }
    const deckList = card.decks
        .filter(deck=>deckOptions.find(option=>option.value===deck.id)!=='undefined')
        .map(deck=>{
            const deckInfo = deckOptions.find(option=>option.value===deck.id)
            if(deckInfo===undefined){
                return null
            } else {
                return <li key={deck.id} id={deck.id}>{deckInfo['label']!==undefined? deckInfo['label']: null}<button onClick={e=>handleReviewDelete(deck.id)}>X</button></li>
            }
        })
        
    const reviewList = card.reviews
        .filter(review=>deckOptions.find(option=>option.value===review.deck_id)!=='undefined')
        .map(review=><ReviewListCard key={review.id} id={review.id} review={review} onReviewDelete={e=>handleReviewDelete(review.deck_id)} />)

    const filteredDeckOptions = deckOptions.filter(deck=>{
        for(let i=0; i<card.decks.length; i++){
            if(card.decks[i].id===deck.value){
                return false
            }
        }
        return true
    })
    function handleReviewDelete(deckId){
        const review = card.reviews.find(item=>item.deck_id===deckId)
        fetch(`/api/reviews/${review.id}`, {
            method: 'DELETE',
        }).then(r=> {
            if (r.ok) {
                handleDeleteReview(review)
            }
        })
    }
    const handleSubmitCard = (values) => {
        fetch(`/api/cards/${card.id}`, {
            method: 'PATCH',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2)
        }).then(r=>{
            if(r.ok){
                r.json().then(data=>{
                    handleEditCard(data)
                    setIsView(false)
                    setIsFront(true)
                })
            } else {
                r.json().then(data=>setError(data.error))
            }
        })
    }
    const handleEditClick = () => {
        setIsEdit(!isEdit)
    }
    return (
        <div>
            <ReviewCard card={card} color={'black'} />
            <button onClick={handleEditClick}>{isEdit ? "Edit decks and reviews" : "Edit card"}</button>
            {isEdit?
            <CardForm onSubmitCard={handleSubmitCard} initialVal={initialVal}/> :
            <div>
                <h4>Decks</h4>
                <ul>{deckList}</ul>
                <DeckForm filteredDeckOptions={filteredDeckOptions} card={card} setIsView={setIsView}/>
                <h4>Reviews</h4>
                <ul>{reviewList}</ul>
            </div>}
        </div>
    )
}

export default CardView