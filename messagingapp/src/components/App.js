import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";

import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import SignUpPage from "../pages/SignUpPage";
import NavBar from "../components/NavBar";
import { updateChannels, updateMessages } from "../actions";
import { Container } from "@material-ui/core";
import Edit from './Edit'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Container className="app-container">
          {this.props.authenticated && <NavBar />}

          {this.props.authenticated ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/edit" component={Edit} />
              <Route component={Home} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/login" component={LandingPage} />
              <Route exact path="/signup" component={SignUpPage} />
            </Switch>
          )}
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = {
  updateChannels,
  updateMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
