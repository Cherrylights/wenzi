import { LOAD_FEATURED_PRODUCTS } from "../constants/actionTypes";

function featuredProducts(state = [], action) {
  switch (action.type) {
    case LOAD_FEATURED_PRODUCTS:
      return [...action.payload];

    default:
      return state;
  }
}

export default featuredProducts;
