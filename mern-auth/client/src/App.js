import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Landing from "./Landing";
import HomePage from "./HomePage";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/user";
import PrivateRoute from "./routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Landing} />
          <PrivateRoute path="/home" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
