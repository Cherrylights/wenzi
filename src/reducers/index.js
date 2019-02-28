import { combineReducers } from "redux";
import products from "./productsReducer";
import currentIndex from "./currentIndexReducer";

export default combineReducers({
  products,
  currentIndex
});
