import React, {useState} from "react";
import { NavLink } from "react-router-dom";

function NavBar({isLoggedIn, onLogin}){
    

    return (
        <div>
            <h1 className="header">1248 Learning</h1>
            <nav>
                <NavLink className='navigation-links' to='/'>Home</NavLink>
                <NavLink className='navigation-links' to='/cards'>Cards</NavLink>
                <button style={{float: 'right'}} onClick={onLogin}>{isLoggedIn ? 'Logout' : 'Login'}</button>
            </nav>
        </div>
    )
}

export default NavBar;