import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import PageTransition from "react-router-page-transition";
import Nav from "./Nav";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import CollectionsPage from "./CollectionsPage";
import Checkout from "./Checkout";

class App extends Component {
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
            <Route path="/work/:productId" component={ProductPage} />
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

export default App;
