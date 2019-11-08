import { MARK_AS_LOADED } from "../constants/actionTypes";
import { MarkAsLoadedAction } from "../types/actions";

function isInitialLoad(state = true, action: MarkAsLoadedAction): boolean {
  switch (action.type) {
    case MARK_AS_LOADED:
      return false;

    default:
      return state;
  }
}

export default isInitialLoad;
