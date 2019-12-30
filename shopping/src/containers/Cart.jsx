import React, { Component } from "react";
import { connect } from "react-redux";
import { payment, deleteCart } from "../actions/cart";
import PropTypes from "prop-types";
import CartItem from "../components/CartItem";

class Cart extends Component {
  handleOnDelete = cart => {
    this.props.deleteCart(cart);
  };
  handleOnPayment = () => {
    this.props.payment();
  };
  render() {
    const cartLoading =
      this.props.carts.length > 0 ? (
        <ul className="list-group">
          {this.props.carts.map(cart => (
            <CartItem
              key={cart.id.toString()}
              cart={cart}
              onClick={this.handleOnDelete}
            />
          ))}
        </ul>
      ) : (
        "Nothing in your cart"
      );
    return (
      <div>
        <div className="carts">{cartLoading}</div>
        <hr />
        <div className="carts-footer mt-3">
          <h1>
            Total of all : $
            {this.props.carts.reduce(
              (total, cart) => total + cart.quantity * cart.product.price,
              0
            )}
          </h1>
          {this.props.carts.length > 0 ? (
            <button
              onClick={this.handleOnPayment}
              className="btn btn-outline-info btn-lg"
            >
              Payment
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  carts: PropTypes.array.isRequired,
  deleteCart: PropTypes.func.isRequired,
  payment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  carts: state.cart.carts
});

const mapDispatchToProps = dispatch => ({
  payment: () => dispatch(payment()),
  deleteCart: cart => dispatch(deleteCart(cart))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
