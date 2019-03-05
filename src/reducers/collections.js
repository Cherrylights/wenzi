import { LOAD_COLLECTIONS } from "../constants/actionTypes";

function collections(state = [], action) {
  switch (action.type) {
    case LOAD_COLLECTIONS:
      return [...action.payload];
    default:
      return state;
  }
}

export default collections;
