import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
    return (
        <div className="nav-container">
            <NavLink className="nav-link" to="/createChannel">Create Channel</NavLink>
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/signout">Log Out</NavLink>
        </div>
    )
}

export default NavBar
