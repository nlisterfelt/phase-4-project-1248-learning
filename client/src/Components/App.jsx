import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import NavBar from './NavBar'
import Home from './Home'
import AllCards from './AllCards'
import Deck from './Deck'
import Login from './Login'

function App() {
    const [user, setUser] = useState(true)
    const [showLogin, setShowLogin] = useState(null)

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
                    <Login showLogin={showLogin} onLogin={setUser}/>
                    <Home />
                </div>
            ) : (
                <div>
                    <NavBar user={user} setUser={setUser}/>
                    <Routes>
                        <Route path="/" element={<Home user={user}/>} />
                        <Route path="/decks" element={<Deck />} />
                        <Route path="/cards" element={<AllCards />} />
                        <Route path="*" element={'404 Not Found'} />
                    </Routes>
                </div>
            )}

        </div>
    )
}

export default App;