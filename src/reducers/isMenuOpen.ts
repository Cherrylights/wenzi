import { TOGGLE_MENU } from "../constants/actionTypes";
import { ToggleMenuAction } from "../types/actions";

function isMenuOpen(state = false, action: ToggleMenuAction): boolean {
  switch (action.type) {
    case TOGGLE_MENU:
      return !state;

    default:
      return state;
  }
}

export default isMenuOpen;
