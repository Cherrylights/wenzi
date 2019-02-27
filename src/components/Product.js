import React, { Component } from "react";
import initFilter from "../displacementFilter";

class Product extends Component {
  constructor(props) {
    super(props);
    this.initFilter = null;
  }

  componentDidMount() {
    this.initFilter = initFilter();
    this.initFilter.startAnimation();
  }

  componentWillUnmount() {
    this.initFilter.removeScene();
  }
  render() {
    return (
      <div className="transition-item">
        <div id="product-hero" />
      </div>
    );
  }
}

export default Product;
