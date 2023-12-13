import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import NavBar from './NavBar'
import Home from './Home'
import AllCards from './AllCards'
import Deck from './Deck'
import Login from './Login'

function App() {
    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(false)

    function handleLoginClick(e){
        e.preventDefault()
        if (e.target.value === 'login' || e.target.value === 'signup') {
            setShowLogin(true)
        } else {
            setShowLogin(false)
        }
    }

    return (
        <div>
            <button value={'signup'} onClick={handleLoginClick}>Sign Up</button>
            <button value={'login'} onClick={handleLoginClick}>Log in</button>
            <h1 className="header">1248 Learning</h1>
            { !user ? (
                <Login showLogin={showLogin}/>
            ) : (
                <div>
                    <NavBar user={user} onLogin={handleLoginClick}/>
                    <Routes>
                        <Route path="/" element={<Home user={user}/>} />
                        <Route path="/decks" element={<Deck />} />
                        <Route path="/cards" element={<AllCards />} />
                        <Route path="*" element={'404 Not Found'} />
                    </Routes>
                </div>
            )}
            <Home />
        </div>
    )
}

export default App;