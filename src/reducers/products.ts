import { LOAD_PRODUCTS } from "../constants/actionTypes";
import Product from "../types/Product";
import { ProductActionTypes } from "../types/actions";

const defaultState: Product[] = [];

function products(state = defaultState, action: ProductActionTypes): Product[] {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return [...action.payload];
    default:
      return state;
  }
}

export default products;
