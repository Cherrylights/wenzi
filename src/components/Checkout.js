import React, { Component } from "react";
import { connect } from "react-redux";

class Checkout extends Component {
  render() {
    const { checkout } = this.props;
    // const lineItems = checkout.lineItems.map(lineItem => (
    //   <LineItem
    //       key={lineItem.id.toString()}
    //       lineItem={lineItem}
    //   />
    // ))
    return (
      <div>
        <h1>Checkout</h1>
        <ul className="cart-line-items">{/* {lineItems} */}</ul>
        <footer className="cart-footer">
          <div className="cart-info clearfix">
            <div className="cart-info-total cart-info-small">Subtotal</div>
            <div className="cart-info-pricing">
              <span className="pricing">$ {checkout.subtotalPrice}</span>
            </div>
          </div>
          <div className="cart-info clearfix">
            <div className="cart-info-total cart-info-small">Taxes</div>
            <div className="cart-info-pricing">
              <span className="pricing">$ {checkout.totalTax}</span>
            </div>
          </div>
          <div className="cart-info clearfix">
            <div className="cart-info-total cart-info-small">Total</div>
            <div className="cart-info-pricing">
              <span className="pricing">$ {checkout.totalPrice}</span>
            </div>
          </div>
          <button className="cart__checkout button">Checkout</button>
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
