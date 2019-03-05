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
    console.log(product);
    if (product.hasOwnProperty("images")) {
      console.log(product.images[0].src);
    }
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
          <img src="/images/product-placeholder.jpg" alt="placeholder" />
        )}
        <button
          onClick={() => {
            // console.log(product.variants[0].id, checkout.id);
            this.props.addToCart(product.variants[0].id, 1, checkout.id);
          }}
        >
          Add to Cart
        </button>
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
