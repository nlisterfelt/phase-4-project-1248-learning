import React from "react";
import ReviewCard from "./ReviewCard";
import DeckForm from "./DeckForm";

const CardEdit = ({card, deckOptions, onEditReview, onEditCard}) => {
    const deckList = card.decks.map(deck=>{
        const deckInfo = deckOptions.find(option=>option.value===deck.id)
        return <li key={deck.id} id={deck.id}>{deckInfo.label} <button onClick={e=>handleReviewDelete(deck.id)}>X</button></li>
    })
    const reviewList = card.reviews.map(review=><li key={review.id} id={review.id}>Deck: {review.deck_id}, Session: {review.session}, Level: {review.level} <button onClick={e=>handleReviewEdit(review)}>Edit</button>  <button onClick={e=>handleReviewDelete(review.deck_id)}>X</button></li>)

    const filteredDeckOptions = deckOptions.filter(deck=>{
        for(let i=0; i<card.decks.length; i++){
            if(card.decks[i].id===deck.value){
                return false
            }
        }
        return true
    })
    function handleReviewEdit(review){
        console.log(review)
    }
    function handleReviewDelete(deckId){
        const review = card.reviews.find(item=>item.deck_id===deckId)
        fetch(`/api/reviews/${review.id}`, {
            method: 'DELETE',
        }).then(r=> {
            if (r.ok) {
                console.log('inside handleReviewDelete')
            }
        })
    }
    return (
        <div>
            <ReviewCard card={card} color={'black'} />
            <h4>Decks</h4>
            <ul>{deckList}</ul>
            <DeckForm filteredDeckOptions={filteredDeckOptions} card={card} onEditCard={onEditCard}/>
            <h4>Reviews</h4>
            <ul>{reviewList}</ul>
            <p style={{color: 'red'}}>When the last review or the deck with the last review is deleted, this card will be deleted as well.</p>
        </div>
    )
}

export default CardEdit