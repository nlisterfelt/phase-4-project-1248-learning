import React, {useState} from "react";
import { NavLink } from "react-router-dom";

function NavBar({setUser}){
    
    return (
        <div>
            <nav id="nav">
                <NavLink className='navigation-links' to='/'>Home</NavLink>
                <NavLink className='navigation-links' to='/decks'>Decks</NavLink>
                <NavLink className='navigation-links' to='/cards'>Cards</NavLink>
                <button style={{float: 'right'}} onClick={e => setUser(null)}>Logout</button>
            </nav>
        </div>
    )
}

export default NavBar;