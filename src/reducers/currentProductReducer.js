import products from "../api/products";
import { LOAD_PRODUCT } from "../constants/actionTypes";

function currentProductReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_PRODUCT: {
      return products[action.payload];
    }
    default:
      return state;
  }
}

export default currentProductReducer;
