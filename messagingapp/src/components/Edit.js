import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import firebase from "firebase";
import { getUserData, updateUser } from "../helpers/db";
import { Redirect } from "react-router-dom";
import {getUser} from '../actions'
const Edit = (props) => {
    
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
  useEffect(() => {
    let userData;
    let userResponse;
    async function getUserInfo() {
      userResponse = await firebase.auth().currentUser;
      userData = await getUserData(userResponse.uid);
    }
    getUserInfo();
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
    <div>
      {store.getState().auth.authenticated === false || updated ? (
        <Redirect to="/" />
      ) : null}
      <div className="signup-form-container">
        <form>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
            <TextField
              value={firstName}
              className="signup-input"
              label="First Name"
              id="firstName"
              name="firstName"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              value={lastName}
              className="signup-input"
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              value={website}
              className="signup-input"
              id="website"
              name="website"
              label="Website"
              type="text"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div>
            <TextField
              value={bio}
              className="signup-input"
              id="bio"
              name="bio"
              type="text"
              label="Bio"
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
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
      </div>
    </div>
  );
};

export default Edit;
