import React, { Component } from "react";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import { withRouter } from "react-router";
import {
  loadProduct,
  unloadProduct,
  addToCart,
  toggleCart
} from "../actions/actions";
import SmoothScroll from "./SmoothScroll";
import ProductContent from "./ProductContent";

class ProductPage extends Component {
  componentDidMount() {
    this.props.loadProduct(this.props.match.params.handle);
  }

  componentWillUnmount() {
    this.props.unloadProduct();
  }

  render() {
    const { product, checkout, addToCart, toggleCart } = this.props;
    return (
      <div className="product-page">
        {isMobile ? (
          <ProductContent
            product={product}
            checkout={checkout}
            addToCart={addToCart}
            toggleCart={toggleCart}
            onLoad={() => {
              return;
            }}
          />
        ) : (
          <SmoothScroll
            render={onLoad => (
              <ProductContent
                product={product}
                checkout={checkout}
                addToCart={addToCart}
                toggleCart={toggleCart}
                onLoad={onLoad}
              ></ProductContent>
            )}
          ></SmoothScroll>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product,
    checkout: state.checkout
  };
}

export default connect(
  mapStateToProps,
  { loadProduct, unloadProduct, addToCart, toggleCart }
)(withRouter(ProductPage));
