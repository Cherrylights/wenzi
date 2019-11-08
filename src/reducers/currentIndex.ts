import { UPDATE_INDEX } from "../constants/actionTypes";
import { UpdateIndexAction } from "../types/actions";

function currentIndex(state = 0, action: UpdateIndexAction): number {
  switch (action.type) {
    case UPDATE_INDEX: {
      return action.payload;
    }

    default:
      return state;
  }
}

export default currentIndex;
