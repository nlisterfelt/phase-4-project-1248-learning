import React, { useEffect, useState } from "react";
import * as yup from "yup"
import { useFormik } from "formik";
import Select from "react-select";
import ReviewCard from "./ReviewCard";

const Review = ({deckOptions, reviewDeck, findReviewDeck, cardItems, levelColors, sessionAdvances}) => {
    const [isReview, setIsReview] = useState(false)
    const [reviewCard, setReviewCard] = useState([])
    const [sessionOneReviews, setSessionOneReviews]=useState([])
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
        setIsDone(false)
        const newReviewDeck = findReviewDeck(values.deck_id).reviews
        if(newReviewDeck.length===0){
            setReviewCard(null)
            setIsReviewsEmpty(true)
            setReviewForCard({})
            setIsDone(true)
        } else {
            const filteredReviews = newReviewDeck.filter(review=>review.session===1)
            if(filteredReviews.length===0){
                setIsDone(true)
                setIsReview(true)
            } else {
                setIsReview(true)
                setSessionOneReviews(filteredReviews)
                chooseNewReviewCard(filteredReviews)
            }
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
        if(sessionOneReviews.length>1){
            chooseNewReviewCard(sessionOneReviews)
            
        }
        if(review.level!==1){
            console.log('start fetch to make level === 1')
        }
    }
    function handleCorrectReview(review) {
        const newSession = review.session + sessionAdvances[review.level-1]
        const newLevel = review.level + 1
        handleReviewPatch(review, newSession, newLevel)
    }
    function handleReviewPatch(review, newSession, newLevel){
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
                    const newSessionOneReviews =sessionOneReviews.filter(review=>review.id!==updatedReview.id)
                    setSessionOneReviews(newSessionOneReviews)
                    if(newSessionOneReviews.length>0){
                        chooseNewReviewCard(newSessionOneReviews)
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
        handleEmptySessionOne(reviewDeck.reviews)
    }
    function handleEmptySessionOne(reviews){
        const currentSessions = []
        for(let i=0; i<reviews.length; i++){
            currentSessions.push(reviews[i].session)
        }
        const lowestSession = Math.min(currentSessions)
        for(let i=0; i<reviews.length; i++){
            if(reviews[i].level!=='retire'){
                const newSession = reviews[i]-lowestSession
                handleReviewPatch(reviews, newSession, reviews[i].level)
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