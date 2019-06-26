import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { isMobile, isMobileOnly } from "react-device-detect";
import {
  loadProducts,
  loadAvailableProducts,
  loadCollections,
  createCheckout,
  fetchCheckout
} from "../actions/actions";
//import PageTransition from "react-router-page-transition";
import { BrowserRouter } from "react-router-dom";
import ErrorBounday from "./ErrorBoundary";
import Overlay from "./Overlay";
import Menu from "./Menu";
import Nav from "./Nav";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import CollectionsPage from "./CollectionsPage";
import Cart from "./Cart";
import AllWorkPage from "./AllWorkPage";
import AboutPage from "./AboutPage";
import LocalStorePage from "./LocalStorePage";
import NotFoundPage from "./NotFoundPage";

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

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      // Prefetch all product thumbnail images at the initial load
      const thumbnails = this.props.products.map(
        product => product.images[0].src
      );
      thumbnails.forEach(thumbnail => {
        const img = new Image();
        img.src = thumbnail;
      });
    }
  }

  render() {
    return (
      <ErrorBounday>
        <BrowserRouter>
          <div className={isMobile ? "mobile" : "desktop"}>
            {isMobileOnly ? "" : <Overlay />}
            <Nav />
            {/* <Route
            render={({ location }) => (
              <PageTransition timeout={2000}> */}
            {/* <Switch location={location}> */}
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/work/:handle" component={ProductPage} />
              <Route exact path="/collections" component={CollectionsPage} />
              <Route exact path="/works" component={AllWorkPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/localstore" component={LocalStorePage} />
              <Route component={NotFoundPage} />
            </Switch>
            {/* </PageTransition>
            )}
          /> */}
            <Menu />
            <Cart />
          </div>
        </BrowserRouter>
      </ErrorBounday>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  };
}

export default connect(
  mapStateToProps,
  {
    loadProducts,
    loadAvailableProducts,
    loadCollections,
    createCheckout,
    fetchCheckout
  }
)(App);
