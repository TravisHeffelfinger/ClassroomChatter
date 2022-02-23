import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import NavBar from "./NavBar";
import { updateChannels, updateMessages } from "../Redux/actions";
import PrivateSwitch from "./PrivateSwitch";
import PublicSwitch from "./PublicSwitch";

class App extends React.Component {
  render() {
    return (
      <Router>
          {this.props.authenticated && <NavBar />}
          {this.props.authenticated ? <PrivateSwitch /> : <PublicSwitch />}
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
