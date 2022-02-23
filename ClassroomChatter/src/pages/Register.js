import React from "react";
import { signUpUser } from "../helpers/db";
import { signUpWithEmail } from "../helpers/auth";
import { firebased } from "../services/firebase";
import { Link, Redirect } from "react-router-dom";
import { authenticateUser, storeUser } from "../Redux/actions";
import { connect } from "react-redux";
import {
  Button,
  InputLabel,
  TextField,
  Typography,
  Grid,
  Container,
  Link as MUILink,
} from "@material-ui/core";

class Register extends React.Component {
  state = {
    authenticated: false,
    disabled: true,
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    password: "",
    website: "",
    bio: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (this.state.email && this.state.password && this.state.displayName) {
      this.setState({ disabled: false });
    }
  };

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
        // this.props.getUser(user);
        this.props.authenticateUser();
      } else {
        console.log("signup failed");
      }
    } else {
      console.log("non valid email or password");
    }
  };

  render() {
    if (this.state.authenticated) {
      return <Redirect to="/" />;
    }
    return (
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item md={8} lg={6}></Grid>
          <Grid item md={8} lg={12}>
            <Typography variant="h4">Welcome to Classroom Chatter!</Typography>
            <form>
              <Grid item>
                <TextField
                  margin="normal"
                  value={this.state.email}
                  label="Email"
                  autoFocus
                  fullWidth
                  required
                  className="signup-input"
                  id="email"
                  name="email"
                  type="text"
                  variant="outlined"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="normal"
                  value={this.state.password}
                  required
                  variant="outlined"
                  label="Password"
                  fullWidth
                  className="signup-input"
                  id="password"
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="normal"
                  value={this.state.displayName}
                  required
                  label="Username"
                  variant="outlined"
                  fullWidth
                  className="signup-input"
                  id="displayName"
                  name="displayName"
                  type="text"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={this.state.firstName}
                  margin="normal"
                  className="signup-input"
                  label="First Name"
                  variant="outlined"
                  id="firstName"
                  name="firstName"
                  fullWidth
                  type="text"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="normal"
                  value={this.state.lastName}
                  className="signup-input"
                  id="lastName"
                  variant="outlined"
                  name="lastName"
                  label="Last Name"
                  fullWidth={true}
                  type="text"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="normal"
                  value={this.state.website}
                  className="signup-input"
                  variant="outlined"
                  id="website"
                  name="website"
                  fullWidth={true}
                  label="Website"
                  type="text"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="normal"
                  value={this.state.bio}
                  className="signup-input"
                  variant="outlined"
                  id="bio"
                  name="bio"
                  fullWidth={true}
                  type="text"
                  label="Bio"
                  onChange={this.handleChange}
                />
              </Grid>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                onClick={this.handleSignUp}
                disabled={this.state.disabled}
              >
                Create Account
              </Button>

              <InputLabel className="signup-label">
                <MUILink variant="body2" underline="none">
                  <Link style={{ textDecoration: "none" }} to="/login">
                    {" "}
                    Already have an account? sign in
                  </Link>
                </MUILink>
              </InputLabel>
            </form>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = {
  authenticateUser,
  storeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
