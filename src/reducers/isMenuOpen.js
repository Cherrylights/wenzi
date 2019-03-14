import { TOGGLE_MENU } from "../constants/actionTypes";

function isMenuOpen(state = false, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return !state;

    default:
      return state;
  }
}

export default isMenuOpen;
