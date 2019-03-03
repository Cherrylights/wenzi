import {
  PREV_PRODUCT,
  NEXT_PRODUCT,
  LOAD_PRODUCT
} from "../constants/actionTypes";

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
