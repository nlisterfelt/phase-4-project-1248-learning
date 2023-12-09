import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(){
    return (
        <div>
            <nav>
                <NavLink className='navigation-links' exact to='/'>Home</NavLink>
            </nav>
        </div>
    )
}

export default NavBar;