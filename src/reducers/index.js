import { combineReducers } from "redux";
import products from "./productsReducer";
import currentIndex from "./currentIndexReducer";
import currentProduct from "./currentProductReducer";
import featuredProducts from "./featuredProducts";

export default combineReducers({
  products,
  featuredProducts,
  currentIndex,
  currentProduct
});
