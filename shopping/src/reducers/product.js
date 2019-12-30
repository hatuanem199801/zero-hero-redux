import { GET_PRODUCT } from "../actions/types";

export default function(state = { products: [] }, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT:
      return {
        ...state,
        products: payload
      };
    default:
      return state;
  }
}
