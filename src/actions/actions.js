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

// *******  MARK AS LOADED *******
export const markAsLoaded = () => {
  return {
    type: MARK_AS_LOADED
  };
};

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

// *******  CREATE CHECKOUT  *******
export const createCheckout = () => {
  // return a thunk
  return (dispatch, getState) => {
    // Create an empty checkout
    client.checkout.create().then(checkout => {
      dispatch(setCheckout(checkout));
    });
  };
};

function setCheckout(data) {
  return {
    type: CREATE_CHECKOUT,
    payload: data
  };
}

// *******  FETCH CHECKOUT  *******
export const fetchCheckout = checkoutId => {
  // return a thunk
  return (dispatch, getState) => {
    client.checkout.fetch(checkoutId).then(checkout => {
      // First we need to check if the checkout equals to null (maybe because it expires), then we remove it from localStorage and recreate a new one
      if (checkout === null) {
        localStorage.removeItem("checkoutId");
        client.checkout.create().then(checkout => {
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
        client.checkout.create().then(checkout => {
          dispatch(setCheckout(checkout));
        });
      }
    });
  };
};

function updateCheckout(data) {
  return {
    type: UPDATE_CHECKOUT,
    payload: data
  };
}

// *******  TOGGLE CHECKOUT  *******
export const toggleCart = () => ({
  type: TOGGLE_CART
});

// *******  TOGGLE CHECKOUT  *******
export const toggleMenu = () => ({
  type: TOGGLE_MENU
});

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

// *******  LOAD AVAILABLE PRODUCTS  *******
export const loadAvailableProducts = () => {
  // return a thunk
  return (dispatch, getState) => {
    const collectionId = "Z2lkOi8vc2hvcGlmeS9Db2xsZWN0aW9uLzg0NTUyNTgxMTkx";
    client.collection.fetchWithProducts(collectionId).then(collection => {
      dispatch(setAvailableProducts(collection.products));
    });
  };
};

function setAvailableProducts(data) {
  return {
    type: LOAD_AVAILABLE_PRODUCTS,
    payload: data
  };
}

// *******  ADD TO CART  *******
export const addToCart = (variantId, quantity = 1, checkoutId) => {
  const itemToAdd = [{ variantId, quantity: parseInt(quantity, 10) }];
  // return a thunk
  return (dispatch, getState) => {
    client.checkout.addLineItems(checkoutId, itemToAdd).then(checkout => {
      dispatch(updateCheckout(checkout));
    });
  };
};

// *******  UPDATE LINE ITEMS  *******
export const updateLineItems = (productId, quantity = 1, checkoutId) => {
  const lineItemsToUpdate = [
    { id: productId, quantity: parseInt(quantity, 10) }
  ];
  // console.log(lineItemsToUpdate);
  // return a thunk
  return (dispatch, getState) => {
    client.checkout
      .updateLineItems(checkoutId, lineItemsToUpdate)
      .then(checkout => {
        dispatch(updateCheckout(checkout));
      });
  };
};

// *******  REMOVE LINE ITEMS  *******

export const removeLineItems = (productId, checkoutId) => {
  const lineItemIdsToRemove = [productId];
  // return a thunk
  return (dispatch, getState) => {
    client.checkout
      .removeLineItems(checkoutId, lineItemIdsToRemove)
      .then(checkout => {
        if (checkout.lineItems.length === 0) {
          dispatch(updateCheckout(checkout));
          dispatch(toggleCart());
        }
        dispatch(updateCheckout(checkout));
      });
  };
};
