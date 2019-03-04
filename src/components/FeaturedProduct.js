import React, { Component } from "react";
import { Link } from "react-router-dom";

class FeaturedProduct extends Component {
  render() {
    const { handle, src } = this.props;
    return (
      <div className="carousel">
        <Link to={`/work/${handle}`}>
          <img src={src} alt="scarf" />
        </Link>
      </div>
    );
  }
}

export default FeaturedProduct;

// Specifies the default values for props:
FeaturedProduct.defaultProps = {
  src: "/images/product-placeholder.jpg",
  id: "#"
};
