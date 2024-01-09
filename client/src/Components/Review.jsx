import React, { useEffect, useState } from "react";
import * as yup from "yup"
import { useFormik } from "formik";
import Select from "react-select";
import ReviewCard from "./ReviewCard";

const Review = ({deckOptions, reviewDeck, findReviewDeck, cardItems, levelColors, sessionAdvances}) => {
    const [isReview, setIsReview] = useState(false)
    const [reviewCard, setReviewCard] = useState([])
    const [session1Reviews, setSession1Reviews]=useState([])
    const [isReviewsEmpty, setIsReviewsEmpty]=useState(false)
    const [reviewForCard, setReviewForCard]=useState({})
    const [isDone, setIsDone]=useState(false)

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
            const filteredReviews = newReviewDeck.filter(review=>review.session===1)
            setIsReview(true)
            setSession1Reviews(filteredReviews)
            chooseNewReviewCard(filteredReviews)
        }
    }
    function chooseNewReviewCard(reviews){
        const randomNum = Math.floor(Math.random()*reviews.length)
        const selectedReview = reviews[randomNum]
        const card = cardItems.find(card=>card.id===selectedReview.card_id)
        setReviewCard(card)
        setReviewForCard(selectedReview)
    }
    const handleWrongReview = (review) => {
        if(session1Reviews.length>1){
            chooseNewReviewCard(session1Reviews)
            
        }
        if(review.level!==1){
            console.log('start fetch to make level === 1')
        }
    }
    const handleCorrectReview = (review) => {
        const newSession = review.session + sessionAdvances[review.level-1]
        const newLevel = review.level + 1
        fetch(`/api/reviews/${review.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                session: newSession,
                level: newLevel,
            })
        }).then(r=>{
            if(r.ok){
                r.json().then(updatedReview => {
                    const newSession1Reviews =session1Reviews.filter(review=>review.id!==updatedReview.id)
                    setSession1Reviews(newSession1Reviews)
                    if(newSession1Reviews.length>0){
                        chooseNewReviewCard(newSession1Reviews)
                    } else {
                        setIsDone(true)
                    }
                })
            }
        })
    }
    const handleEndReview = ()=>{
        setIsDone(false)
        setIsReview(false)
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
                {isDone ? 
                    <div style={{textAlign: 'center'}}>
                        <h3>All cards are reviewed in session 1.</h3>
                        <p>End the review session or select a new deck for more reviewing.</p>
                    </div> :
                    <ReviewCard card={reviewCard} levelColors={levelColors} review={reviewForCard} onCorrectReview={handleCorrectReview} onWrongReview={handleWrongReview} /> 
                }
                <button onClick={handleEndReview}>End review session</button>
                <p>Ending a review session will move all cards to the next session, but keep their current levels.</p>

            </div> }
        </div>
    )
}

export default Review