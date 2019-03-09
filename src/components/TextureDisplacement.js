import React, { Component } from "react";
import initFilter from "../displacementFilter";

class TextureDisplacement extends Component {
  constructor(props) {
    super(props);
    this.initFilter = null;
    if (this.props.size === "default") {
      this.wrapperId = `canvas-${this.props.handle}`;
    } else {
      this.wrapperId = `canvas-${this.props.handle}-small`;
    }
  }

  componentDidMount() {
    this.initFilter = initFilter(this.props.image, this.wrapperId);
    this.initFilter.startAnimation();
  }

  componentWillUnmount() {
    this.initFilter.removeScene();
  }
  render() {
    return <div id={this.wrapperId} />;
  }
}

export default TextureDisplacement;

TextureDisplacement.defaultProps = {
  image: "/assets/images/product-placeholder.jpg",
  handle: "default",
  size: "default"
};
