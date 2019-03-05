import { combineReducers } from "redux";
import products from "./products";
import featuredProducts from "./featuredProducts";
import currentIndex from "./currentIndex";
import product from "./product";

export default combineReducers({
  products,
  featuredProducts,
  currentIndex,
  product
});
