import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductImageWithLink extends Component {
  render() {
    const { handle, src } = this.props;
    return (
      <div>
        <Link to={`/work/${handle}`}>
          <img src={src} alt="scarf" />
        </Link>
      </div>
    );
  }
}

export default ProductImageWithLink;
