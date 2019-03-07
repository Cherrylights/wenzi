import React, { Component } from "react";
import { connect } from "react-redux";
import LineItem from "./LineItem";

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
      <div className={`Cart ${this.props.isCartOpen ? "Cart--open" : ""}`}>
        <header className="Cart__header">
          <h2>Your cart</h2>
          <button onClick={this.props.handleCartClose} className="Cart__close">
            ×
          </button>
        </header>
        <ul className="Cart__line-items">{lineItems}</ul>
        <footer className="Cart__footer">
          <div className="Cart-info clearfix">
            <div className="Cart-info__total Cart-info__small">Subtotal</div>
            <div className="Cart-info__pricing">
              <span className="pricing">$ {checkout.subtotalPrice}</span>
            </div>
          </div>
          <div className="Cart-info clearfix">
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
          </div>
          <button className="Cart__checkout button" onClick={this.openCheckout}>
            Checkout
          </button>
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
