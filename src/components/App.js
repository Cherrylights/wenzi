import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { isMobile, isMobileOnly } from "react-device-detect";
import {
  loadProducts,
  loadAvailableProducts,
  loadCollections,
  createCheckout,
  fetchCheckout
} from "../actions/actions";
import { CSSTransition } from "react-transition-group";
import ErrorBounday from "./ErrorBoundary";
import Overlay from "./Overlay";
import Menu from "./Menu";
import Nav from "./Nav";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import CollectionsPage from "./CollectionsPage";
import Cart from "./Cart";
// import AllWorkPage from "./AllWorkPage";
import AllProductsPage from "./AllProductsPage";
import AboutPage from "./AboutPage";
import LocalStorePage from "./LocalStorePage";
import CarouselPage from "./CarouselPage";
// import NotFoundPage from "./NotFoundPage";

const routes = [
  // { path: "/", Component: HomePage },
  { path: "/welcome", Component: CarouselPage },
  { path: "/work/:handle", Component: ProductPage },
  { path: "/collections", Component: CollectionsPage },
  { path: "/works", Component: AllProductsPage },
  { path: "/about", Component: AboutPage },
  { path: "/localstores", Component: LocalStorePage }
];

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
            {/* <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/work/:handle" component={ProductPage} />
              <Route exact path="/collections" component={CollectionsPage} />
              <Route exact path="/works" component={AllProductsPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/localstores" component={LocalStorePage} />
              <Route component={NotFoundPage} />
            </Switch> */}
            <Route
              exact
              path="/"
              render={() =>
                this.props.isInitialLoad ? (
                  <Redirect to="/welcome" />
                ) : (
                  <HomePage />
                )
              }
            />
            {routes.map(({ path, Component }) => {
              return (
                <Route key={path} exact path={path}>
                  {({ match }) => (
                    <CSSTransition
                      in={match != null}
                      timeout={1500}
                      classNames="Page"
                      unmountOnExit
                    >
                      <div className="Page">
                        <Component />
                      </div>
                    </CSSTransition>
                  )}
                </Route>
              );
            })}
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
    products: state.products,
    isInitialLoad: state.isInitialLoad
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
