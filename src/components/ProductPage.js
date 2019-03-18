import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadProduct,
  unloadProduct,
  addToCart,
  toggleCart
} from "../actions/actions";
import TextureDisplacement from "./TextureDisplacement";

class ProductPage extends Component {
  componentDidMount() {
    this.props.loadProduct(this.props.match.params.handle);
  }

  render() {
    const { product, checkout } = this.props;
    let productPrice, productAspectRatio;
    let productMarkup;

    if (product.hasOwnProperty("images")) {
      productPrice = product.variants[0].price;
      productAspectRatio = parseInt(
        product.variants[0].selectedOptions.filter(
          option => option.name === "Aspect Ratio"
        )[0].value,
        10
      );
      productMarkup = { __html: product.descriptionHtml };
    }
    return (
      <div className="product-page transition-item">
        {product.hasOwnProperty("images") ? (
          <div className="Product-hero">
            <div>
              <h1 className="Product-hero__title">{product.title}</h1>
              <div className="Product-hero__image">
                <TextureDisplacement
                  image={product.images[0].src}
                  handle={product.handle}
                  size="default"
                  aspectRatio={productAspectRatio}
                />
                <div style={{ height: "36px" }} />
              </div>
              <div className="Product-hero__scroll">
                <span className="Product-hero__discover">Discover</span>
                <div className="Product-hero__line" />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {product.hasOwnProperty("images") ? (
          <div
            className="Product-info"
            dangerouslySetInnerHTML={productMarkup}
          />
        ) : (
          ""
        )}
        {product.hasOwnProperty("images") ? (
          <div className="Product-gallery">
            <img src={product.images[0].src} alt="product" />
          </div>
        ) : (
          ""
        )}
        {product.hasOwnProperty("images") ? (
          <div className="Product-checkout">
            <div className="Product-checkout__image">
              <img src={product.images[0].src} alt="product" />
            </div>
            <div className="Product-checkout__info">
              <h1 className="Product-checkout__title">{product.title}</h1>
              <div
                className="Product-checkout__params"
                dangerouslySetInnerHTML={productMarkup}
              />
              <button
                className="Product-checkout__button"
                onClick={() => {
                  this.props.addToCart(product.variants[0].id, 1, checkout.id);
                  this.props.toggleCart();
                }}
              >
                <span>Add to Cart</span>
                <span className="dollar">$</span>
                <span>{productPrice}</span>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }

  componentWillUnmount() {
    this.props.unloadProduct();
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
)(ProductPage);
