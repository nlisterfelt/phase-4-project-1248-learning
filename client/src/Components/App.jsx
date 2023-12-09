import {Link, Route, Routes} from "react-router-dom";
import NavBar from './NavBar'
import Home from './Home'

function App() {
    return (
        <div>
            <h1>1248 Learning</h1>
            <NavBar />
            <Routes>
                <Route exact path='/'>
                    <Home />
                </Route>
            </Routes>
        </div>
    )
}

export default App;