import { CREATE_CHECKOUT, ADD_TO_CART } from "../constants/actionTypes";

function checkout(state = { lineItems: [] }, action) {
  switch (action.type) {
    case CREATE_CHECKOUT:
      return { ...action.payload };
    case ADD_TO_CART:
      return { ...action.payload };
    default:
      return state;
  }
}

export default checkout;
