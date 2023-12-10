import {Route, Routes, Router, } from "react-router-dom";
import NavBar from './NavBar'
import Home from './Home'
import AllCards from './AllCards'

function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cards" element={<AllCards />} />
                <Route path="*" element={'404 Not Found'} />
            </Routes>
        </div>
    )
}

export default App;