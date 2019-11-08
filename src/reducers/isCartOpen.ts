import { TOGGLE_CART } from "../constants/actionTypes";
import { ToggleCartAction } from "../types/actions";

function isCartOpen(state = false, action: ToggleCartAction): boolean {
  switch (action.type) {
    case TOGGLE_CART:
      return !state;

    default:
      return state;
  }
}

export default isCartOpen;
