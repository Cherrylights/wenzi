import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageTransition from "react-router-page-transition";
import Nav from "./Nav";
import Home from "./Home";
import Product from "./Product";
import Collections from "./Collections";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          render={({ location }) => (
            <React.Fragment>
              <Nav />
              <PageTransition timeout={5000}>
                <Switch location={location}>
                  <Route exact path="/" render={() => <Home />} />
                  <Route path="/work/:productId" render={() => <Product />} />
                  <Route
                    exact
                    path="/collections"
                    render={() => <Collections />}
                  />
                </Switch>
              </PageTransition>
            </React.Fragment>
          )}
        />
      </BrowserRouter>
    );
  }
}

export default App;
