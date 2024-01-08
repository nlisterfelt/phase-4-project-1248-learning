import React, { useEffect, useState } from "react";
import * as yup from "yup"
import { useFormik } from "formik";
import Select from "react-select";
import ReviewCard from "./ReviewCard";

const Review = ({deckOptions, reviewDeck, findReviewDeck}) => {
    const [isReview, setIsReview] = useState(false)
    const [reviewCard, setReviewCard] = useState([])
    const [session1Reviews, setSession1Reviews]=useState([])
    
    const formSchema=yup.object().shape({
        deck_id: yup.number().integer().positive().required("A deck is required to start reviewing.") 
    })

    const defaultValue = (options, value) => {
        return options ? options.find(option=>option.value===value):""
    }
    const formik = useFormik({
        initialValues: {
            deck_id: reviewDeck.id
        },
        validationSchema: formSchema,
        onSubmit: submitStartReview
    })
    function submitStartReview(values){
        const newReviewDeck = findReviewDeck(values.deck_id)
        setIsReview(true)
        setSession1Reviews(newReviewDeck.reviews.filter(review=>review.session===1))
        
    }
    return(
        <div>
            {!isReview ? <div >
                <form onSubmit={formik.handleSubmit}>
                    <label>Select a deck to review: </label>
                    <Select 
                        name="review_deck"
                        id="review_deck"
                        value={defaultValue(deckOptions, formik.values.deck_id)}
                        options={deckOptions}
                        onChange={value=>formik.setFieldValue('deck_id', value.value)}
                    />
                    {formik.errors.deck_id ? <div className="errors">{formik.errors.deck_id}</div> : null}
                    <button type="Submit" >Start</button>
                </form>
            </div> :
            <div>
                <button onClick={e=>setIsReview(false)}>Pause review session.</button>
                <ReviewCard card={reviewCard}/>
                <p>Ending a review session will move all cards to the next session, but keep their current levels.</p>
                <button onClick={e=>console.log('end review')}>End review session.</button>
            </div> }
        </div>
    )
}

export default Review