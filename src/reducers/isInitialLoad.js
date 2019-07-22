import { MARK_AS_LOADED } from "../constants/actionTypes";

function isInitialLoad(state = true, action) {
  switch (action.type) {
    case MARK_AS_LOADED:
      return false;

    default:
      return state;
  }
}

export default isInitialLoad;
