import React from "react";
const CartItem = ({ cart, onDelete, onIncrement, onDecrement }) => (
  <li className="list-group-item">
    <h5>{cart.product.title}</h5>
    <h6>
      Quantity : {cart.quantity} x <i> ${cart.product.price}</i>
    </h6>
    <h6>
      Total :<strong> $ {cart.product.price * cart.quantity}</strong>
    </h6>
    <div className="controls-incre-decre-ment">
      <button
        onClick={() => onIncrement(cart)}
        className="badge badge-warning border-0 px-2 mr-1"
      >
        up
      </button>
      <button className="badge border-0 px-2 mr-1">{cart.quantity}</button>
      <button
        onClick={() => onDecrement(cart)}
        className="badge badge-warning border-0 px-2 mr-1"
      >
        down
      </button>
    </div>
    <hr />
    <button
      onClick={() => onDelete(cart)}
      className="badge badge-danger border-0 px-2 py-1 shadow"
    >
      delete
    </button>
  </li>
);

export default CartItem;
