import React from "react";
import { signUpUser } from "../helpers/db";
import { signUpWithEmail } from "../helpers/auth";
import { firebased } from "../services/firebase";
import { Redirect } from "react-router-dom";

class SignUpPage extends React.Component {
  state = {
    authenticated: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSignUp = async (event) => {
    let user;
    console.log("ding");
    event.preventDefault();
    await signUpWithEmail(this.state.email, this.state.password);
    let authedUser = firebased.auth().currentUser;
    console.log("firebase.auth().currentUser ", authedUser);
    if (authedUser) {
      user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        displayName: this.state.displayName,
        uid: authedUser.uid,
        email: this.state.email,
        photoURL: authedUser.photoURL,
        website: this.state.website,
        bio: this.state.bio,
      };
      await signUpUser(user);
      this.setState({ authenticated: true });
    } else {
      console.log("signup failed");
    }
    let userResponse = await signUpUser(user);
    console.log(userResponse);
  };

  render() {
    if (this.state.authenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="signup-container">
        <div className="signup-form-container">
          <form>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={this.handleChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={this.handleChange}
            />
            <label htmlFor="displayName">Username</label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              onChange={this.handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              onChange={this.handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="text"
              onChange={this.handleChange}
            />
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              onChange={this.handleChange}
            />
            <label htmlFor="bio">Bio</label>
            <input
              id="bio"
              name="bio"
              type="text"
              onChange={this.handleChange}
            />
            <button onClick={this.handleSignUp}>Create Account</button>
            <label>Already have an account?</label> <a href="/login">sign in</a>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
