import {
  ADD_CART,
  GET_CART,
  CART_FAILED,
  PAYMENT,
  DELETE_CART
} from "../actions/types";

const intialState = {
  carts: [],
  errors: {}
};

export default function(state = intialState, action) {
  const { type, payload } = action;
  let carts = [...state.carts];
  switch (type) {
    case GET_CART:
      carts = JSON.parse(localStorage.getItem("carts")) || [];
      return {
        ...state,
        carts
      };
    case ADD_CART:
      const cartIsExists = carts
        .map(cart => cart.product.id)
        .indexOf(payload.id);
      if (cartIsExists === -1) {
        carts = [
          {
            id: state.carts.length + 1,
            product: payload,
            quantity: 1,
            date_create: Date.now
          },
          ...state.carts
        ];
      } else {
        carts = carts.map(cart => {
          if (cart.product.id === payload.id) {
            cart.quantity++;
          }
          return cart;
        });
      }
      localStorage.setItem("carts", JSON.stringify(carts));
      return {
        ...state,
        carts
      };
    case PAYMENT:
      localStorage.removeItem("carts");
      return {
        ...state,
        carts: []
      };
    case DELETE_CART:
      carts = carts.filter(cart => cart.id !== payload.id);
      localStorage.setItem("carts", JSON.stringify(carts));
      return {
        ...state,
        carts
      };
    case CART_FAILED:
      return {
        ...state,
        carts: [],
        errors: payload
      };
    default:
      return state;
  }
}
