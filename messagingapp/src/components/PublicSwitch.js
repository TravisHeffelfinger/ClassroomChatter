import React from "react";
import { Route, Switch } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import SignUpPage from "../pages/SignUpPage";

const PublicSwitch = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LandingPage} />
      <Route exact path="/signup" component={SignUpPage} />
    </Switch>
  );
};

export default PublicSwitch;
