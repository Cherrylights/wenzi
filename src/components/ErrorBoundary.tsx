import React, { Component } from "react";

interface ErrorBoundaryProps {}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error: ", error);
    console.log("Error Info", errorInfo);
    this.setState({
      hasError: true
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <div className="inner">
            <h1>Something went wrong</h1>
            <p>
              Oops, there is an error. Please refresh your screen and try again.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
