import {
  PREV_PRODUCT,
  NEXT_PRODUCT,
  LOAD_PRODUCT,
  LOAD_FEATURED_PRODUCTS
} from "../constants/actionTypes";

import client from "../api/client";

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
