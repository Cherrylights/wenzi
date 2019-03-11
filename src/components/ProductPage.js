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
    return (
      <div className="transition-item">
        {product.hasOwnProperty("images") ? (
          <React.Fragment>
            <TextureDisplacement
              image={product.images[0].src}
              handle={product.handle}
            />
            <p>{product.title}</p>
            <p>{product.images[0].src}</p>
          </React.Fragment>
        ) : (
          <img src="/assets/images/product-placeholder.jpg" alt="placeholder" />
        )}
        {product.hasOwnProperty("images") ? (
          <React.Fragment>
            <div className="Product-info">
              <TextureDisplacement
                image={product.images[0].src}
                handle={product.handle}
                size="small"
                aspectRatio={parseInt(
                  product.variants[0].selectedOptions.filter(
                    option => option.name === "Aspect Ratio"
                  )[0].value,
                  10
                )}
              />
              <h2 className="Product-info__title">{product.title}</h2>
              <p className="Product-info__description">{product.description}</p>
            </div>
            <button
              onClick={() => {
                // console.log(product.variants[0].id, checkout.id);
                this.props.addToCart(product.variants[0].id, 1, checkout.id);
              }}
            >
              Add to Cart
            </button>
          </React.Fragment>
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
