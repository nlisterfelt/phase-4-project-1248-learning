import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import NavBar from './NavBar'
import Home from './Home'
import AllCards from './AllCards'
import Deck from './Deck'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import NewCard from "./NewCard";
import Review from "./Review";

function App() {
    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(null)
    const [deckItems, setDeckItems]=useState([])
    const [cardItems, setCardItems]=useState([])
    const [error, setError]=useState(null)
    const [reviewDeck, setReviewDeck]=useState([])
    const [deckOptions, setDeckOptions]=useState([])
    const [isFront, setIsFront] = useState(true)
    const [currentReview, setCurrentReview]=useState({})
    const [sessionOneReviews, setSessionOneReviews]=useState([])
    const [reviewCard, setReviewCard] = useState([])
    const [isDone, setIsDone]=useState(false)

    const levelColors = ['deeppink', 'blueViolet', 'blue', 'skyBlue', 'limegreen', 'yellow', 'goldenrod', 'coral', 'tomato', 'brown']
    const sessionAdvances = [1, 2, 4, 8, 16, 32, 64, 128, 256, 'Retire']
    useEffect(() => {
        fetch('/api/check_session')
        .then(r => {
            if (r.status === 200) {
                r.json().then(user => userInformation(user))
            } 
        })
    }, [])

    function userInformation(data){
        if (data.error){
            setError(data.get('error'))
        } else {
            setUser(data)
            fetch('/api/decks').then(r => {
                if (r.status===200) {
                    r.json().then(decks=>{
                        const filteredDeck = decks.filter(deck=>deck.user_id===data.id)
                        setDeckItems(filteredDeck)
                        let newDeckOptions=[]
                        for(let i=0; i<filteredDeck.length; i++){
                            newDeckOptions.push({value: filteredDeck[i].id, label: filteredDeck[i].name})
                        }
                        newDeckOptions.sort((a,b)=>a.label>b.label?1:-1)
                        setDeckOptions(newDeckOptions)
                    })
                }
            })
            fetch('/api/cards').then(r=>{
                if (r.status===200) {
                    r.json().then(cards=>{
                        const userCards = cards.filter(card=>card.user_id===data.id)
                        setCardItems(userCards)
                    })
                }
            })
        }
    }
    const handleLoginClick = e => {
        e.preventDefault()
        if (e.target.value === 'login' || e.target.value === 'signup') {
            setShowLogin(e.target.value)
        } else {
            setShowLogin(null)
        }
    }
    const findReviewDeck = (id) => {
        const selectReviewDeck = deckItems.find(deck => deck.id === id)
        setReviewDeck(selectReviewDeck)
        return selectReviewDeck
    }
    const handleEditDeck = (newDeck) => {
        const newDeckItems = deckItems.map(deck=>{
            if(deck.id===newDeck.id){
                return newDeck
            } else {
                return deck
            }
        })
        setDeckItems(newDeckItems)
    }
    const handleEditCard = (card) => {
        const updatedCardItems = cardItems.map(item=>item.id===card.id ? card : item)
        setCardItems(updatedCardItems)
    }
    const handleEditReview = (review) => {
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
                        if(updatedReview.level>1){
                            const sessionOneReviewsWithout =sessionOneReviews.filter(review=>review.id!==updatedReview.id)
                            setSessionOneReviews(sessionOneReviewsWithout)
                            if(sessionOneReviewsWithout.length>0){
                                chooseNewReviewCard(sessionOneReviewsWithout)
                            } else {
                                setIsDone(true)
                            }
                        } else {
                            const sessionOneReviewsWith =sessionOneReviews.map(review=>{
                                if(review.id===updatedReview.id){
                                    return updatedReview
                                } 
                                return review 
                            })
                            chooseNewReviewCard(sessionOneReviewsWith)
                        }
                    })
                }
            })
        } else {
            console.log('error newSession is not >0')
        }
    }
    function chooseNewReviewCard(reviews){
        if(reviews.length>0){
            const randomNum = Math.floor(Math.random()*reviews.length)
            const selectedReview = reviews[randomNum]
            const card = cardItems.find(card=>card.id===selectedReview.card_id)
            setReviewCard(card)
            setCurrentReview(selectedReview)
        } else {
            const card = cardItems.find(card=>card.id===currentReview.card_id)
        }
    }

    return (
        <div>
            <h1 className="header">1248 Learning</h1>
            <div className="errors">{error}</div>
            { !user ? (
                <div>
                    <button value={'signup'} onClick={handleLoginClick}>Sign Up</button>
                    <button value={'login'} onClick={handleLoginClick}>Log in</button>
                    {showLogin==='login'? (<LoginForm userInformation={userInformation} onSetShowLogin={setShowLogin}/>): null }
                    {showLogin==='signup'? (<SignupForm userInformation={userInformation} onSetShowLogin={setShowLogin} setError={setError}/>): null } 
                    <Home levelColors={levelColors} sessionAdvances={sessionAdvances}/>
                </div>
            ) : (
                <div>
                    <NavBar setUser={setUser}/>
                    <Routes>
                        <Route exact path="/" element={<Home levelColors={levelColors} sessionAdvances={sessionAdvances}/>} />
                        
                        <Route path="/decks" element={<Deck deckItems={deckItems} setDeckItems={setDeckItems} findReviewDeck={findReviewDeck}/>} />

                        <Route exact path="/cards" element={<AllCards onEditDeck={handleEditDeck} cardItems={cardItems} setCardItems={setCardItems} deckItems={deckItems} deckOptions={deckOptions} onEditCard={handleEditCard} onEditReview={handleEditReview} sessionAdvances={sessionAdvances} onReviewPatch={handleReviewPatch} isFront={isFront} setIsFront={setIsFront}/>} />

                        <Route path="/cards/new" element={<NewCard deckItems={deckItems} setError={setError} user={user} cardItems={cardItems} setCardItems={setCardItems} onEditDeck={handleEditDeck} deckOptions={deckOptions} setDeckOptions={setDeckOptions}/>} />

                        <Route path="/review" element={<Review reviewDeck={reviewDeck} deckOptions={deckOptions} findReviewDeck={findReviewDeck} levelColors={levelColors} sessionAdvances={sessionAdvances} onEditReview={handleEditReview} onReviewPatch={handleReviewPatch} isFront={isFront} setIsFront={setIsFront} currentReview={currentReview} setCurrentReview={setCurrentReview} chooseNewReviewCard={chooseNewReviewCard} sessionOneReviews={sessionOneReviews} setSessionOneReviews={setSessionOneReviews} reviewCard={reviewCard} setReviewCard={setReviewCard} isDone={isDone} setIsDone={setIsDone}/>} />
                        <Route path="*" element={'404 Not Found'} />
                    </Routes>
                </div>
            )}

        </div>
    )
}

export default App;