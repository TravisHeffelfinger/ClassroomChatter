import { Button, Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import {  updateUser } from "../helpers/db";
// import { getCurrentUser } from '../helpers/auth'
import { Redirect } from "react-router-dom";
const Edit = () => {
    
  const dispatch = useDispatch();
  const store = useStore();
  const [email, setEmail] = useState(store.getState().user.email);
  const [displayName, setDisplayName] = useState(
    store.getState().user.displayName
  );
  const [firstName, setFirstName] = useState(store.getState().user.firstName);
  const [lastName, setLastName] = useState(store.getState().user.lastName);
  const [website, setWebsite] = useState(store.getState().user.website);
  const [bio, setBio] = useState(store.getState().user.bio);
  const [updated, setUpdated] = useState(false);

  // async function getUserInfo() {
  //   let userResponse = await getCurrentUser();
  //   return userResponse
  // }

  useEffect(() => {
    //getUserInfo();
  }, []);

  const handleEditUser = () => {
    let user = {
      firstName,
      lastName,
      displayName,
      email,
      website,
      bio,
    };
    updateUser(store.getState().user, user);
    dispatch()
    setUpdated(true);
  };

  return (
    <Grid container>
      {store.getState().auth.authenticated === false || updated ? (
        <Redirect to="/" />
      ) : null}
      <Grid item xs={8} className="signup-form-container">
        <form>
            <TextField
              value={email}
              label="Email"
              autoFocus={true}
              required={true}
              className="signup-input"
              id="email"
              name="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              value={displayName}
              required={true}
              label="Username"
              className="signup-input"
              id="displayName"
              name="displayName"
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
            />         
            <TextField
              value={firstName}
              className="signup-input"
              label="First Name"
              id="firstName"
              name="firstName"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              value={lastName}
              className="signup-input"
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              value={website}
              className="signup-input"
              id="website"
              name="website"
              label="Website"
              type="text"
              onChange={(e) => setWebsite(e.target.value)}
            />
            <TextField
              value={bio}
              className="signup-input"
              id="bio"
              name="bio"
              type="text"
              label="Bio"
              onChange={(e) => setBio(e.target.value)}
            />
          <div className="signup-button">
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={handleEditUser}
            >
              Update Profile
            </Button>
          </div>
        </form>
      </Grid>
    </Grid>
  );
};

export default Edit;
