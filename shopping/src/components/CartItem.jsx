import React from "react";

const CartItem = ({ cart, onClick }) => (
  <li className="list-group-item">
    <h5>{cart.product.title}</h5>
    <h6>
      Quantity : {cart.quantity} x <i> ${cart.product.price}</i>
    </h6>
    <hr />
    <h6>
      Total :<strong> $ {cart.product.price * cart.quantity}</strong>
    </h6>
    <button onClick={() => onClick(cart)} className="btn btn-danger btn-sm">
      delete
    </button>
  </li>
);

export default CartItem;
