import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { loadFeaturedProducts, updateIndex } from "../actions/actions";
import FilterDisplacement from "./FilterDisplacement";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.prevProduct = this.prevProduct.bind(this);
    this.nextProduct = this.nextProduct.bind(this);
  }

  componentDidMount() {
    this.props.loadFeaturedProducts();
  }

  render() {
    const { featuredProducts, currentIndex } = this.props;
    const currentProduct = featuredProducts[currentIndex];
    let currentProductMaterial,
      currentProductSize,
      currentProductPrice,
      currentProductAspectRatio;
    if (currentProduct) {
      currentProductMaterial = currentProduct.variants[0].selectedOptions.filter(
        option => option.name === "Material"
      )[0].value;
      currentProductSize = currentProduct.variants[0].selectedOptions.filter(
        option => option.name === "Size"
      )[0].value;
      currentProductPrice = currentProduct.variants[0].price;
      currentProductAspectRatio = parseInt(
        currentProduct.variants[0].selectedOptions.filter(
          option => option.name === "Aspect Ratio"
        )[0].value,
        10
      );
    }

    return (
      <div className={`home-page transition-item ${isMobile ? "mobile" : ""}`}>
        <div className="FeaturedProducts FeaturedProducts--alignCenter">
          <h1 className="FeaturedProducts__title">
            {currentProduct ? currentProduct.title : ""}
          </h1>
          <div className="FeaturedProducts__image">
            {currentProduct ? (
              <Link to={`/work/${currentProduct.handle}`}>
                <FilterDisplacement
                  image={currentProduct.images[0].src}
                  handle={currentProduct.handle}
                  aspectRatio={currentProductAspectRatio}
                />
              </Link>
            ) : (
              <img
                src="/assets/images/product-placeholder.jpg"
                className="placeholder-img"
                alt="place-holder"
              />
            )}
          </div>
          <div className="FeaturedProducts__desc">
            {currentProduct ? (
              <React.Fragment>
                <span>{currentProductMaterial}</span>
                <span>{currentProductSize}</span>
                <span>${currentProductPrice}</span>
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
          <button onClick={this.prevProduct}>Prev</button>
          <button onClick={this.nextProduct}>Next</button>
        </div>
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
