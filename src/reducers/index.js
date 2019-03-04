import { combineReducers } from "redux";
import products from "./products";
import featuredProducts from "./featuredProducts";
import currentIndex from "./currentIndexReducer";
// import currentProduct from "./currentProduct";

export default combineReducers({
  products,
  featuredProducts,
  currentIndex
  // currentProduct
});
