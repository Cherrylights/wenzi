import React, { Component } from "react";
import initFilter from "../utils/displacementFilter";

interface TextureDisplacementProps {
  image: string;
  handle: string;
  size: string;
}

class TextureDisplacement extends Component<TextureDisplacementProps> {
  initFilter;
  wrapperId;
  constructor(props) {
    super(props);
    this.initFilter = null;
    if (this.props.size === "default") {
      this.wrapperId = `canvas-${this.props.handle}`;
    } else {
      this.wrapperId = `canvas-${this.props.handle}-small`;
    }
  }

  static defaultProps = {
    image: "/assets/images/product-placeholder.jpg",
    handle: "default",
    size: "default"
  };

  componentDidMount() {
    this.initFilter = initFilter(this.props.image, this.wrapperId);
    this.initFilter.startAnimation();
  }

  componentDidUpdate(prevProps) {
    if (this.props.image !== prevProps.image) {
      this.initFilter.changeImage(this.props.image);
    }
  }

  componentWillUnmount() {
    this.initFilter.removeScene();
  }
  render() {
    return <div id={this.wrapperId} />;
  }
}

export default TextureDisplacement;
