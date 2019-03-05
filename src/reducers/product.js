import { LOAD_PRODUCT, UNLOAD_PRODUCT } from "../constants/actionTypes";

function product(state = {}, action) {
  switch (action.type) {
    case LOAD_PRODUCT: {
      return { ...action.payload };
    }

    case UNLOAD_PRODUCT: {
      return {};
    }

    default:
      return state;
  }
}

export default product;
