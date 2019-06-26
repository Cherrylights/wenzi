import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.log("Error: ", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 className="error-message">
          Oops, there is an error. Please refresh your screen and try again.
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
