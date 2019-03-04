import React, { Component } from "react";
import { connect } from "react-redux";
import { prevProduct, nextProduct, loadFeaturedProducts } from "../actions";
import FeaturedProduct from "./FeaturedProduct";

class HomePage extends Component {
  componentDidMount() {
    this.props.loadFeaturedProducts();
  }

  render() {
    console.log(this.props.featuredProducts);
    const {
      featuredProducts,
      currentIndex,
      prevProduct,
      nextProduct
    } = this.props;
    if (featuredProducts[currentIndex.toString()]) {
      console.log(featuredProducts[currentIndex.toString()].images[0].src);
    }

    return (
      <div className="transition-item">
        <FeaturedProduct
          handle={
            featuredProducts[currentIndex.toString()]
              ? featuredProducts[currentIndex.toString()].handle
              : "longevity"
          }
          src={
            featuredProducts[currentIndex.toString()]
              ? featuredProducts[currentIndex.toString()].images[0].src
              : "/images/product-placeholder.jpg"
          }
        />
        <button onClick={prevProduct}>Prev</button>
        <button onClick={nextProduct}>Next</button>
      </div>
    );
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
  { prevProduct, nextProduct, loadFeaturedProducts }
)(HomePage);
