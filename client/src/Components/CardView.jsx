import React, {useState} from "react";
import ReviewCard from "./ReviewCard";
import DeckForm from "./DeckForm";
import ReviewListCard from "./ReviewListCard";
import CardForm from "./CardForm";

const CardView = ({card, deckOptions, deckItems, sessionAdvances, onReviewPatch, isFront, setIsFront, onDeleteReview, onNewReview, isNewCard, setIsNewCard, setError}) => {
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
        .sort((a,b)=> a.name > b.name ? 1 : -1)
        .map(deck=>{
            const deckInfo = deckOptions.find(option=>option.value===deck.id)
            return <li key={deck.id} id={deck.id}>{deckInfo.label} <button onClick={e=>handleReviewDelete(deck.id)}>X</button></li>
        })
    const reviewList = card.reviews
        .sort((a,b)=> a.level>b.level ? 1 : -1)
        .map(review=><ReviewListCard key={review.id} id={review.id} deckItems={deckItems} review={review} onReviewDelete={e=>handleReviewDelete(review.deck_id)} sessionAdvances={sessionAdvances} onReviewPatch={onReviewPatch}/>)

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
                onDeleteReview(review)
            }
        })
    }
    const handleSubmitCard = (values) => {
        console.log(values)
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
                    console.log('data from editing a card', data)
                })
            } else {
                console.log('error')
                r.json().then(data=>setError(data.error))
            }
        })
    }
    const handleEditClick = () => {
        setIsEdit(!isEdit)
    }
    return (
        <div>
            <ReviewCard card={card} color={'black'} isFront={isFront} setIsFront={setIsFront}/>
            <button onClick={handleEditClick}>{isEdit ? "Edit decks and reviews" : "Edit card"}</button>
            {isEdit?
            <CardForm onSubmitCard={handleSubmitCard} deckOptions={{}} isNewCard={isNewCard} initialVal={initialVal}/> :
            <div>
                <h4>Decks</h4>
                <ul>{deckList}</ul>
                <DeckForm filteredDeckOptions={filteredDeckOptions} card={card} deckItems={deckItems} onNewReview={onNewReview}/>
                <h4>Reviews</h4>
                <ul>{reviewList}</ul>
            </div>}
        </div>
    )
}

export default CardView