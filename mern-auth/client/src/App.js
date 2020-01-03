import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Landing from "./Landing";
import HomePage from "./HomePage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
