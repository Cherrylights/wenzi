import { TOGGLE_CART } from "../constants/actionTypes";

function isCartOpen(state = false, action) {
  switch (action.type) {
    case TOGGLE_CART:
      return !state;

    default:
      return state;
  }
}

export default isCartOpen;
