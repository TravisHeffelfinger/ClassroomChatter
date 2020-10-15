import { Button, Paper, AppBar, Toolbar } from '@material-ui/core';
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
      <AppBar position="static">
        <Toolbar className="nav-container">
          <NavLink to="/edit">
            <Button className="nav-link-button" variant="text">
              Edit Profile
            </Button>
          </NavLink>
          <NavLink to="/">
            <Button
              className="nav-link-button"
              variant="text"
              color="default"
            >
              Home
            </Button>
          </NavLink>
          <Button
            variant="text"
            color="secondary"
            className="nav-link-button"
            onClick={signout}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    );
}

export default NavBar
