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

    return (
        <div>
            <h1 className="header">1248 Learning</h1>
            <div className="errors">{error}</div>
            { !user ? (
                <div>
                    <button value={'signup'} onClick={handleLoginClick}>Sign Up</button>
                    <button value={'login'} onClick={handleLoginClick}>Log in</button>
                    {showLogin==='login'? (<LoginForm userInformation={userInformation} onSetShowLogin={setShowLogin}/>): null }
                    {showLogin==='signup'? (<SignupForm onLogin={userInformation} onSetShowLogin={setShowLogin} setError={setError}/>): null } 
                    <Home levelColors={levelColors}/>
                </div>
            ) : (
                <div>
                    <NavBar setUser={setUser}/>
                    <Routes>
                        <Route exact path="/" element={<Home levelColors={levelColors}/>} />
                        <Route path="/decks" element={<Deck deckItems={deckItems} setDeckItems={setDeckItems} findReviewDeck={findReviewDeck}/>} />
                        <Route exact path="/cards" element={<AllCards cardItems={cardItems} setCardItems={setCardItems} deckItems={deckItems}/>} />
                        <Route path="/cards/new" element={<NewCard deckItems={deckItems} setError={setError} user={user} cardItems={cardItems} setCardItems={setCardItems}/>} />
                        <Route path="/review" element={<Review reviewDeck={reviewDeck} deckOptions={deckOptions} findReviewDeck={findReviewDeck} cardItems={cardItems} levelColors={levelColors}/>} />
                        <Route path="*" element={'404 Not Found'} />
                    </Routes>
                </div>
            )}

        </div>
    )
}

export default App;