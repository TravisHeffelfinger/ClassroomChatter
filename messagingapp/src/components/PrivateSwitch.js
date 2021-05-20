import React from 'react'
import {
    Route,
    Switch,
  } from "react-router-dom";

import Home from "../pages/Home";
import Edit from './Edit'

const PrivateSwitch = () => {
    return (
        <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/edit" component={Edit} />
              <Route component={Home} />
        </Switch>
    )
}

export default PrivateSwitch
