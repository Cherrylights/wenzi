import React, { Component } from "react";
import { connect } from "react-redux";
import { isMobile, isBrowser } from "react-device-detect";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import {
  loadProduct,
  unloadProduct,
  addToCart,
  toggleCart
} from "../actions/actions";
import TextureDisplacement from "./TextureDisplacement";
import Charming from "react-charming";
import ProductOverlay from "./ProductOverlay";
import SmoothScroll from "../utils/SmoothScroll";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.smooth = undefined;
  }
  componentDidMount() {
    this.props.loadProduct(this.props.match.params.handle);
    document.body.style.cssText = "";
    // if (isBrowser) {
    //   new SmoothScroll();
    // }
    // console.log("product page did mount");
  }

  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      document.body.style.cssText = "";
      // warning: make sure don't initiate multiple instances, otherwise will register unnecessary events handlers
      if (isBrowser) {
        if (this.smooth) {
          return;
        }
        this.smooth = new SmoothScroll("product-page");
      }
    }
    // console.log("product page did update");
  }

  componentWillUnmount() {
    this.props.unloadProduct();
    this.smooth.destroy();
  }

  render() {
    const { product, checkout } = this.props;
    let productPrice;
    let productMarkup;

    if (product.hasOwnProperty("images")) {
      productPrice = product.variants[0].price;
      productMarkup = { __html: product.descriptionHtml };
    }
    return (
      <div className="product-page" data-scroll>
        <div
          className="product-page-content smooth-scroll-content"
          data-scroll-content
        >
          {product.hasOwnProperty("images") ? (
            <div className="Product-hero">
              <div>
                <Charming
                  letters={product.title}
                  render={letters => (
                    <h1 className="Product-hero__title charming">{letters}</h1>
                  )}
                />
                {/* <h1 className="Product-hero__title">{product.title}</h1> */}
                <div className="Product-hero__image">
                  {isMobile ? (
                    <img src={product.images[0].src} alt="product" />
                  ) : (
                    <div>
                      <ProductOverlay product={product} />
                      <TextureDisplacement
                        image={product.images[0].src}
                        handle={product.handle}
                        size="default"
                      />
                    </div>
                  )}

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
              {isMobile ? (
                <img src={product.images[0].src} alt="product" />
              ) : (
                <img src={product.images[1].src} alt="product" />
              )}
            </div>
          ) : (
            ""
          )}
          {product.hasOwnProperty("images") ? (
            <div className="Product-checkout">
              <div className="Product-checkout__wrapper">
                <div className="Product-checkout__image">
                  <img src={product.images[1].src} alt="product" />
                </div>
                <div className="Product-checkout__info">
                  <h1 className="Product-checkout__title">{product.title}</h1>
                  <div
                    className="Product-checkout__params"
                    dangerouslySetInnerHTML={productMarkup}
                  />
                  {product.availableForSale ? (
                    <button
                      className="Product-checkout__buyButton"
                      onClick={() => {
                        this.props.addToCart(
                          product.variants[0].id,
                          1,
                          checkout.id
                        );
                        this.props.toggleCart();
                      }}
                    >
                      <span>Add to Cart</span>
                      <span className="dollar">$</span>
                      <span>{productPrice}</span>
                    </button>
                  ) : (
                    <button className="Product-checkout__buyButton" disabled>
                      <span>Sold out</span>
                    </button>
                  )}

                  {isBrowser ? (
                    <Link className="Product-checkout__backButton" to="/works">
                      Back to Products
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
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
