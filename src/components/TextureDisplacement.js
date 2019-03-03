import React, { Component } from "react";
import initFilter from "../displacementFilter";

class TextureDisplacement extends Component {
  constructor(props) {
    super(props);
    this.initFilter = null;
    this.wrapperId = `canvas-${this.props.name}`;
  }

  componentDidMount() {
    const delayer = new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve(true);
      }, 0);
    });
    delayer.then(() => {
      this.initFilter = initFilter(this.props.image, this.wrapperId);
      this.initFilter.startAnimation();
    });
  }

  componentWillUnmount() {
    this.initFilter.removeScene();
  }
  render() {
    return <div id={this.wrapperId} />;
  }
}

export default TextureDisplacement;
