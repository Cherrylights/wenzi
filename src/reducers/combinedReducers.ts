import { combineReducers } from "redux";
import products from "./products";
import checkout from "./checkout";
import isCartOpen from "./isCartOpen";
import isMenuOpen from "./isMenuOpen";
import featuredProducts from "./featuredProducts";
import currentIndex from "./currentIndex";
import product from "./product";
import collections from "./collections";
import availableProducts from "./availableProducts";
import isInitialLoad from "./isInitialLoad";

export default combineReducers({
  products,
  checkout,
  isCartOpen,
  isMenuOpen,
  featuredProducts,
  currentIndex,
  product,
  collections,
  availableProducts,
  isInitialLoad
});
