import React, { Component } from "react";

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className="notFound-page transition-item">
        <div className="NotFound">
          <img src="/assets/images/not-found.png" alt="not-found" />
          <h1 className="NotFound__text">Page Not Found</h1>
        </div>
      </div>
    );
  }
}
