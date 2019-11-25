import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className="notFound-page transition-item">
        <div className="NotFound">
          <img src="/assets/images/not-found.png" alt="not-found" />
          <h1 className="NotFound__text">Sorry, we are lost</h1>
          <p>
            But, you'll always find your way back{" "}
            <Link to="/" style={{ textDecoration: "underline" }}>
              home
            </Link>
          </p>
        </div>
      </div>
    );
  }
}
