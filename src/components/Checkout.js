import React, { Component } from "react";
import client from "../api/client";

class Checkout extends Component {
  componentDidMount() {
    client.product.fetchAll().then(products => {
      // Do something with the products
      console.log("products[0]", products[0]);
    });
    client.collection.fetchAllWithProducts().then(collections => {
      // Do something with the collections
      console.log("collecitons", collections);
    });

    // Create an empty checkout
    client.checkout.create().then(checkout => {
      console.log("checkout", checkout);
    });
    const checkoutId =
      "Z2lkOi8vc2hvcGlmeS9DaGVja291dC8wZWI0Zjg0MzRmNmNjYWYzZGYxNWJjMzY0MjEyODBhNT9rZXk9NGIyYmY2NmFkMDEzN2U0OTAwNTBlZDZmOWRiYzhiZDE="; // ID of an existing checkout
    const lineItemsToAdd = [
      {
        variantId:
          "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNjMxMDIwODI5OTA3OQ==",
        quantity: 1
      }
    ];

    // Add an item to the checkout
    client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(checkout => {
      // Do something with the updated checkout
      console.log("lineItems", checkout.lineItems); // Array with one additional line item
      console.log("checkout after lineItem", checkout);
      console.log(checkout.webUrl);
    });
  }
  render() {
    return <div>Checkout</div>;
  }
}

export default Checkout;
