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

    const valueObject = {levelColors, sessionAdvances, deckItems, setDeckItems, cardItems, setCardItems, reviewDeck, setReviewDeck, deckOptions, setDeckOptions, isFront, setIsFront}
    
    return <CardContext.Provider value = {valueObject}>{children}</CardContext.Provider>
}

export {CardContext, CardProvider}