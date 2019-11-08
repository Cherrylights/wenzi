import Product from "../types/Product";
import Checkout from "../types/Checkout";
import Collection from "../types/Collection";

import {
  LOAD_PRODUCTS,
  CREATE_CHECKOUT,
  UPDATE_CHECKOUT,
  TOGGLE_CART,
  TOGGLE_MENU,
  LOAD_FEATURED_PRODUCTS,
  UPDATE_INDEX,
  LOAD_PRODUCT,
  UNLOAD_PRODUCT,
  LOAD_COLLECTIONS,
  LOAD_AVAILABLE_PRODUCTS,
  MARK_AS_LOADED
} from "../constants/actionTypes";

// *******  MARK AS LOADED *******
export interface MarkAsLoadedAction {
  type: typeof MARK_AS_LOADED;
}

// *******  LOAD PRODUCTS  *******
export interface SetProductsAction {
  type: typeof LOAD_PRODUCTS;
  payload: Product[];
}

// *******  CREATE CHECKOUT  *******
export interface SetCheckoutAction {
  type: typeof CREATE_CHECKOUT;
  payload: Checkout;
}
// *******  UPDATE CHECKOUT  *******
export interface UpdateCheckoutAction {
  type: typeof UPDATE_CHECKOUT;
  payload: Checkout;
}

// *******  TOGGLE CHECKOUT  *******
export interface ToggleCartAction {
  type: typeof TOGGLE_CART;
}

// *******  TOGGLE MENU  *******
export interface ToggleMenuAction {
  type: typeof TOGGLE_MENU;
}

// *******  LOAD FEATURED PRODUCTS  *******
export interface SetFeaturedProductsAction {
  type: typeof LOAD_FEATURED_PRODUCTS;
  payload: Product[];
}

// *******  UPDATE INDEX  *******
export interface UpdateIndexAction {
  type: typeof UPDATE_INDEX;
  payload: number;
}

// *******  LOAD SINGLE PRODUCT  *******
export interface SetProductAction {
  type: typeof LOAD_PRODUCT;
  payload: Product;
}

// *******  UNLOAD SINGLE PRODUCT  *******
export interface UnloadProductAction {
  type: typeof UNLOAD_PRODUCT;
}

// *******  LOAD COLLECTIONS  *******
export interface SetCollectionsAction {
  type: typeof LOAD_COLLECTIONS;
  payload: Collection[];
}

// *******  LOAD AVAILABLE PRODUCTS  *******
export interface SetAvailableProductsAction {
  type: typeof LOAD_AVAILABLE_PRODUCTS;
  payload: Product[];
}

export type ProductActionTypes =
  | SetProductsAction
  | SetFeaturedProductsAction
  | SetProductAction
  | UnloadProductAction
  | SetAvailableProductsAction;
export type CheckoutActionTypes = SetCheckoutAction | UpdateCheckoutAction;
export type AppActions =
  | ProductActionTypes
  | CheckoutActionTypes
  | MarkAsLoadedAction
  | ToggleCartAction
  | ToggleMenuAction
  | UpdateIndexAction
  | SetCollectionsAction;
