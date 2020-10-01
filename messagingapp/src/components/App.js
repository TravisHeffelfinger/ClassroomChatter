import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from '../pages/Home'
import LandingPage from '../pages/LandingPage'
import { firebased } from '../services/firebase'
import SignUpPage from '../pages/SignUpPage'
import NavBar from './NavBar'

class App extends React.Component {

    state = {
        authenticated: true
    }

    componentDidMount() {
        this.checkAuth();
    }
    
    checkAuth = () => {
        firebased.auth().onAuthStateChanged((user) =>  {
            if (user) {
                console.log('ding-dong');
                this.setState({authenticated: true})
            } else {
                this.setState({authenticated: false})
            }
        })
    }
        
    render() {
        
        return (
            <Router>
                <div className="app-container">
                <NavBar />
                    <Switch>
                        <Route exact path='/'>
                            {this.state.authenticated ? <Route path='/home' component={Home}/>: <Redirect to='/login' />}  
                        </Route>
                        <Route path='/login' component={LandingPage} />
                        <Route path='/signup' component={SignUpPage}/>
                        <Route path="/t" component={Home} />
                        {this.state.authenticated ? <Route path='/home' component={Home}/> : <Redirect to='/login' />}
                    </Switch>
                </div>
            </Router>
        )
    }  
}

export default connect()(App)