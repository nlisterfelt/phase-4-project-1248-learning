import React, {useState} from "react";
import ReviewListForm from "./ReviewListForm";

const ReviewListCard = ({deckItems, review, onReviewEdit, onReviewDelete, sessionAdvances}) => {
    const[isEditReview, setIsEditReview]=useState(false)
    const deckInfo = deckItems.find(item=>item.id===review.deck_id)
    
    return (
        <div>
            <li>
                Deck: {deckInfo.name}, Session: {review.session}, Level: {review.level} 
                <button onClick={e=>{
                    setIsEditReview(!isEditReview)
                    onReviewEdit(review)}
                }>Edit</button>  
                <button onClick={e=>onReviewDelete(review.deck_id)}>X</button>
            </li>
            {isEditReview ? <ReviewListForm sessionAdvances={sessionAdvances}/> : null}
        </div>
    )
}

export default ReviewListCard