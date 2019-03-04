import {
  LOAD_PRODUCTS,
  LOAD_FEATURED_PRODUCTS,
  PREV_PRODUCT,
  NEXT_PRODUCT,
  LOAD_PRODUCT
} from "../constants/actionTypes";

import client from "../api/client";

export const loadProducts = () => {
  // return a thunk
  return (dispatch, getState) => {
    client.product.fetchAll().then(products => {
      dispatch(setProducts(products));
    });
  };
};

function setProducts(data) {
  return {
    type: LOAD_PRODUCTS,
    payload: data
  };
}

export const loadFeaturedProducts = () => {
  // return a thunk
  return (dispatch, getState) => {
    const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzg0MTY0MDgzNzgz";
    client.collection.fetchWithProducts(collectionId).then(collection => {
      dispatch(setFeaturedProducts(collection.products));
    });
  };
};

function setFeaturedProducts(data) {
  return {
    type: LOAD_FEATURED_PRODUCTS,
    payload: data
  };
}

export const prevProduct = () => ({
  type: PREV_PRODUCT
});

export const nextProduct = () => ({
  type: NEXT_PRODUCT
});

export const loadProduct = productId => ({
  type: LOAD_PRODUCT,
  payload: productId
});
