interface Option {
  id: string;
  name: string;
  values: {
    value: string;
    type: {
      name: string;
      kind: string;
    };
  }[];
  type: {
    name: string;
    kind: string;
    fieldBaseTypes: {
      name: string;
      values: string;
    };
    implementsNode: boolean;
  };
}

interface Image {
  id: string;
  src: string;
  altText: string | null;
  type: {
    name: string;
    kind: string;
    fieldBaseTypes: {
      altText: string;
      id: string;
      originalSrc: string;
      src: string;
    };
    implementsNode: boolean;
  };
  hasNextPage:
    | {
        value: boolean;
      }
    | boolean;
  hasPreviousPage:
    | {
        value: boolean;
      }
    | boolean;
  variableValues: any;
}

interface Variant {
  id: string;
  title: string;
  price: string;
  weight: number;
  available: boolean;
  sku: string;
  compareAtPrice: string | number | boolean | null;
  image: {
    id: string;
    src: string;
    altText: string | null;
    type: {
      name: string | null;
      kind: string | null;
      fieldBaseTypes: {
        altText: string | null;
        id: string | null;
        originalSrc: string | null;
        src: string | null;
      };
      implementsNode: boolean;
    };
  };
  selectedOptions: {
    name: string;
    value: string;
    type: {
      name: string;
      kind: string;
      fieldBaseTypes: {
        name: string;
        value: string;
      };
      implementsNode: boolean;
    };
  }[];
  type: {
    name: string;
    kind: string;
    fieldBaseTypes: {
      availableForSale: string;
      compareAtPrice: string;
      id: string;
      image: string;
      price: string;
      product: string;
      selectedOptions: string;
      sku: string;
      title: string;
      weight: string;
    };
    implementsNode: boolean;
  };
  hasNextPage:
    | {
        value: boolean;
      }
    | boolean;
  hasPreviousPage:
    | {
        value: boolean;
      }
    | boolean;
  variableValues: any;
}

interface Type {
  name: string;
  kind: string;
  fieldBaseTypes: {
    availableForSale: string;
    createdAt: string;
    description: string;
    descriptionHtml: string;
    handle: string;
    id: string;
    images: string;
    onlineStoreUrl: string;
    options: string;
    productType: string;
    publishedAt: string;
    title: string;
    updatedAt: string;
    variants: string;
    vendor: string;
  };
  implementsNode: boolean;
}

export default interface Product {
  id?: string;
  availableForSale?: boolean;
  createdAt?: string;
  updatedAt?: string;
  descriptionHtml?: string;
  description?: string;
  handle?: string;
  productType?: string;
  title?: string;
  vendor?: string;
  publishedAt?: string;
  onlineStoreUrl?: string | null;
  options?: Option[];
  images?: Image[];
  variants?: Variant[];
  type?: Type;
  hasNextPage?:
    | boolean
    | {
        value: boolean;
      };
  hasPreviousPage?: boolean | { value: boolean };
  variableValues?: any;
}
