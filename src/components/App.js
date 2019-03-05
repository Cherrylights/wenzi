import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadProducts,
  createCheckout,
  fetchCheckout
} from "../actions/actions";
// import PageTransition from "react-router-page-transition";
import Nav from "./Nav";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import CollectionsPage from "./CollectionsPage";
import Checkout from "./Checkout";

class App extends Component {
  componentDidMount() {
    // Load products and create an empty checkout
    this.props.loadProducts();
    const checkoutId = localStorage.getItem("checkoutId");
    if (checkoutId) {
      this.props.fetchCheckout(checkoutId);
    } else {
      this.props.createCheckout();
    }
  }
  render() {
    return (
      <BrowserRouter>
        {/* <Route
          render={({ location }) => ( */}
        <React.Fragment>
          <Nav />
          {/* <PageTransition timeout={5000}> */}
          {/* <Switch location={location}> */}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/work/:handle" component={ProductPage} />
            <Route exact path="/collections" component={CollectionsPage} />
          </Switch>
          {/* <Checkout /> */}
          {/* </PageTransition> */}
        </React.Fragment>
        {/* )}
        /> */}
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  {
    loadProducts,
    createCheckout,
    fetchCheckout
  }
)(App);
