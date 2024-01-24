import React from "react";
import ReviewCard from "./ReviewCard";
import DeckForm from "./DeckForm";
import ReviewListCard from "./ReviewListCard";

const CardView = ({card, deckOptions, onEditReview, onEditCard, deckItems, sessionAdvances}) => {
    const deckList = card.decks
        .sort((a,b)=> a.name > b.name ? 1 : -1)
        .map(deck=>{
            const deckInfo = deckOptions.find(option=>option.value===deck.id)
            return <li key={deck.id} id={deck.id}>{deckInfo.label} <button onClick={e=>handleReviewDelete(deck.id)}>X</button></li>
        })
    const reviewList = card.reviews
        .sort((a,b)=> a.level>b.level ? 1 : -1)
        .map(review=><ReviewListCard key={review.id} id={review.id} deckItems={deckItems} review={review} onReviewEdit={handleReviewEdit} onReviewDelete={handleReviewDelete} sessionAdvances={sessionAdvances}/>)

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
                const updatedReviews = card.reviews.filter(item=>item.id!==review.id)
                card['reviews']=updatedReviews
                const updatedDecks = card.decks.filter(item=>item.id!=review.deck_id)
                card['decks']=updatedDecks
                onEditCard(card)
            }
        })
    }
    return (
        <div>
            <ReviewCard card={card} color={'black'} />
            <h4>Decks</h4>
            <ul>{deckList}</ul>
            <DeckForm filteredDeckOptions={filteredDeckOptions} card={card} onEditCard={onEditCard} deckItems={deckItems}/>
            <h4>Reviews</h4>
            <ul>{reviewList}</ul>
        </div>
    )
}

export default CardView