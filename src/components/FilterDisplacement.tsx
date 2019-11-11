import React, { Component } from "react";
import initFilter from "../utils/shockWaveFilter";

interface FilterDisplacementProps {
  image: string;
  handle: string;
  size: string;
}

class FilterDisplacement extends Component<FilterDisplacementProps> {
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
