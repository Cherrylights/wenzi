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
// Components
import ErrorBounday from "./ErrorBoundary";
import Menu from "./Menu";
import Nav from "./Nav";
import Overlay from "./Overlay";
import Cart from "./Cart";
// Pages
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CollectionsPage from "./pages/CollectionsPage";
import AllProductsPage from "./pages/AllProductsPage";
import AboutPage from "./pages/AboutPage";
import LocalStorePage from "./pages/LocalStorePage";
import CarouselPage from "./pages/CarouselPage";
// import AllWorkPage from ".pages/AllWorkPage";
// import NotFoundPage from "./pages/NotFoundPage";

const routes = [
  // { path: "/", Component: HomePage },
  // { path: "/welcome", Component: CarouselPage },
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
            <Route
              exact
              path="/"
              render={({ match }) =>
                this.props.isInitialLoad ? (
                  <Redirect to="/welcome" />
                ) : (
                  <CSSTransition
                    in={match != null}
                    timeout={1500}
                    classNames="Page"
                    unmountOnExit
                    exit={true}
                  >
                    <div className="Page">
                      <HomePage />
                    </div>
                  </CSSTransition>
                )
              }
            />
            {/* <Route exact path="/">
              {({ match }) => {
                if (this.props.isInitialLoad) {
                  return <Redirect to="/welcome" />;
                } else {
                  return (
                    <CSSTransition
                      in={match != null}
                      timeout={1500}
                      classNames="Page"
                      unmountOnExit
                      exit={true}
                    >
                      <div className="Page">
                        <HomePage />
                      </div>
                    </CSSTransition>
                  );
                }
              }}
            </Route> */}
            <Route exact path="/welcome">
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={1500}
                  classNames="Page"
                  unmountOnExit
                  exit={true}
                >
                  <div className="Page">
                    <CarouselPage />
                  </div>
                </CSSTransition>
              )}
            </Route>

            {routes.map(({ path, Component }) => {
              return (
                <Route key={path} exact path={path}>
                  {({ match }) => (
                    <CSSTransition
                      in={match != null}
                      timeout={1500}
                      classNames="Page"
                      unmountOnExit
                      exit={false}
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
