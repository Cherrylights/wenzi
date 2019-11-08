import { LOAD_COLLECTIONS } from "../constants/actionTypes";
import Collection from "../types/Collection";
import { SetCollectionsAction } from "../types/actions";

const defaultState: Collection[] = [];

function collections(
  state = defaultState,
  action: SetCollectionsAction
): Collection[] {
  switch (action.type) {
    case LOAD_COLLECTIONS:
      return [...action.payload];
    default:
      return state;
  }
}

export default collections;
