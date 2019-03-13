import React, { Component } from "react";
import { connect } from "react-redux";
import { loadProduct, unloadProduct, addToCart } from "../actions/actions";
import TextureDisplacement from "./TextureDisplacement";

class ProductPage extends Component {
  componentDidMount() {
    this.props.loadProduct(this.props.match.params.handle);
  }

  render() {
    const { product, checkout } = this.props;
    let productMaterial, productSize, productPrice, productAspectRatio;

    if (product.hasOwnProperty("images")) {
      productMaterial = product.variants[0].selectedOptions.filter(
        option => option.name === "Material"
      )[0].value;
      productSize = product.variants[0].selectedOptions.filter(
        option => option.name === "Size"
      )[0].value;
      productPrice = product.variants[0].price;
      productAspectRatio = parseInt(
        product.variants[0].selectedOptions.filter(
          option => option.name === "Aspect Ratio"
        )[0].value,
        10
      );
    }
    return (
      <div className="product-page transition-item">
        <div className="Product-hero Product-hero--alignCenter">
          {product.hasOwnProperty("images") ? (
            <div className="Product-hero__image">
              <TextureDisplacement
                image={product.images[0].src}
                handle={product.handle}
                size="default"
                aspectRatio={productAspectRatio}
              />
            </div>
          ) : (
            <img
              src="/assets/images/product-placeholder.jpg"
              alt="placeholder"
            />
          )}
        </div>
        {product.hasOwnProperty("images") ? (
          <div className="Product-checkout">
            <div className="Product-checkout__image">
              <img src={product.images[0].src} alt="product" />
            </div>
            <div className="Product-checkout__info">
              <h1 className="Product-checkout__title">{product.title}</h1>
              <p className="Product-checkout__parameter">{`${productMaterial} — ${productSize}`}</p>
              <p className="Product-checkout__desc">{product.description}</p>
            </div>
            <button
              className="Product-checkout__button"
              onClick={() => {
                // console.log(product.variants[0].id, checkout.id);
                this.props.addToCart(product.variants[0].id, 1, checkout.id);
              }}
            >
              <span>Add to Cart</span>
              <span className="dollar">$</span>
              <span>{productPrice}</span>
            </button>
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
  { loadProduct, unloadProduct, addToCart }
)(ProductPage);
