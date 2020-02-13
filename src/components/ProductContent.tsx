import React, { Component } from "react";
import TextureDisplacement from "./TextureDisplacement";
import Charming from "react-charming";
import Fade from "react-reveal/Fade";
import ProductOverlay from "./ProductOverlay";
import { isMobile, isBrowser } from "react-device-detect";
import { Link } from "react-router-dom";
import Product from "../types/Product";
import Checkout from "../types/Checkout";
import { AppActions } from "../types/actions";
import { AppState } from "../store/store";
import { Dispatch } from "redux";

interface ProductContentProps {
  onLoad: () => void;
  product: Product;
  checkout: Checkout;
  addToCart: (
    variantId: string,
    quantity: string,
    checkoutId: string
  ) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => void;
  toggleCart: () => AppActions;
}

class ProductContent extends Component<ProductContentProps> {
  componentDidMount() {
    this.props.onLoad();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.props.onLoad();
    }
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
      <div className="product-page">
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
                {/* <img src={product.images[0].src} alt="product" /> */}
                <TextureDisplacement
                  image={product.images[0].src}
                  handle={product.handle}
                  size="default"
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
          <div className="Product-reveal">
            {product.images.map((image, index) => {
              if (index !== 0 && index !== 1) {
                return (
                  <Fade key={index}>
                    <img src={image.src} alt="product" />
                  </Fade>
                );
              }
            })}
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
                        "1",
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
    );
  }
}

export default ProductContent;
