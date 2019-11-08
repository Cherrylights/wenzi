import { CREATE_CHECKOUT, UPDATE_CHECKOUT } from "../constants/actionTypes";
import Checkout from "../types/Checkout";
import { CheckoutActionTypes } from "../types/actions";

const defaultState: Checkout = {
  id: "",
  ready: false,
  requiresShipping: false,
  note: null,
  paymentDue: "",
  webUrl: "",
  orderStatusUrl: null,
  taxExempt: false,
  taxesIncluded: false,
  currencyCode: "",
  totalTax: "",
  subtotalPrice: "",
  totalPrice: "",
  completedAt: null,
  createdAt: "",
  updatedAt: "",
  email: "",
  discountApplications: [],
  shippingAddress: "",
  shippingLine: null,
  customAttributes: [],
  order: null,
  lineItems: [],
  type: {
    name: "",
    kind: "",
    fieldBaseTypes: {
      completedAt: "",
      createdAt: "",
      currencyCode: "",
      customAttributes: "",
      discountApplications: "",
      email: "",
      id: "",
      lineItems: "",
      note: "",
      order: "",
      orderStatusUrl: "",
      paymentDue: "",
      ready: "",
      requiresShipping: "",
      shippingAddress: "",
      shippingLine: "",
      subtotalPrice: "",
      taxExempt: "",
      taxesIncluded: "",
      totalPrice: "",
      totalTax: "",
      updatedAt: "",
      webUrl: ""
    },
    implementsNode: false
  },
  userErrors: []
};

function checkout(state = defaultState, action: CheckoutActionTypes): Checkout {
  switch (action.type) {
    case CREATE_CHECKOUT: {
      localStorage.setItem("checkoutId", action.payload.id);
      return { ...action.payload };
    }

    case UPDATE_CHECKOUT: {
      return { ...action.payload };
    }

    default:
      return state;
  }
}

export default checkout;
