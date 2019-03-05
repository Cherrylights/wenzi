import products from "../api/products";
import { PREV_PRODUCT, NEXT_PRODUCT } from "../constants/actionTypes";

function currentIndex(state = 0, action) {
  switch (action.type) {
    case PREV_PRODUCT: {
      if (state === 0) {
        return Object.keys(products).length - 1;
      } else {
        return state - 1;
      }
    }
    case NEXT_PRODUCT: {
      if (state === Object.keys(products).length - 1) {
        return 0;
      } else {
        return state + 1;
      }
    }
    default:
      return state;
  }
}

export default currentIndex;
