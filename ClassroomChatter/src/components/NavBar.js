import { Button, AppBar, Toolbar } from '@material-ui/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { firebased } from '../services/firebase'
import { disconnectUser } from '../Redux/actions'

function NavBar() {
    const dispatch = useDispatch();

    const signout = () => {
        firebased.auth().signOut();
        dispatch(disconnectUser())
    }
    
    return (
      <AppBar position="static">
        <Toolbar className="nav-container">
          <NavLink to="/edit" style={{textDecoration: 'none'}}>
            <Button className="nav-link-button" variant="text">
              Profile
            </Button>
          </NavLink>
          <NavLink to="/" style={{textDecoration: 'none'}}>
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
