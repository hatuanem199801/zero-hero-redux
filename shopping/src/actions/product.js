import { GET_PRODUCT } from "./types";
import { products } from "../api/mock";

export const getProducts = () => {
  return {
    type: GET_PRODUCT,
    payload: products
  };
};
