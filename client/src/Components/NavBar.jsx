import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(){
    return (
        <div>
            <h1>1248 Learning</h1>
            <nav>
                <NavLink className='navigation-links' to='/'>Home</NavLink>
            </nav>
        </div>
    )
}

export default NavBar;