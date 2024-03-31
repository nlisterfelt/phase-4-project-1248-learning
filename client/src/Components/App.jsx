import React, {useEffect, useContext} from "react";
import {Route, Routes} from "react-router-dom";
import NavBar from './NavBar'
import Home from './Home'
import AllCards from './AllCards'
import Deck from './Deck'
import Login from './Login'
import Signup from './Signup'
import NewCard from "./NewCard";
import Review from "./Review";
import { UserContext } from "../context/UserContext";
import { CardContext } from "../context/CardContext";

function App() {
    const {user, setUser, showLogin, setShowLogin, error, setError} = useContext(UserContext)
    const {setDeckItems, setCardItems, setDeckOptions} = useContext(CardContext)
    
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
    
    return (
        <div>
            <h1 className="header">1248 Learning</h1>
            <h4 style={{color: "red"}}>{error}</h4>
            { !user ? (
                <div>
                    <button value={'signup'} onClick={handleLoginClick}>Sign Up</button>
                    <button value={'login'} onClick={handleLoginClick}>Log in</button>
                    {showLogin==='login'? (<Login userInformation={userInformation} />): null }
                    {showLogin==='signup'? (<Signup userInformation={userInformation} />): null } 
                    <Home />
                </div>
            ) : (
                <div>
                    <NavBar />
                    
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/decks" element={<Deck />} />
                        <Route exact path="/cards" element={<AllCards />} />
                        <Route path="/cards/new" element={<NewCard />} />
                        <Route path="/review" element={<Review />} />
                        <Route path="*" element={'404 Not Found'} />
                    </Routes>
                </div>
            )}

        </div>
    )
}

export default App;