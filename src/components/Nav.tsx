import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleCart, toggleMenu } from "../actions/actions";
import Checkout from "../types/Checkout";
import { AppActions } from "../types/actions";
import { AppState } from "../store/store";

type NavProps = LinkStateProps & LinkDispatchProps;

class Nav extends Component<NavProps> {
  render() {
    const { toggleCart, toggleMenu, checkout } = this.props;
    const isCartOpen: string = this.props.isCartOpen.toString();
    // set up the cart quantity
    let cartQuantity;
    if (checkout.lineItems && checkout.lineItems.length > 0) {
      cartQuantity = checkout.lineItems.reduce((accumulator, lineItem) => {
        return accumulator + lineItem.quantity;
      }, 0);
    } else {
      cartQuantity = 0;
    }

    return (
      <nav className="TopNav">
        <button
          onClick={toggleMenu}
          className="TopNav__item Menu-button"
          tabIndex={0}
          aria-label="Open Menu"
          aria-haspopup="true"
        >
          <span tabIndex={-1}>
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
          </span>
        </button>
        <button
          onClick={toggleCart}
          className="TopNav__item Cart-button"
          aria-label="Open Shopping Cart"
          aria-haspopup="true"
          aria-expanded={isCartOpen as any}
        >
          <span tabIndex={-1}>
            Cart
            <span
              className="Cart-button__quantity-number"
              aria-label="Cart Quantity"
            >
              {cartQuantity}
            </span>
          </span>
        </button>
      </nav>
    );
  }
}

interface LinkStateProps {
  checkout: Checkout;
  isCartOpen: boolean;
}

interface LinkDispatchProps {
  toggleCart: () => AppActions;
  toggleMenu: () => AppActions;
}

function mapStateToProps(state: AppState) {
  return {
    checkout: state.checkout,
    isCartOpen: state.isCartOpen
  };
}

export default connect(mapStateToProps, { toggleCart, toggleMenu })(Nav);
