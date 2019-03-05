import { LOAD_PRODUCTS } from "../constants/actionTypes";

function products(state = [], action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return [...action.payload];
    default:
      return state;
  }
}

export default products;
