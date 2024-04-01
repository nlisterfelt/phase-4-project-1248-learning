import { createContext, useState } from "react";

const CardContext = createContext({})

const CardProvider = ({children}) => {
    const levelColors = ['deeppink', 'blueViolet', 'blue', 'skyBlue', 'limegreen', 'yellow', 'goldenrod', 'coral', 'tomato', 'brown']
    const sessionAdvances = [1, 2, 4, 8, 16, 32, 64, 128, 256, 'Retire']
    const [deckItems, setDeckItems]=useState([])
    const [cardItems, setCardItems]=useState([])
    const [reviewDeck, setReviewDeck]=useState([])
    const [deckOptions, setDeckOptions]=useState([])
    const [isFront, setIsFront] = useState(true)
    const [currentReview, setCurrentReview]=useState({})
    const [sessionOneReviews, setSessionOneReviews]=useState([])
    const [reviewCard, setReviewCard] = useState([])
    const [isDone, setIsDone]=useState(false)
    const [isNewCard, setIsNewCard]=useState(true)

    const handleEditDeck = (newDeck) => {
        const newDeckItems = deckItems.map(deck=>deck.id===newDeck.id ? newDeck : deck)
        setDeckItems(newDeckItems)
        const newDeckOptions = deckOptions.map(deck=>deck.value===newDeck.id ? {value: deck.value, label: newDeck.name} : deck)
        setDeckOptions(newDeckOptions)
    }

    const handleEditCard = (card) => {
        const updatedCardItems = cardItems.map(item=>item.id===card.id ? card : item)
        setCardItems(updatedCardItems)
    }
    function handleEditReview(review) {
        const card = cardItems.find(item=>item.id===review.card_id)
        card.reviews = card.reviews.map(item=>item.id===review.id ? review : item)
        const deck = deckItems.find(item=>item.id===review.deck_id)
        deck.reviews = deck.reviews.map(item=>item.id===review.id ? review : item)
        handleEditCard(card)
        handleEditDeck(deck)
    }
    function handleReviewPatch(review, newSession, newLevel){
        if(newSession>0 || newSession===sessionAdvances[sessionAdvances.length-1]){
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
                        handleEditReview(updatedReview)
                        if(updatedReview.level===1){
                            const sessionOneReviewsWith =sessionOneReviews.map(review=>review.id===updatedReview.id ? updatedReview : review )
                            setSessionOneReviews(sessionOneReviewsWith)
                            chooseNewReviewCard(sessionOneReviewsWith)
                        } else {
                            const sessionOneReviewsWithout =sessionOneReviews.filter(review=>review.id!==updatedReview.id)
                            setSessionOneReviews(sessionOneReviewsWithout)
                            if(sessionOneReviewsWithout.length>0){
                                chooseNewReviewCard(sessionOneReviewsWithout)
                            } else {
                                setIsDone(true)
                            }
                        }
                    })
                }
            })
        } else {
            console.log('error newSession is not >0')
        }
    }
    function chooseNewReviewCard(reviews){
        setIsFront(true)
        if(reviews.length>0){
            const randomNum = Math.floor(Math.random()*reviews.length)
            const selectedReview = reviews[randomNum]
            const card = cardItems.find(card=>card.id===selectedReview.card_id)
            setReviewCard(card)
            setCurrentReview(selectedReview)
        } 
    }
    const handleDeleteReview= (review)=>{
        const card = cardItems.find(item=>item.id===review.card_id)
        card['reviews'] = card.reviews.filter(item=>item.id!==review.id)
        const deck = deckItems.find(item=>item.id===review.deck_id)
        deck['reviews'] = deck.reviews.filter(item=>item.id!==review.id)
        card['decks'] = card.decks.filter(item=>item.id!==review.deck_id)
        deck['cards'] = deck.cards.filter(item=>item.id!==review.card_id)

        handleEditCard(card)
        handleEditDeck(deck)
    }

    const valueObject = {levelColors, sessionAdvances, deckItems, setDeckItems, cardItems, setCardItems, reviewDeck, setReviewDeck, deckOptions, setDeckOptions, isFront, setIsFront, currentReview, setCurrentReview, sessionOneReviews, setSessionOneReviews, reviewCard, setReviewCard, isDone, setIsDone, isNewCard, setIsNewCard, handleEditDeck, handleEditCard, handleReviewPatch, chooseNewReviewCard, handleDeleteReview}

    return <CardContext.Provider value = {valueObject}>{children}</CardContext.Provider>
}

export {CardContext, CardProvider}