import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "wensi.myshopify.com",
  storefrontAccessToken: "6ed4cd7e20806acea334887f62ebd732"
});

export default client;
