import { CREATE_CHECKOUT, UPDATE_CHECKOUT } from "../constants/actionTypes";

function checkout(state = { lineItems: [] }, action) {
  switch (action.type) {
    case CREATE_CHECKOUT: {
      localStorage.setItem("checkoutId", action.payload.id);
      return { ...action.payload };
    }

    case UPDATE_CHECKOUT:
      return { ...action.payload };

    default:
      return state;
  }
}

export default checkout;
