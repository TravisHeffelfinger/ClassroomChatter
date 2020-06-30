import React, { useEffect } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from '../pages/Home'
import LandingPage from '../pages/LandingPage'
import SignUp from './SignUp'
import { firebased } from '../services/firebase'

const App = () => {
    useEffect(() => {
        firebased.auth().onAuthStateChanged(function (user) {
            if (user) {

            } else {

            }
        })
    })



    return (
        <Router>
            <div>
                {/* <Home /> */}

                <Switch>
                    <Route exact path='/'>
                        <Redirect to='/login' />
                    </Route>
                    <Route path='/login' component={LandingPage} />
                    <Route path='/signup' component={SignUp}/>
                    <Route />
                </Switch>
            </div>
        </Router>
    )
}

export default connect()(App)