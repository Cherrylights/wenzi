import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { isMobile, isMobileOnly } from "react-device-detect";
// Redux
import {
  loadProducts,
  loadAvailableProducts,
  loadCollections,
  createCheckout,
  fetchCheckout
} from "../actions/actions";
import { CSSTransition } from "react-transition-group";
// Components
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
// Types
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/actions";
import { bindActionCreators } from "redux";
import Product from "../types/Product";
import { AppState } from "../store/store";
// import AllWorkPage from ".pages/AllWorkPage";
// import NotFoundPage from "./pages/NotFoundPage";

type Props = LinkStateProps & LinkDispatchProps;

const routes = [
  // { path: "/", Component: HomePage },
  // { path: "/welcome", Component: CarouselPage },
  { path: "/work/:handle", Component: ProductPage },
  { path: "/collections", Component: CollectionsPage },
  { path: "/works", Component: AllProductsPage },
  { path: "/about", Component: AboutPage },
  { path: "/localstores", Component: LocalStorePage }
];

class App extends Component<Props> {
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
                  <main className="Page">
                    <HomePage />
                  </main>
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
                    <main className="Page">
                      <Component />
                    </main>
                  </CSSTransition>
                )}
              </Route>
            );
          })}
          <Menu />
          <Cart />
        </div>
      </BrowserRouter>
    );
  }
}

interface LinkStateProps {
  products: Product[];
  isInitialLoad: boolean;
}

interface LinkDispatchProps {
  loadProducts: () => void;
  loadAvailableProducts: () => void;
  loadCollections: () => void;
  createCheckout: () => void;
  fetchCheckout: (checkoutId: string) => void;
}

function mapStateToProps(state: AppState) {
  return {
    products: state.products,
    isInitialLoad: state.isInitialLoad
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AppActions>) {
  return {
    loadProducts: bindActionCreators(loadProducts, dispatch),
    loadAvailableProducts: bindActionCreators(loadAvailableProducts, dispatch),
    loadCollections: bindActionCreators(loadCollections, dispatch),
    createCheckout: bindActionCreators(createCheckout, dispatch),
    fetchCheckout: bindActionCreators(fetchCheckout, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
