import { combineReducers } from "redux";
import products from "./products";
import checkout from "./checkout";
import featuredProducts from "./featuredProducts";
import currentIndex from "./currentIndex";
import product from "./product";
import collections from "./collections";

export default combineReducers({
  products,
  checkout,
  featuredProducts,
  currentIndex,
  product,
  collections
});
