import {
  LOAD_PRODUCTS,
  LOAD_FEATURED_PRODUCTS,
  UPDATE_INDEX,
  LOAD_PRODUCT,
  UNLOAD_PRODUCT,
  LOAD_COLLECTIONS
} from "../constants/actionTypes";
import client from "../api/client";

// *******  LOAD PRODUCTS  *******
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

// *******  LOAD FEATURED PRODUCTS  *******
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

// *******  UPDATE INDEX  *******
export const updateIndex = data => ({
  type: UPDATE_INDEX,
  payload: data
});

// *******  LOAD SINGLE PRODUCT  *******
export const loadProduct = handle => {
  // return a thunk
  return (dispatch, getState) => {
    client.product.fetchAll().then(products => {
      // 'filter' method returns an array so it needs to get the first element
      const product = products.filter(product => product.handle === handle)[0];
      dispatch(setProduct(product));
    });
  };
};

function setProduct(data) {
  return {
    type: LOAD_PRODUCT,
    payload: data
  };
}

// *******  UNLOAD SINGLE PRODUCT  *******
export const unloadProduct = () => ({
  type: UNLOAD_PRODUCT
});

// *******  LOAD COLLECTIONS  *******
export const loadCollections = () => {
  // return a thunk
  return (dispatch, getState) => {
    client.collection.fetchAllWithProducts().then(collections => {
      dispatch(setCollections(collections));
    });
  };
};

function setCollections(data) {
  return {
    type: LOAD_COLLECTIONS,
    payload: data
  };
}
