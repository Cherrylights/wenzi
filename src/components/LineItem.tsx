import React, { Component } from "react";
import { connect } from "react-redux";
import { updateLineItems, removeLineItems } from "../actions/actions";
import { Dispatch, bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/actions";

interface LineItemProps {
  key: string;
  lineItem: any;
  checkoutId: string;
}

type Props = LineItemProps & LinkDispatchProps;

class LineItem extends Component<Props> {
  decrementQuantity = () => {
    // From props passed down from parent element
    const { lineItem, checkoutId } = this.props;
    let updatedQuantity: number;
    if (parseInt(lineItem.quantity, 10) === 0) {
      updatedQuantity = 0;
    } else {
      updatedQuantity = lineItem.quantity - 1;
    }
    this.props.updateLineItems(
      lineItem.id,
      updatedQuantity.toString(),
      checkoutId
    );
  };

  incrementQuantity = () => {
    // From props passed down from parent element
    const { lineItem, checkoutId } = this.props;
    let updatedQuantity = lineItem.quantity + 1;
    this.props.updateLineItems(lineItem.id, updatedQuantity, checkoutId);
  };

  removeLineItemInCart = () => {
    const { lineItem, checkoutId } = this.props;
    this.props.removeLineItems(lineItem.id, checkoutId);
  };

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
            <button
              className="Line-item__remove"
              onClick={this.removeLineItemInCart}
              aria-label="Remove current item(s) from shopping cart"
            >
              <span tabIndex={-1}>×</span>
            </button>
          </div>
          <div className="Line-item__content-row">
            <div className="Line-item__variant-title">
              <span>{lineItemMaterial}</span> <span>{lineItemSize}</span>
            </div>
          </div>
          <div className="Line-item__content-row">
            <div className="Line-item__quantity-container">
              <button
                className="Line-item__quantity-update"
                onClick={this.decrementQuantity}
                aria-label="Decrease quantity by one"
              >
                <span tabIndex={-1}>-</span>
              </button>
              <span className="Line-item__quantity">{lineItem.quantity}</span>
              <button
                className="Line-item__quantity-update"
                onClick={this.incrementQuantity}
                aria-label="Increase quantity by one"
              >
                <span tabIndex={-1}>+</span>
              </button>
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

interface LinkDispatchProps {
  updateLineItems: (
    productId: string,
    quantity: string,
    checkoutId: string
  ) => void;
  removeLineItems: (productId: string, checkoutId: string) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
  updateLineItems: bindActionCreators(updateLineItems, dispatch),
  removeLineItems: bindActionCreators(removeLineItems, dispatch)
});

export default connect(null, mapDispatchToProps)(LineItem);
