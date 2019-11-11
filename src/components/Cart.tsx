import React, { Component } from "react";
import { connect } from "react-redux";
import LineItem from "./LineItem";
import { isMobileOnly } from "react-device-detect";
import { toggleCart } from "../actions/actions";
import { AppState } from "../store/store";
import Checkout from "../types/Checkout";
import { AppActions } from "../types/actions";

type CartProps = LinkStateProps & LinkDispatchProps;

class Cart extends Component<CartProps> {
  constructor(props: CartProps) {
    super(props);
    this.openCheckout = this.openCheckout.bind(this);
  }

  openCheckout() {
    window.open(this.props.checkout.webUrl);
  }

  componentDidUpdate(prevProps: CartProps) {
    //Set scroll lock on the body element
    if (this.props.isCartOpen !== prevProps.isCartOpen) {
      if (this.props.isCartOpen) {
        document.body.classList.toggle("scrollLock", true);
      } else {
        document.body.classList.remove("scrollLock");
      }
    }
  }
  render() {
    const { checkout, isCartOpen, toggleCart } = this.props;
    const isCartEmpty = checkout.lineItems && checkout.lineItems.length === 0;
    const lineItems =
      checkout.lineItems &&
      checkout.lineItems.map(lineItem => (
        <LineItem
          key={lineItem.id.toString()}
          lineItem={lineItem}
          checkoutId={checkout.id}
        />
      ));
    return (
      <div className={`Cart${isCartOpen ? " Cart--open" : ""}`}>
        <div className="Cart__container">
          {isMobileOnly ? (
            <header className="Cart__header">
              <span onClick={toggleCart} className="Cart__close">
                ×
              </span>
              <p className="Cart__titleText">Your cart</p>
            </header>
          ) : null}
          {isCartEmpty ? (
            <p className="Cart__empty">Your cart is currently empty.</p>
          ) : (
            <ul className={`Cart__line-items ${isMobileOnly ? "mobile" : ""}`}>
              {lineItems}
            </ul>
          )}

          <footer className="Cart__footer">
            <div className="Cart-info clearfix">
              <div className="Cart-info__total">Subtotal</div>
              <div className="Cart-info__pricing">
                <span className="pricing">${checkout.subtotalPrice}</span>
              </div>
            </div>
            {/* <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Taxes</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {checkout.totalTax}</span>
            </div>
          </div>
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Total</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {checkout.totalPrice}</span>
            </div>
          </div> */}
            <p className="h6 grey">Excluding tax + shipping</p>
            <button
              className="Cart__checkoutButton"
              disabled={isCartEmpty}
              onClick={() => {
                toggleCart();
                this.openCheckout();
              }}
            >
              Checkout
            </button>
            {isMobileOnly ? (
              <button className="Cart__continueButton" onClick={toggleCart}>
                Continue Shopping
              </button>
            ) : null}
          </footer>
        </div>
      </div>
    );
  }
}

interface LinkStateProps {
  checkout: Checkout;
  isCartOpen: boolean;
}

interface LinkDispatchProps {
  toggleCart: () => AppActions;
}

function mapStateToProps(state: AppState) {
  return {
    checkout: state.checkout,
    isCartOpen: state.isCartOpen
  };
}

export default connect(
  mapStateToProps,
  { toggleCart }
)(Cart);
