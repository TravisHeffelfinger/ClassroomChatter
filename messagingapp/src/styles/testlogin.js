import React from 'react';
import { useState } from 'react'
import { connect, useDispatch, useStore } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleButton from 'react-google-button'

import { loginWithEmail, signInWithGoogle} from '../helpers/auth'
import { authenticateUser } from '../actions';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function LoginPage(props) {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const dispatch = useDispatch();
    const store = useStore();

    const classes = useStyles();

    async function handleEmailSignIn(event){
        event.preventDefault()
        let userResponse = await loginWithEmail(email,password)
        console.log(userResponse)
        dispatch({
            type: 'USER_AUTHENTICATED',
            payload: {
                authenticated: true
            }
        });
        console.log(store.getState(), 'props => ', props);
    }

    async function loginWithGoogle(event) {
        event.preventDefault()
        let userResponse = await signInWithGoogle()
        console.log(userResponse)
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
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={e => {setEmail(e.target.value)
                             console.log(e.target.value)}}
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
                        onChange={e => {setPassword(e.target.value)}}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                      <GoogleButton
                        fullwidth='true'
                        variant="contained"
                         type='light'
                          onClick={loginWithGoogle}
                          />
                    <Grid container>
                        <Grid item xs>
                            <Link href="/home" variant="body2"> Forgot Password?
                        </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
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

const mapStateToProps = state => ({
    authenticated: state.auth,
    authstate: state.auth
})

const mapDispatchToProps = {
    authenticate: authenticateUser()
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)