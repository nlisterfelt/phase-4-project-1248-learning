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
    const [isNewCard, setIsNewCard]=useState(false)

    const valueObject = {levelColors, sessionAdvances, deckItems, setDeckItems, cardItems, setCardItems, reviewDeck, setReviewDeck, deckOptions, setDeckOptions, isFront, setIsFront, currentReview, setCurrentReview, sessionOneReviews, setSessionOneReviews, reviewCard, setReviewCard, isDone, setIsDone, isNewCard, setIsNewCard}

    return <CardContext.Provider value = {valueObject}>{children}</CardContext.Provider>
}

export {CardContext, CardProvider}