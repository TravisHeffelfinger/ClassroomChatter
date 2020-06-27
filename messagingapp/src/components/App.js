import React from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from '../pages/Home'
class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Home />
                    <Switch>
                        <Route />
                        <Route />
                        <Route />
                        <Route />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default connect()(App)