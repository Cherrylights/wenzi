import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleCart, toggleMenu } from "../actions/actions";

class Nav extends Component {
  render() {
    const { toggleCart, toggleMenu } = this.props;
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
      <nav className="TopNav">
        <span onClick={toggleMenu} className="TopNav__item">
          Menu
        </span>
        <span onClick={toggleCart} className="TopNav__item">
          Cart <span>{cartQuantity}</span>
        </span>
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
  { toggleCart, toggleMenu }
)(Nav);
