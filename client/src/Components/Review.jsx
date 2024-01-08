import React, { useState } from "react";
import Select from "react-select";
import ReviewCard from "./ReviewCard";

const Review = ({deckOptions, reviewDeck, setReviewDeck}) => {
    const [isReview, setIsReview] = useState(false)

    const defaultValue = (options, value) => {
        return options ? options.find(option=>option.value===value):""
    }
    const handleSubmit = () => {
        setIsReview(true)
        
    }
    return(
        <div>
            {!isReview ? <div>
                <label>Select a deck to review: </label>
                <Select 
                    name="review_deck"
                    id="review_deck"
                    value={defaultValue(deckOptions, reviewDeck)}
                    options={deckOptions}
                    onChange={value=>setReviewDeck(value.value)}
                />
                <button type="Submit" onSubmit={handleSubmit}>Start</button>
            </div> :
            <div>
                <ReviewCard />
            </div> }
        </div>
    )
}

export default Review