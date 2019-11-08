import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleCart, toggleMenu } from "../actions/actions";

class Nav extends Component {
  render() {
    const { toggleCart, toggleMenu } = this.props;
    // set up the cart quantity
    let cartQuantity;
    if (
      this.props.checkout.lineItems &&
      this.props.checkout.lineItems.length > 0
    ) {
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
        <button
          onClick={toggleMenu}
          className="TopNav__item Menu-button"
          tabIndex={0}
          aria-label="menu-button"
        >
          <svg
            width="22px"
            height="14px"
            viewBox="0 0 22 14"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0.11144 L0,0.726824615 L21.5384615,0.726824615 L21.5384615,0.11144 L0,0.11144 Z M0,6.49606154 L0,7.11144615 L21.5384615,7.11144615 L21.5384615,6.49606154 L0,6.49606154 Z M0,12.8806769 L0,13.4960615 L21.5384615,13.4960615 L21.5384615,12.8806769 L0,12.8806769 Z"
              id="Shape"
            />
          </svg>
        </button>
        <button
          onClick={toggleCart}
          className="TopNav__item Cart-button"
          tabIndex={0}
          aria-label="shopping-cart-button"
        >
          Cart
          <span className="Cart-quantity__number">{cartQuantity}</span>
          {/* <span className="Cart-quantity">
            <span className="Cart-quantity__number">{cartQuantity}</span>
            <span className="Cart-quantity__circle" />
          </span> */}
        </button>
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
