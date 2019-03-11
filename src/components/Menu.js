import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <Link to="/" className="Menu__link">
          Home
        </Link>
        <Link to="/work" className="Menu__link">
          All Work
        </Link>
        <Link to="/collections" className="Menu__link">
          Collections Archive
        </Link>
        <Link to="/about" className="Menu__link">
          About
        </Link>
        <Link to="/localstore" className="Menu__link">
          Find in Store
        </Link>
      </div>
    );
  }
}

export default Menu;
