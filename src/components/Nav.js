import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/collections">Collections</Link>
          </li>
          <li>
            <Link to="/">Wenzi</Link>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
