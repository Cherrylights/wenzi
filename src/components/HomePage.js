import React, { Component } from "react";
import { connect } from "react-redux";
import { loadFeaturedProducts, updateIndex } from "../actions/actions";
import ProductImageWithLink from "./ProductImageWithLink";
import FilterDisplacement from "./FilterDisplacement";
import { Link } from "react-router-dom";

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
    const currentProduct = featuredProducts[currentIndex];
    return (
      <div className="transition-item">
        <h1>{currentProduct ? currentProduct.title : ""}</h1>
        {/* <ProductImageWithLink
          handle={currentProduct ? currentProduct.handle : "longevity"}
          src={
            currentProduct
              ? currentProduct.images[0].src
              : "/assets/images/product-placeholder.jpg"
          }
        /> */}
        {currentProduct ? (
          <Link to={`/work/${currentProduct.handle}`}>
            <FilterDisplacement
              image={currentProduct.images[0].src}
              handle={currentProduct ? currentProduct.handle : "longevity"}
            />
          </Link>
        ) : (
          <img
            src="/assets/images/product-placeholder.jpg"
            alt="place-holder"
          />
        )}
        <div>
          {currentProduct ? (
            <React.Fragment>
              <span>{currentProduct.variants[0].title.split("/")[0]}</span>
              <span>{currentProduct.variants[0].title.split("/")[1]}</span>
              <span>$ {currentProduct.variants[0].price}</span>
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
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
