import { UPDATE_INDEX } from "../constants/actionTypes";

function currentIndex(state = 0, action) {
  switch (action.type) {
    case UPDATE_INDEX: {
      return action.payload;
    }

    default:
      return state;
  }
}

export default currentIndex;
