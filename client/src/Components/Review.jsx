import React, { useEffect, useState } from "react";
import * as yup from "yup"
import { useFormik } from "formik";
import Select from "react-select";
import ReviewCard from "./ReviewCard";

const Review = ({deckOptions, reviewDeck, findReviewDeck, cardItems, levelColors}) => {
    const [isReview, setIsReview] = useState(false)
    const [reviewCard, setReviewCard] = useState([])
    const [session1Reviews, setSession1Reviews]=useState([])
    const [isReviewsEmpty, setIsReviewsEmpty]=useState(false)
    const [reviewForCard, setReviewForCard]=useState({})

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
        const newReviewDeck = findReviewDeck(values.deck_id).reviews
        if(newReviewDeck.length===0){
            setReviewCard(null)
            setIsReviewsEmpty(true)
            setReviewForCard({})
        } else {
            setIsReview(true)
            const filteredReviews = newReviewDeck.filter(review=>review.session===1)
            setSession1Reviews(filteredReviews)
            chooseNewReviewCard(filteredReviews)
        }
    }
    function chooseNewReviewCard(reviews){
        const randomNum = Math.floor(Math.random()*reviews.length)
        const card = cardItems[randomNum]
        setReviewCard(card)
        for(let i=0; i<reviews.length; i++){
            if(reviews[i].card_id===card.id){
                setReviewForCard(reviews[i])
            }
        }
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
                        onChange={value=>{
                            formik.setFieldValue('deck_id', value.value)
                            setIsReviewsEmpty(false)
                        }}
                    />
                    {formik.errors.deck_id ? <div className="errors">{formik.errors.deck_id}</div> : null}
                    {isReviewsEmpty ? <div className="errors">This deck is empty. Select a different one to review or create a new card.</div> : null}
                    <button type="Submit" >Start</button>
                </form>
            </div> :
            <div>
                <button onClick={e=>setIsReview(false)}>Select a different deck</button>
                <ReviewCard card={reviewCard} levelColors={levelColors} review={reviewForCard}/>
                <button onClick={e=>console.log('end review')}>End review session.</button>
                <p>Ending a review session will move all cards to the next session, but keep their current levels.</p>

            </div> }
        </div>
    )
}

export default Review