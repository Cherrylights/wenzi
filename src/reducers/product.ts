import { LOAD_PRODUCT, UNLOAD_PRODUCT } from "../constants/actionTypes";
import Product from "../types/Product";
import { ProductActionTypes } from "../types/actions";

const defaultState: Product = {};

function product(state = defaultState, action: ProductActionTypes): Product {
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
