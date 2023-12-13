import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import NavBar from './NavBar'
import Home from './Home'
import AllCards from './AllCards'
import Deck from './Deck'
import Login from './Login'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    function handleLogin(){
        setIsLoggedIn(!isLoggedIn)
    }

    return (
        <div>
            <h1 className="header">1248 Learning</h1>
            { !isLoggedIn ? (
                <Login />
            ) : (
                <div>
                    <NavBar isLoggedIn={isLoggedIn} onLogin={handleLogin}/>
                    <Routes>
                        <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
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