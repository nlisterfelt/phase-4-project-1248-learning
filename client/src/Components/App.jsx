import {Route, Routes, Router, } from "react-router-dom";
import NavBar from './NavBar'
import Home from './Home'

function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={'404 Not Found'} />
            </Routes>
        </div>
    )
}

export default App;