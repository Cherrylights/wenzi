import React, { Component } from "react";
import { connect } from "react-redux";
import { loadFeaturedProducts, updateIndex } from "../actions/actions";
import ProductImageWithLink from "./ProductImageWithLink";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.prevProduct = this.prevProduct.bind(this);
    this.nextProduct = this.nextProduct.bind(this);
    this.state = {
      currentIndex: 0
    };
  }

  componentDidMount() {
    this.props.loadFeaturedProducts();
  }

  render() {
    const { featuredProducts, currentIndex } = this.props;

    return (
      <div className="transition-item">
        <ProductImageWithLink
          handle={
            featuredProducts[currentIndex]
              ? featuredProducts[currentIndex].handle
              : "longevity"
          }
          src={
            featuredProducts[currentIndex]
              ? featuredProducts[currentIndex].images[0].src
              : "/assets/images/product-placeholder.jpg"
          }
        />
        <button onClick={this.prevProduct}>Prev</button>
        <button onClick={this.nextProduct}>Next</button>
      </div>
    );
  }

  prevProduct() {
    if (this.props.featuredProducts[this.props.currentIndex]) {
      const { updateIndex, featuredProducts, currentIndex } = this.props;
      const total = featuredProducts.length - 1;
      if (currentIndex === 0) {
        updateIndex(total);
      } else {
        updateIndex(currentIndex - 1);
      }
    } else {
      return;
    }
  }

  nextProduct() {
    if (this.props.featuredProducts[this.props.currentIndex]) {
      const { updateIndex, featuredProducts, currentIndex } = this.props;
      const total = featuredProducts.length - 1;
      if (currentIndex === total) {
        updateIndex(0);
      } else {
        updateIndex(currentIndex + 1);
      }
    } else {
      return;
    }
  }
}

function mapStateToProps(state) {
  return {
    featuredProducts: state.featuredProducts,
    currentIndex: state.currentIndex
  };
}

export default connect(
  mapStateToProps,
  { updateIndex, loadFeaturedProducts }
)(HomePage);
