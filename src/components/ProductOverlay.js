import React, { Component } from "react";
import { TweenMax } from "gsap/TweenMax";

export default class ProductOverlay extends Component {
  constructor(props) {
    super(props);
    this.overlay = React.createRef();
  }

  componentDidMount() {
    TweenMax.to(this.overlay.current, 2, {
      opacity: 0,
      ease: "Power1.easeOut"
    });
  }

  render() {
    const { product } = this.props;
    return (
      <img
        src={product.images[0].src}
        alt="product"
        ref={this.overlay}
        className="Product-hero__overlay"
      />
    );
  }
}
