import Product from "./Product";

export default interface Collection {
  id: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  updatedAt: string;
  title: string;
  image: any | null;
  products: Product[];
  type: {
    name: string;
    kind: string;
    fieldBaseTypes: {
      description: string;
      descriptionHtml: string;
      handle: string;
      id: string;
      image: string;
      products: string;
      title: string;
      updatedAt: string;
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
