import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";

import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import SignUpPage from "../pages/SignUpPage";
import NavBar from "../components/NavBar";
import { updateChannels, updateMessages } from "../actions";
import { Paper } from "@material-ui/core";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Paper className="app-container">
          <NavBar />

          {this.props.authenticated ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Home} />
              <Route path="/signup" component={Home} />
              <Route component={Home} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/login" component={LandingPage} /> // TODO:
              change this to login page
              <Route exact path="/signup" component={SignUpPage} />
            </Switch>
          )}
        </Paper>
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
