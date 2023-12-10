import React, {useState} from "react";
import { NavLink } from "react-router-dom";

function NavBar(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    function handleLogin(){
        setIsLoggedIn(!isLoggedIn)
    }

    return (
        <div>
            <h1>1248 Learning</h1>
            <nav>
                <NavLink className='navigation-links' to='/'>Home</NavLink>
                <button style={{float: 'right'}} onClick={handleLogin}>{isLoggedIn ? 'Logout' : 'Login'}</button>
            </nav>
        </div>
    )
}

export default NavBar;