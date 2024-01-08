import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({setUser}){
    function handleLogoutClick(e){
        fetch('/api/logout', {method: 'DELETE'})
        .then(r => {
            if (r.ok){
                setUser(null)
            }
        })
    }
    return (
        <div>
            <nav id="nav">
                <NavLink className='navigation-links' exact='true' to='/'>Home</NavLink>
                <NavLink className='navigation-links' to='/decks'>Decks</NavLink>
                <NavLink className='navigation-links' exact='true' to='/cards'>Cards</NavLink>
                <NavLink className='navigation-links' exact='true' to='/review'>Review</NavLink>
                <button style={{float: 'right'}} onClick={handleLogoutClick}>Logout</button>
            </nav>
        </div>
    )
}

export default NavBar;