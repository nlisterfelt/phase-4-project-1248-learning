import React from "react";

const CardEdit = ({card}) => {
    const deckList = card.decks.map(deck=><li key={deck.id} id={deck.id}>{deck.id}</li>)
    const reviewList = card.reviews.map(review=><li key={review.id} id={review.id}>Deck: {review.deck_id}, Session: {review.session}, Level: {review.level} <button onClick={e=>handleReviewEdit(review)}>Edit</button>  <button onClick={e=>handleReviewDelete(review)}>X</button></li>)

    function handleReviewEdit(review){
        console.log(review)
    }
    function handleReviewDelete(review){
        console.log(review)
    }
    return (
        <div>
            {card.front_title}
            <p style={{color: 'red'}}>When the last review or the deck with the last review is deleted, this card will be deleted as well.</p>
            <h4>Decks <button>Add</button></h4>
            <ul>{deckList}</ul>
            <h4>Reviews</h4>
            <ul>{reviewList}</ul>
        </div>
    )
}

export default CardEdit