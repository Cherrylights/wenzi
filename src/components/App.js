import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadProducts,
  loadAvailableProducts,
  loadCollections,
  createCheckout,
  fetchCheckout
} from "../actions/actions";
// import PageTransition from "react-router-page-transition";
import Menu from "./Menu";
import Nav from "./Nav";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import CollectionsPage from "./CollectionsPage";
import Checkout from "./Checkout";
import AllWorkPage from "./AllWorkPage";

class App extends Component {
  componentDidMount() {
    // Check if the visitor is a new customer without any cart info in the cache
    const checkoutId = localStorage.getItem("checkoutId");
    if (checkoutId) {
      this.props.fetchCheckout(checkoutId);
    } else {
      this.props.createCheckout();
    }
    this.props.loadProducts();
    this.props.loadAvailableProducts();
    this.props.loadCollections();
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
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/allwork" component={AllWorkPage} />
          </Switch>
          <Menu />
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
    loadAvailableProducts,
    loadCollections,
    createCheckout,
    fetchCheckout
  }
)(App);
