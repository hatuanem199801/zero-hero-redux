import {
  ADD_CART,
  GET_CART,
  CART_FAILED,
  PAYMENT,
  DELETE_CART,
  INCREMENT_CART,
  DECREMENT_CART
} from "./types";

export const getCart = () => dispatch => {
  const carts = localStorage.getItem("carts") || [];
  try {
    dispatch({
      type: GET_CART,
      payload: carts
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CART_FAILED,
      payload: error
    });
  }
};

export const addCart = product => dispatch => {
  try {
    dispatch({
      type: ADD_CART,
      payload: product
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CART_FAILED,
      payload: error
    });
  }
};

export const payment = () => dispatch => {
  try {
    dispatch({
      type: PAYMENT
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CART_FAILED,
      payload: error
    });
  }
};

export const deleteCart = cart => dispatch => {
  try {
    dispatch({
      type: DELETE_CART,
      payload: cart
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CART_FAILED,
      payload: error
    });
  }
};

export const incrementCart = cart => dispatch => {
  try {
    dispatch({
      type: INCREMENT_CART,
      payload: cart
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CART_FAILED,
      error: error
    });
  }
};

export const decrementCart = cart => dispatch => {
  try {
    dispatch({
      type: DECREMENT_CART,
      payload: cart
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: CART_FAILED,
      error: error
    });
  }
};
