import React, { Component } from "react";
import { connect } from "react-redux";
import LineItem from "./LineItem";
import { isMobile } from "react-device-detect";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.openCheckout = this.openCheckout.bind(this);
  }

  openCheckout() {
    window.open(this.props.checkout.webUrl);
  }
  render() {
    const { checkout } = this.props;
    const lineItems = checkout.lineItems.map(lineItem => (
      <LineItem
        key={lineItem.id.toString()}
        lineItem={lineItem}
        checkoutId={checkout.id}
      />
    ));
    return (
      <div
        className={`Cart Cart--open ${
          this.props.isCartOpen ? "Cart--open" : ""
        }`}
      >
        {isMobile ? (
          <header className="Cart__header">
            <span onClick={this.props.handleCartClose} className="Cart__close">
              ×
            </span>
            <p className="Cart__titleText">Your cart</p>
          </header>
        ) : (
          ""
        )}

        <ul className={`Cart__line-items ${isMobile ? "mobile" : ""}`}>
          {lineItems}
        </ul>
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
          <button className="Cart__checkoutButton" onClick={this.openCheckout}>
            Checkout
          </button>
          {isMobile ? (
            <button
              className="Cart__continueButton"
              onClick={this.openCheckout}
            >
              Continue Shopping
            </button>
          ) : (
            ""
          )}
        </footer>
      </div>
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
)(Checkout);
