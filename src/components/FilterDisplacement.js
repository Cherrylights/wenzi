import React, { Component } from "react";
import initFilter from "../utils/shockWaveFilter";

class FilterDisplacement extends Component {
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
  }

  componentDidUpdate(prevProps) {
    if (this.props.image !== prevProps.image) {
      this.initFilter.startAnimation(this.props.image, this.props.handle);
    }
  }

  componentWillUnmount() {
    this.initFilter.removeScene();
  }

  render() {
    return <div id={this.wrapperId} />;
  }
}

export default FilterDisplacement;

FilterDisplacement.defaultProps = {
  image: "/assets/images/product-placeholder.jpg",
  handle: "default",
  size: "default"
};
