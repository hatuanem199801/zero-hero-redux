import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCart } from "../actions/cart";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Navbar extends Component {
  state = {
    counter: 0
  };

  UNSAFE_componentWillMount() {
    this.props.getCart();
  }

  render() {
    const counterLoading =
      this.props.carts.length > 0 ? (
        <span>
          {this.props.carts.reduce((total, cart) => total + cart.quantity, 0)}
        </span>
      ) : (
        "0"
      );
    return (
      <nav className="navbar shadow navbar-nav">
        <div className="container">
          <Link to="/" className="navbar-brand text-dark">
            Shoping redux
          </Link>
          <div className="cart">
            <div className="cart-counter">
              <Link to="/cart">
                <span className="mr-2">CART</span>
                <span className="badge badge-warning">{counterLoading}</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  carts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  carts: state.cart.carts
});

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
