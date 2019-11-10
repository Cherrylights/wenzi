import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import HorizontalScroll from "./HorizontalScroll";
import AllProductsContent from "./AllProductsContent";
// import Smooth from "../utils/Smooth";

class AllProducts extends Component {
  render() {
    const { availableProducts } = this.props;
    return (
      <div className="allProducts-page transition-item">
        <MobileView>
          <div className="AvailableProducts">
            <h1 className="AvailableProducts__title">All Products</h1>
            <div className="AvailableProducts__grid">
              {availableProducts.map(product => (
                <div key={product.id}>
                  <Link to={`/work/${product.handle}`}>
                    {product.options[2].values[0].value === "Square" ? (
                      <img
                        src={product.images[0].src}
                        draggable="false"
                        alt="scarf"
                        className="AvailableProducts__image"
                      />
                    ) : (
                      <img
                        src={product.images[2].src}
                        draggable="false"
                        alt="scarf"
                        className="AvailableProducts__image"
                      />
                    )}
                  </Link>
                  <Link to={`/work/${product.handle}`}>
                    <p className="AvailableProducts__name">{product.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </MobileView>
        <BrowserView>
          <HorizontalScroll
            render={onLoad => (
              <AllProductsContent
                availableProducts={availableProducts}
                onLoad={onLoad}
              />
            )}
          ></HorizontalScroll>
        </BrowserView>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    availableProducts: state.availableProducts
  };
}

export default connect(
  mapStateToProps,
  null
)(AllProducts);
