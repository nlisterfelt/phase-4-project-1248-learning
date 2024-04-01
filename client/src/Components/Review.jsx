import React, { useContext, useState } from "react";
import * as yup from "yup"
import { useFormik } from "formik";
import Select from "react-select";
import ReviewCard from "./ReviewCard";
import { CardContext } from "../context/CardContext";

const Review = () => {
    const {deckItems, sessionAdvances, reviewDeck, setIsFront, currentReview, setCurrentReview, sessionOneReviews, setSessionOneReviews, reviewCard, setReviewCard, isDone, setIsDone, handleReviewPatch, chooseNewReviewCard, deckOptions, setReviewDeck, levelColors}=useContext(CardContext)
    const [isReview, setIsReview] = useState(false)
    const [isReviewsEmpty, setIsReviewsEmpty]=useState(false)
    

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
        const newReviewDeck = findReviewDeck(values.deck_id).reviews.filter(review=>review.level!==sessionAdvances[sessionAdvances.length-1])
        if(newReviewDeck.length===0){
            setReviewCard(null)
            setIsReviewsEmpty(true)
            setCurrentReview({})
            setIsDone(true)
        } else {
            const filteredReviews = newReviewDeck.filter(review=>review.session===1)
            setIsReview(true)
            if(filteredReviews.length===0){
                handleEmptySessionOne(newReviewDeck)
            } else {
                setSessionOneReviews(filteredReviews)
                setCurrentReview(filteredReviews[0])
                chooseNewReviewCard(filteredReviews)
            }
            setIsDone(false)
        }
    }
    const handleWrongReview = (review) => {
        if(review.level > 1){
            handleReviewPatch(review, 1, 1)
        } else {
            chooseNewReviewCard(sessionOneReviews)
        }
        setIsFront(true)
    }
    function handleCorrectReview(review) {
        const newSession = 1 + sessionAdvances[review.level-1]
        const newLevel = review.level + 1
        if(newLevel<sessionAdvances.length+1){
            if(newSession>0){
                handleReviewPatch(review, newSession, newLevel)
            } else {
                handleReviewPatch(review, 1, newLevel)
            }
        } else {
            const finalLevel = sessionAdvances[sessionAdvances.length-1]
            handleReviewPatch(review, finalLevel, finalLevel)
        }
        chooseNewReviewCard(sessionOneReviews)
        setIsFront(true)
    }
    
    const handleEndReview = (e)=>{
        setIsDone(false)
        setIsReview(false)
        if (reviewDeck){
            handleEmptySessionOne(reviewDeck.reviews)
        }
    }
    function handleEmptySessionOne(reviews){
        const lastLevel = sessionAdvances[sessionAdvances.length-1]
        let lowestSession = reviews[0].session
        for(let i=1; i<reviews.length; i++){
            if(reviews[i].session<lowestSession || lowestSession===lastLevel){
                lowestSession = reviews[i].session
            }
        }
        if(lowestSession!==lastLevel){
            for(let i=0; i<reviews.length; i++){
                if(reviews[i].level!=='retire' && reviews[i].session>1){
                    if(lowestSession===2){
                        handleReviewPatch(reviews[i], reviews[i].session-1, reviews[i].level)
                    } else if (lowestSession>2) {
                        const newSession = reviews[i].session-lowestSession+1
                        handleReviewPatch(reviews[i], newSession, reviews[i].level)
                    }
                } else if (reviews[i].level!=='retire' && reviews[i].session<1){
                    handleReviewPatch(reviews[i], 1, reviews[i].level)
                }
            } 
        } else {
            setIsDone(true)
        }
    }
    function findReviewDeck(id){
        const selectReviewDeck = deckItems.find(deck => deck.id === id)
        setReviewDeck(selectReviewDeck)
        return selectReviewDeck
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
                {(isDone && reviewCard!=null) ? 
                <div style={{textAlign: 'center'}}>
                    <h3>All cards are reviewed in session 1.</h3>
                    <p>End the review session to start this deck again or select a different deck.</p>
                </div> :
                <div>
                    <ReviewCard card={reviewCard} color={levelColors[currentReview.level]}/> 
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button onClick={e=>handleWrongReview(currentReview)} style={{marginRight: '20px', borderColor: 'red', backgroundColor: 'white', width: '100px'}}>
                            Wrong 
                            <p style={{fontSize: '70%'}}>(Level 1)</p>
                        </button>
                        <button onClick={e=>handleCorrectReview(currentReview)} style={{borderColor: 'lime', backgroundColor: 'white', width: '100px'}}>
                            Correct 
                            <p style={{fontSize:"70%"}}>(Next Level {currentReview.level===sessionAdvances.length? sessionAdvances[sessionAdvances.length-1] : currentReview.level+1})</p>
                        </button>
                    </div>
                </div>}
                <button onClick={handleEndReview}>End review session</button>
            </div> }
        </div>
    )
}

export default Review