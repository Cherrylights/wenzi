import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Nav extends Component {
  render() {
    // set up the cart quantity
    let cartQuantity;
    if (this.props.checkout.lineItems.length > 0) {
      cartQuantity = this.props.checkout.lineItems.reduce(
        (accumulator, lineItem) => {
          return accumulator + lineItem.quantity;
        },
        0
      );
    } else {
      cartQuantity = 0;
    }

    return (
      <nav>
        <ul className="nav">
          <li>
            <Link to="/collections">Collections</Link>
          </li>
          <li>
            <Link to="/">Wenzi</Link>
          </li>
          <li>
            <Link to="/checkout">
              Checkout <span>{cartQuantity}</span>
            </Link>
          </li>
          <li>
            <Link to="/allwork">All Work</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    checkout: state.checkout
  };
}

export default connect(
  mapStateToProps,
  null
)(Nav);
