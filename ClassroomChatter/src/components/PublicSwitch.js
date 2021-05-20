import React from "react";
import { Route, Switch } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import Register from "../pages/Register";

const PublicSwitch = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={LandingPage} />
      <Route exact path="/signup" component={Register} />
    </Switch>
  );
};

export default PublicSwitch;
