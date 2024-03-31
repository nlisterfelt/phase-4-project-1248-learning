import React, {useState} from "react";
import ReviewListForm from "./ReviewListForm";

const ReviewListCard = ({deckItems, review, onReviewDelete, onReviewPatch}) => {
    const[isEditReview, setIsEditReview]=useState(false)
    const deckInfo = deckItems.find(item=>item.id===review.deck_id)
    return (
        <div>
            {deckInfo===undefined? null:
                <li>
                    Deck: {deckInfo.name}, Session: {review.session}, Level: {review.level}
                    <button onClick={e=>setIsEditReview(!isEditReview)}>Edit</button>  
                    <button onClick={e=>onReviewDelete(review.deck_id)}>X</button>
                </li>
            }
            {isEditReview ? <ReviewListForm review={review} setIsEditReview={setIsEditReview} onReviewPatch={onReviewPatch} deckInfo={deckInfo}/> : null}
        </div> 
    )
}

export default ReviewListCard