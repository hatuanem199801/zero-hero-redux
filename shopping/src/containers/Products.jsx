import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProductItem from "../components/ProductItem";
import { addCart } from "../actions/cart";

class Products extends Component {
  state = {
    products: this.props.products || []
  };
  handleOnAddToCart = product => {
    this.props.addCart(product);
  };
  render() {
    const loading = this.state.products ? (
      <Fragment>
        {this.state.products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onClick={this.handleOnAddToCart}
          />
        ))}
      </Fragment>
    ) : (
      <h5>Loading ...</h5>
    );
    return (
      <div className="products">
        <h1 className="font-weight-light text-center">Products</h1>
        <div className="container">{loading}</div>
      </div>
    );
  }
}

Products.propTypes = {
  products: PropTypes.array.isRequired,
  addCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: state.product.products
});

const mapDispatchToProps = dispatch => ({
  addCart: product => dispatch(addCart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
