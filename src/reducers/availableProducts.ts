import { LOAD_AVAILABLE_PRODUCTS } from "../constants/actionTypes";
import Product from "../types/Product";
import { ProductActionTypes } from "../types/actions";

const defaultState: Product[] = [];

function availableProducts(
  state = defaultState,
  action: ProductActionTypes
): Product[] {
  switch (action.type) {
    case LOAD_AVAILABLE_PRODUCTS:
      return [...action.payload];

    default:
      return state;
  }
}

export default availableProducts;
