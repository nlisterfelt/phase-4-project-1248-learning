import React, {useContext, useState} from "react";
import ReviewListForm from "./ReviewListForm";
import { CardContext } from "../context/CardContext";

const ReviewListCard = ({review, onReviewDelete, onReviewPatch}) => {
    const {deckItems}=useContext(CardContext)
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