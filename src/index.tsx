import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./store/store";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);

console.log(
  "%cCreated by Yikai (yikai.ca)✋, thanks for visiting!",
  "background: #361d32; color:#edd2cb; padding: 3px 10px; border-radius: 3px;"
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
