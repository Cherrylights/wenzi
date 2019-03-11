import { LOAD_AVAILABLE_PRODUCTS } from "../constants/actionTypes";

function availableProducts(state = [], action) {
  switch (action.type) {
    case LOAD_AVAILABLE_PRODUCTS:
      return [...action.payload];

    default:
      return state;
  }
}

export default availableProducts;
