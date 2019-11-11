import React, { Component } from "react";
import { Link } from "react-router-dom";

interface ProductImageWidthLinkProps {
  handle: string;
  src: string;
}

class ProductImageWithLink extends Component<ProductImageWidthLinkProps> {
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
