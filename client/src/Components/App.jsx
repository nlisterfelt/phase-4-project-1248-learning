import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import NavBar from './NavBar'
import Home from './Home'
import AllCards from './AllCards'
import Deck from './Deck'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

function App() {
    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(null)
    const [deckItems, setDeckItems]=useState([])
    const [cardItems, setCardItems]=useState([])

    useEffect(() => {
        fetch('/api/check_session').then(r => {
            if (r.ok) {
                r.json().then(user => userInformation(user))
            }
        })
    }, [])

    function userInformation(user){
        setUser(user)
        fetch('/api/decks').then(r => {
            if (r.ok) {
                r.json().then(decks=>{setDeckItems(decks.filter(deck=>deck.user_id===user.id))})
            }
        })
        fetch('/api/cards').then(r=>{
            if (r.ok) {
                r.json().then(cards=>{setCardItems(cards.filter(card=>card.user_id===user.id))})
            }
        })
    }

    function handleLoginClick(e){
        e.preventDefault()
        if (e.target.value === 'login' || e.target.value === 'signup') {
            setShowLogin(e.target.value)
        } else {
            setShowLogin(null)
        }
    }

    return (
        <div>
            <h1 className="header">1248 Learning</h1>
            { !user ? (
                <div>
                    <button value={'signup'} onClick={handleLoginClick}>Sign Up</button>
                    <button value={'login'} onClick={handleLoginClick}>Log in</button>
                    {showLogin==='login'? (<LoginForm userInformation={userInformation} onSetShowLogin={setShowLogin}/>): null }
                    {showLogin==='signup'? (<SignupForm onLogin={userInformation} onSetShowLogin={setShowLogin}/>): null } 
                    <Home />
                </div>
            ) : (
                <div>
                    <NavBar setUser={setUser}/>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/decks" element={<Deck deckItems={deckItems} setDeckItems={setDeckItems} user={user}/>} />
                        <Route path="/cards" element={<AllCards cardItems={cardItems} deckItems={deckItems}/>} />
                        <Route path="*" element={'404 Not Found'} />
                    </Routes>
                </div>
            )}

        </div>
    )
}

export default App;