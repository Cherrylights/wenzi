import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="transition-item">
        <div className="carousel">
          <Link to="/work/1">
            <img src="/images/1.jpg" alt="scarf" />
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
