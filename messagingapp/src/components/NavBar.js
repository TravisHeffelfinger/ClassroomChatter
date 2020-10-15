import { Button, Paper } from '@material-ui/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { firebased } from '../services/firebase'
import { disconnectUser } from '../actions'

function NavBar() {
    const dispatch = useDispatch();

    const signout = () => {
        firebased.auth().signOut();
        dispatch(disconnectUser())
    }
    
    return (
      <Paper elevation={2} variant="elevation" square="true" className="nav-container">
        <Button className="nav-link-button" variant="text" color="primary">
          <NavLink className="nav-link" to="/createChannel">
            Create Channel
          </NavLink>
        </Button>
        <Button className="nav-link-button" variant="text" color="primary">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </Button>
        <Button variant="text" color="secondary" className="nav-link-button" onClick={signout}>
          Log Out
        </Button>
      </Paper>
    );
}

export default NavBar
