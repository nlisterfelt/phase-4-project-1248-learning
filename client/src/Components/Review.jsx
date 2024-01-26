import React, { useEffect, useState } from "react";
import * as yup from "yup"
import { useFormik } from "formik";
import Select from "react-select";
import ReviewCard from "./ReviewCard";

const Review = ({deckOptions, reviewDeck, findReviewDeck, cardItems, levelColors, sessionAdvances, onReviewPatch}) => {
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
            deck_id: null
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
                handleEmptySessionOne(reviewDeck.reviews)
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
        console.log('card', card)
        console.log('selected review', selectedReview)
    }
    const handleWrongReview = (review) => {
        if(sessionOneReviews.length>1){
            chooseNewReviewCard(sessionOneReviews)
        }
        if(review.level > 1){
            onReviewPatch(review, 1, 1)
        }
    }
    function handleCorrectReview(review) {
        const newSession = review.session + sessionAdvances[review.level-1]
        const newLevel = review.level + 1
        if(newLevel<sessionAdvances.length){
            if(newSession>0){
                onReviewPatch(review, newSession, newLevel)
            } else {
                onReviewPatch(review, 1, newLevel)
            }
        } else {
            const finalLevel = sessionAdvances[sessionAdvances.length]
            onReviewPatch(review, finalLevel, finalLevel)
        }
    }
    
    const handleEndReview = (e)=>{
        setIsDone(false)
        setIsReview(false)
        if (reviewDeck){
            handleEmptySessionOne(reviewDeck.reviews)
        }
    }
    function handleEmptySessionOne(reviews){
        let lowestSession = reviews[0].session
        for(let i=1; i<reviews.length; i++){
            if(reviews[i].session<lowestSession){
                lowestSession = reviews[i].session
            }
        }
        for(let i=0; i<reviews.length; i++){
            if(reviews[i].level!=='retire' && reviews[i].session>1){
                if(lowestSession===2){
                    onReviewPatch(reviews[i], reviews[i].session-1, reviews[i].level)
                } else if (lowestSession>2) {
                    const newSession = reviews[i].session-lowestSession+1
                    onReviewPatch(reviews[i], newSession, reviews[i].level)
                }
            } else if (reviews[i].level!=='retire' && reviews[i].session<1){
                onReviewPatch(reviews[i], 1, reviews[i].level)
            }
        } 
    }
    return(
        <div>
            {!isReview ? <div >
                <form onSubmit={formik.handleSubmit} >
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
                    <div>
                        <ReviewCard card={reviewCard} color={levelColors[reviewForCard.level]} /> 
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <button onClick={e=>handleWrongReview(reviewForCard)} style={{marginRight: '20px', borderColor: 'red', backgroundColor: 'white', width: '100px'}}>
                                Wrong 
                                <p style={{fontSize: '70%'}}>(Level 1)</p>
                            </button>
                            <button onClick={e=>handleCorrectReview(reviewForCard)} style={{borderColor: 'lime', backgroundColor: 'white', width: '100px'}}>
                                Correct 
                                <p style={{fontSize:"70%"}}>(Next Level {reviewForCard.level+1})</p>
                            </button>
                        </div>
                    </div>
                }
                <button onClick={handleEndReview}>End review session</button>
                <p>Ending a review session will move all cards to the next session, but keep their current levels.</p>

            </div> }
        </div>
    )
}

export default Review