type Checkout = {
  __typename?: string;
  id: string;
  ready: boolean;
  requiresShipping: boolean;
  note: any;
  paymentDue: string | null;
  webUrl: string | null;
  orderStatusUrl: any | null;
  taxExempt: boolean | null;
  taxesIncluded: boolean | null;
  currencyCode: string | null;
  totalTax: string | null;
  subtotalPrice: string | null;
  totalPrice: string | null;
  completedAt: any | null;
  createdAt: string | null;
  updatedAt: string | null;
  email: string | null;
  discountApplications: any[];
  shippingAddress: string | null;
  shippingLine: any | null;
  customAttributes: any[];
  order: any | null;
  lineItems: any[];
  type: {
    name: string | null;
    kind: string | null;
    fieldBaseTypes: {
      completedAt: string | null;
      createdAt: string | null;
      currencyCode: string | null;
      customAttributes: string | null;
      discountApplications: string | null;
      email: string | null;
      id: string | null;
      lineItems: string | null;
      note: string | null;
      order: string | null;
      orderStatusUrl: string | null;
      paymentDue: string | null;
      ready: string | null;
      requiresShipping: string | null;
      shippingAddress: string | null;
      shippingLine: string | null;
      subtotalPrice: string | null;
      taxExempt: string | null;
      taxesIncluded: string | null;
      totalPrice: string | null;
      totalTax: string | null;
      updatedAt: string | null;
      webUrl: string | null;
    };
    implementsNode: boolean | null;
  };
  userErrors?: any[];
} | null;

export default Checkout;
