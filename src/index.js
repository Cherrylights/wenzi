import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import ScrollToTop from "./util/ScrollToTop";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
