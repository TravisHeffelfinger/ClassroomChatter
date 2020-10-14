import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { firebased } from '../services/firebase'

function NavBar() {
    const dispatch = useDispatch();

    const signout = () => {
        firebased.auth().signOut();
        dispatch({type: 'USER_DISCONNECTED', payload: { authenticated: false}})
    }
    
    return (
        <div className="nav-container">
            <NavLink className="nav-link" to="/createChannel">Create Channel</NavLink>
            <NavLink className="nav-link" to="/">Home</NavLink>
            <button className="nav-link" onClick={signout}>Log Out</button>
        </div>
    )
}

export default NavBar
