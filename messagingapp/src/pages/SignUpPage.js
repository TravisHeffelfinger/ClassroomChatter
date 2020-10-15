import React from "react";
import { signUpUser } from "../helpers/db";
import { signUpWithEmail } from "../helpers/auth";
import { firebased } from "../services/firebase";
import { Link, Redirect } from "react-router-dom";
import { authenticateUser, getUser } from "../actions";
import { connect } from "react-redux";
import { Button, InputLabel, TextField, Typography } from "@material-ui/core";

class SignUpPage extends React.Component {
  state = {
    authenticated: false,
    disabled: true,
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    password: '',
    website: '',
    bio: ''
  }


  handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        if (this.state.email && this.state.password && this.state.displayName) {
            this.setState({disabled: false})
        } 
    }

  handleSignUp = async (event) => {
    event.preventDefault();
    let user;
    if (this.state.email && this.state.password && this.state.displayName) {
      await signUpWithEmail(this.state.email, this.state.password);
      let authedUser = firebased.auth().currentUser;
      if (authedUser !== null) {
        user = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          displayName: this.state.displayName,
          uid: authedUser.uid,
          email: this.state.email,
          photoURL: authedUser.photoURL || "https://picsum.photos/200",
          website: this.state.website,
          bio: this.state.bio,
        };

        await signUpUser(user);
        this.setState({ authenticated: true });
        this.props.getUser(user);
        this.props.authenticateUser();
      } else {
        console.log("signup failed");
      }
    } else {
      console.log("non valid email or password");
    }
  }

  render() {
    if (this.state.authenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="signup-container">
        <Typography variant="h3">Welcome to Classroom Chatter!</Typography>
        <div className="signup-form-container">
          <form>
            <div>
              <TextField
                value={this.state.email}
                label="Email"
                autoFocus={true}
                required={true}
                className="signup-input"
                id="email"
                name="email"
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                value={this.state.password}
                required={true}
                label="Password"
                className="signup-input"
                id="password"
                helperText="Must be at least 6 characters"
                name="password"
                type="password"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                value={this.state.displayName}
                required={true}
                label="Username"
                className="signup-input"
                id="displayName"
                name="displayName"
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                value={this.state.firstName}
                className="signup-input"
                label="First Name"
                id="firstName"
                name="firstName"
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                value={this.state.lastName}
                className="signup-input"
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                value={this.state.website}
                className="signup-input"
                id="website"
                name="website"
                label="Website"
                type="text"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <TextField
                value={this.state.bio}
                className="signup-input"
                id="bio"
                name="bio"
                type="text"
                label="Bio"
                onChange={this.handleChange}
              />
            </div>
            <div className="signup-button">
              <Button
                variant="contained"
                type="submit"
                color="primary"
                onClick={this.handleSignUp}
                disabled={this.state.disabled}
              >
                Create Account
              </Button>
            </div>
            <InputLabel className="signup-label">
              Already have an account?
            </InputLabel>{" "}
            <Link to="/login">sign in</Link>
          </form>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = {
  authenticateUser,
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
