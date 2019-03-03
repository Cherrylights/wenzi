import { combineReducers } from "redux";
import products from "./productsReducer";
import currentIndex from "./currentIndexReducer";
import currentProduct from "./currentProductReducer";

export default combineReducers({
  products,
  currentIndex,
  currentProduct
});
