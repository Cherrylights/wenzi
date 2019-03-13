import React, { Component } from "react";
import { connect } from "react-redux";
import { updateLineItems, removeLineItems } from "../actions/actions";

class LineItem extends Component {
  constructor(props) {
    super(props);

    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
  }

  decrementQuantity() {
    // From props passed down from parent element
    const { lineItem, checkoutId } = this.props;
    let updatedQuantity;
    if (parseInt(lineItem.quantity, 10) === 0) {
      updatedQuantity = 0;
    } else {
      updatedQuantity = lineItem.quantity - 1;
    }

    this.props.updateLineItems(lineItem.id, updatedQuantity, checkoutId);
  }

  incrementQuantity() {
    // From props passed down from parent element
    const { lineItem, checkoutId } = this.props;
    let updatedQuantity = lineItem.quantity + 1;
    this.props.updateLineItems(lineItem.id, updatedQuantity, checkoutId);
  }

  removeLineItemInCart() {
    const { lineItem, checkoutId } = this.props;
    this.props.removeLineItems(lineItem.id, checkoutId);
  }

  render() {
    const { lineItem } = this.props;
    let lineItemMaterial, lineItemSize;
    if (lineItem.hasOwnProperty("variant")) {
      lineItemMaterial = lineItem.variant.selectedOptions.filter(
        option => option.name === "Material"
      )[0].value;
      lineItemSize = lineItem.variant.selectedOptions.filter(
        option => option.name === "Size"
      )[0].value;
    }

    return (
      <li className="Line-item">
        <div className="Line-item__img">
          {lineItem.variant.image ? (
            <img
              src={lineItem.variant.image.src}
              alt={`${lineItem.title} product shot`}
            />
          ) : null}
        </div>
        <div className="Line-item__content">
          <div className="Line-item__content-row">
            <p className="Line-item__title">{lineItem.title}</p>
            <span
              className="Line-item__remove"
              onClick={this.removeLineItemInCart}
            >
              ×
            </span>
          </div>
          <div className="Line-item__content-row">
            <div className="Line-item__variant-title">
              <span>{lineItemMaterial}</span> <span>{lineItemSize}</span>
            </div>
          </div>
          <div className="Line-item__content-row">
            <div className="Line-item__quantity-container">
              <span
                className="Line-item__quantity-update"
                onClick={this.decrementQuantity}
              >
                -
              </span>
              <span className="Line-item__quantity">{lineItem.quantity}</span>
              <span
                className="Line-item__quantity-update"
                onClick={this.incrementQuantity}
              >
                +
              </span>
            </div>
            <span className="Line-item__price">
              $ {(lineItem.quantity * lineItem.variant.price).toFixed(2)}
            </span>
          </div>
        </div>
      </li>
    );
  }
}

export default connect(
  null,
  {
    updateLineItems,
    removeLineItems
  }
)(LineItem);
