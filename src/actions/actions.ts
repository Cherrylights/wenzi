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
import client from "../api/client";
import Product from "../types/Product";
import Collection from "../types/Collection";
import Checkout from "../types/Checkout";
import { AppActions } from "../types/actions";
import { Dispatch } from "redux";
import { AppState } from "../store/store";

// *******  MARK AS LOADED *******
export const markAsLoaded = (): AppActions => {
  return {
    type: MARK_AS_LOADED
  };
};

// *******  LOAD PRODUCTS  *******
export const loadProducts = () => {
  // return a thunk
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    client.product.fetchAll().then((products: Product[]) => {
      dispatch(setProducts(products));
    });
  };
};

function setProducts(products: Product[]): AppActions {
  return {
    type: LOAD_PRODUCTS,
    payload: products
  };
}

// *******  CREATE CHECKOUT  *******
export const createCheckout = () => {
  // return a thunk
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    // Create an empty checkout
    client.checkout.create().then((checkout: Checkout) => {
      dispatch(setCheckout(checkout));
    });
  };
};

function setCheckout(checkout: Checkout): AppActions {
  return {
    type: CREATE_CHECKOUT,
    payload: checkout
  };
}

// *******  FETCH CHECKOUT  *******
export const fetchCheckout = (checkoutId: string) => {
  // return a thunk
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    client.checkout.fetch(checkoutId).then((checkout: Checkout | null) => {
      // First we need to check if the checkout equals to null (maybe because it expires), then we remove it from localStorage and recreate a new one
      if (checkout === null) {
        localStorage.removeItem("checkoutId");
        client.checkout.create().then((checkout: Checkout) => {
          dispatch(setCheckout(checkout));
        });
        return;
      }

      // And then we need to check if it's been checked out
      // if the cart hasn't been checked out yet, fetch it
      if (checkout.completedAt === null) {
        dispatch(updateCheckout(checkout));
      } else {
        // if it's been checked out, then clear it and create a new one
        localStorage.removeItem("checkoutId");
        client.checkout.create().then((checkout: Checkout) => {
          dispatch(setCheckout(checkout));
        });
      }
    });
  };
};

function updateCheckout(checkout: Checkout): AppActions {
  return {
    type: UPDATE_CHECKOUT,
    payload: checkout
  };
}

// *******  TOGGLE CHECKOUT  *******
export const toggleCart = (): AppActions => ({
  type: TOGGLE_CART
});

// *******  TOGGLE MENU  *******
export const toggleMenu = (): AppActions => ({
  type: TOGGLE_MENU
});

// *******  LOAD FEATURED PRODUCTS  *******
export const loadFeaturedProducts = () => {
  // return a thunk
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzg0MTY0MDgzNzgz";
    client.collection
      .fetchWithProducts(collectionId)
      .then((collection: Collection) => {
        dispatch(setFeaturedProducts(collection.products));
      });
  };
};

function setFeaturedProducts(products: Product[]): AppActions {
  return {
    type: LOAD_FEATURED_PRODUCTS,
    payload: products
  };
}

// *******  UPDATE INDEX  *******
export const updateIndex = (index: number): AppActions => ({
  type: UPDATE_INDEX,
  payload: index
});

// *******  LOAD SINGLE PRODUCT  *******
export const loadProduct = (handle: string) => {
  // return a thunk
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    client.product.fetchAll().then((products: Product[]) => {
      const product = products.filter(product => product.handle === handle)[0];
      dispatch(setProduct(product));
    });
  };
};

function setProduct(product: Product): AppActions {
  return {
    type: LOAD_PRODUCT,
    payload: product
  };
}

// *******  UNLOAD SINGLE PRODUCT  *******
export const unloadProduct = (): AppActions => ({
  type: UNLOAD_PRODUCT
});

// *******  LOAD COLLECTIONS  *******
export const loadCollections = () => {
  // return a thunk
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    client.collection
      .fetchAllWithProducts()
      .then((collections: Collection[]) => {
        dispatch(setCollections(collections));
      });
  };
};

function setCollections(collections: Collection[]): AppActions {
  return {
    type: LOAD_COLLECTIONS,
    payload: collections
  };
}

// *******  LOAD AVAILABLE PRODUCTS  *******
export const loadAvailableProducts = () => {
  // return a thunk
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzg0NTUyNTgxMTkx";
    client.collection
      .fetchWithProducts(collectionId)
      .then((collection: Collection) => {
        dispatch(setAvailableProducts(collection.products));
      });
  };
};

function setAvailableProducts(products: Product[]): AppActions {
  return {
    type: LOAD_AVAILABLE_PRODUCTS,
    payload: products
  };
}

// *******  ADD TO CART  *******
export const addToCart = (
  variantId: string,
  quantity = "1",
  checkoutId: string
) => {
  const itemToAdd = [{ variantId, quantity: parseInt(quantity, 10) }];
  // return a thunk
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    client.checkout
      .addLineItems(checkoutId, itemToAdd)
      .then((checkout: Checkout) => {
        dispatch(updateCheckout(checkout));
      });
  };
};

// *******  UPDATE LINE ITEMS  *******
export const updateLineItems = (
  productId: string,
  quantity = "1",
  checkoutId: string
) => {
  const lineItemsToUpdate = [
    { id: productId, quantity: parseInt(quantity, 10) }
  ];
  // console.log(lineItemsToUpdate);
  // return a thunk
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    client.checkout
      .updateLineItems(checkoutId, lineItemsToUpdate)
      .then((checkout: Checkout) => {
        dispatch(updateCheckout(checkout));
      });
  };
};

// *******  REMOVE LINE ITEMS  *******
export const removeLineItems = (productId: string, checkoutId: string) => {
  const lineItemIdsToRemove = [productId];
  // return a thunk
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    client.checkout
      .removeLineItems(checkoutId, lineItemIdsToRemove)
      .then((checkout: Checkout) => {
        if (checkout.lineItems.length === 0) {
          dispatch(updateCheckout(checkout));
          dispatch(toggleCart());
        }
        dispatch(updateCheckout(checkout));
      });
  };
};
