import products from "../api/products";
import { PREV_PROJECT, NEXT_PROJECT } from "../constants/actionTypes";

function currentIndexReducer(state = 0, action) {
  switch (action.type) {
    case PREV_PROJECT: {
      if (state === 0) {
        return Object.keys(products).length - 1;
      } else {
        return state - 1;
      }
    }
    case NEXT_PROJECT: {
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

export default currentIndexReducer;
