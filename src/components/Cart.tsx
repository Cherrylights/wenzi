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
  cartRef;
  focusableEls;
  firstFocusableEl;
  lastFocusableEl;
  focusedElBeforeOpen;
  constructor(props: CartProps) {
    super(props);
    this.cartRef = React.createRef();
  }

  componentDidMount() {
    this.initFocusableEls();
  }

  componentDidUpdate(prevProps: CartProps) {
    //Set scroll-lock on the body element and accessibility manipulation
    if (prevProps.checkout !== this.props.checkout) {
      this.initFocusableEls();
    }
    if (this.props.isCartOpen !== prevProps.isCartOpen) {
      if (this.props.isCartOpen) {
        document.body.classList.toggle("scrollLock", true);
        this.cartRef.current.style.visibility = "initial";
        this.focusedElBeforeOpen = document.activeElement;
        // focus on the span element inside the button (which it's set to outline:none) so although the button is focused but user still won't see the outline
        this.firstFocusableEl &&
          this.firstFocusableEl.querySelector("span").focus();
      } else {
        document.body.classList.remove("scrollLock");
        if (this.focusedElBeforeOpen) {
          this.focusedElBeforeOpen.querySelector("span").focus();
        }
        setTimeout(() => {
          this.cartRef.current.style.visibility = "hidden";
        }, 1000);
      }
    }
  }

  initFocusableEls = () => {
    this.focusableEls = [
      ...this.cartRef.current.querySelectorAll("button:not([disabled])")
    ];
    this.firstFocusableEl = this.focusableEls[0];
    this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
  };

  openCheckout = () => {
    window.open(this.props.checkout.webUrl);
  };

  handleKeyDown = e => {
    const KEY_TAB = 9;
    const KEY_ESC = 27;

    const handleBackwardTab = () => {
      if (document.activeElement === this.firstFocusableEl) {
        e.preventDefault();
        this.lastFocusableEl.focus();
      }
    };

    const handleForwardTab = () => {
      if (document.activeElement === this.lastFocusableEl) {
        e.preventDefault();
        this.firstFocusableEl.focus();
      }
    };

    switch (e.keyCode) {
      case KEY_TAB: {
        if (this.focusableEls.length === 1) {
          e.preventDefault();
          break;
        }
        if (e.shiftKey) {
          handleBackwardTab();
        } else {
          handleForwardTab();
        }
        break;
      }
      case KEY_ESC: {
        this.props.toggleCart();
        break;
      }
      default: {
        break;
      }
    }
  };

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
      <div
        ref={this.cartRef}
        className={`Cart${isCartOpen ? " Cart--open" : ""}`}
        role="dialog"
        aria-hidden={isCartOpen ? "false" : "true"}
        aria-labelledby="cart-title"
        onKeyDown={this.handleKeyDown}
      >
        <h1 id="cart-title" className="sr-only">
          Cart
        </h1>
        <p id="cart-description" className="sr-only">
          Your shopping cart list
        </p>
        <div className="Cart__container">
          <div className="Cart__header">
            <button onClick={toggleCart} className="Cart__close">
              <span tabIndex={-1}>×</span>
            </button>
            <p className="Cart__titleText">Your Cart</p>
          </div>
          {isCartEmpty ? (
            <p className="Cart__empty">Your cart is currently empty.</p>
          ) : (
            <ul className={`Cart__line-items ${isMobileOnly ? "mobile" : ""}`}>
              {lineItems}
            </ul>
          )}
          <div className="Cart__footer">
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
          </div>
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

export default connect(mapStateToProps, { toggleCart })(Cart);
