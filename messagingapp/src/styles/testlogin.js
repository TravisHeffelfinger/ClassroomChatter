import React from "react";
import { useState } from "react";
import { useDispatch, useStore } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GoogleButton from "react-google-button";

import { loginWithEmail, signInWithGoogle } from "../helpers/auth";
import { authenticateUser, getUser } from "../actions";
import { getUserData } from "../helpers/db";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
      Travis Heffelfinger
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const store = useStore();

  const classes = useStyles();

  async function handleEmailSignIn(event) {
    event.preventDefault();
    let userResponse = await loginWithEmail(email, password);
    try {
        getUserData(userResponse.user.uid).then(
      (resolve) => {
          dispatch(getUser(resolve));
          dispatch(authenticateUser());
          console.log(store.getState());
      },
      (reject) => {
        console.log(reject);
      }
        );
    } catch(error) {
        console.log('this error came from catch ' + error)
        setError('Invalid email or password');
    }
    
    
  }

  async function loginWithGoogle(event) {
    event.preventDefault();
    let userResponse = await signInWithGoogle();
    console.log(userResponse);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleEmailSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={error}
            helperText={error ? 'Invalid email or password': ''}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <FormControlLabel
            id="remember-me"
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            id="login-button"
            className={classes.submit}
          >
            Sign In
          </Button>
          <div >
              <GoogleButton
              className="google-button"
            fullwidth="true"
            variant="contained"
            type="light"
            onClick={loginWithGoogle}
          /></div>
        
          <Grid container>
            <Grid item xs>
              <Link href="/#/home" variant="body2">
                {" "}
                Forgot Password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/#/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default LoginPage;
