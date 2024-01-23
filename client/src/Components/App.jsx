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
                        setDeckOptions(newDeckOptions)
                    })
                }
            })
            fetch('/api/cards').then(r=>{
                if (r.status===200) {
                    r.json().then(cards=>{setCardItems(cards.filter(card=>card.user_id===data.id))})
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
    const handleUpdateDeck = (newDeck) => {
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
        console.log('card in App', card)
        const updatedCardItems = cardItems.map(item=>{item.id===card.id ? card : item})
        setCardItems(updatedCardItems)
    }
    const handleEditReview = (review) => {
        console.log('this is in app handling edit', review)
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
                        <Route exact path="/cards" element={<AllCards onUpdateDeck={handleUpdateDeck} cardItems={cardItems} setCardItems={setCardItems} deckItems={deckItems} deckOptions={deckOptions} onEditCard={handleEditCard} onEditReview={handleEditReview}/>} />
                        <Route path="/cards/new" element={<NewCard deckItems={deckItems} setError={setError} user={user} cardItems={cardItems} setCardItems={setCardItems} onUpdateDeck={handleUpdateDeck} deckOptions={deckOptions} setDeckOptions={setDeckOptions}/>} />
                        <Route path="/review" element={<Review reviewDeck={reviewDeck} deckOptions={deckOptions} findReviewDeck={findReviewDeck} cardItems={cardItems} levelColors={levelColors} sessionAdvances={sessionAdvances} onUpdateDeck={handleUpdateDeck}/>} />
                        <Route path="*" element={'404 Not Found'} />
                    </Routes>
                </div>
            )}

        </div>
    )
}

export default App;