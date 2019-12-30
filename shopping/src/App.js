import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getProducts } from "./actions/product";
import { connect } from "react-redux";
import Container from "./containers/Container";
import Cart from "./containers/Cart";
import PropTypes from "prop-types";
import Products from "./containers/Products";
import store from "./store";
import React, { Component } from "react";
class App extends Component {
  UNSAFE_componentWillMount() {
    store.dispatch(getProducts());
  }
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Switch>
            <Route exact path="/" component={Products} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}
App.propTypes = {
  getProducts: PropTypes.func.isRequired
};

export default connect(null, { getProducts })(App);
