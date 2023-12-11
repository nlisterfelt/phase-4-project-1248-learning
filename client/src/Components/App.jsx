import React, {useState} from "react";
import {Route, Routes, Router, } from "react-router-dom";
import NavBar from './NavBar'
import Home from './Home'
import AllCards from './AllCards'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    function handleLogin(){
        setIsLoggedIn(!isLoggedIn)
    }
    return (
        <div>
            <NavBar isLoggedIn={isLoggedIn} onLogin={handleLogin}/>
            <Routes>
                <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
                <Route path="/cards" element={<AllCards />} />
                <Route path="*" element={'404 Not Found'} />
            </Routes>
        </div>
    )
}

export default App;