import { CREATE_CHECKOUT } from "../constants/actionTypes";

function checkout(state = { lineItems: [] }, action) {
  switch (action.type) {
    case CREATE_CHECKOUT:
      return { ...action.payload };
    default:
      return state;
  }
}

export default checkout;
