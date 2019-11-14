import React, { Component } from "react";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import { withRouter, RouteComponentProps } from "react-router";
import {
  loadProduct,
  unloadProduct,
  addToCart,
  toggleCart
} from "../../actions/actions";
import SmoothScroll from "../SmoothScroll";
import ProductContent from "../ProductContent";
import { AppState } from "../../store/store";
import Product from "../../types/Product";
import Checkout from "../../types/Checkout";
import { AppActions } from "../../types/actions";
import { Dispatch } from "redux";

type ProductPageProps = LinkStateProps &
  LinkDispatchProps &
  RouteComponentProps<{ handle: string }>;

class ProductPage extends Component<ProductPageProps> {
  componentDidMount() {
    this.props.loadProduct(this.props.match.params.handle);
  }

  componentWillUnmount() {
    this.props.unloadProduct();
  }

  render() {
    const { product, checkout, addToCart, toggleCart } = this.props;
    return (
      <div className="product-page">
        {isMobile ? (
          <ProductContent
            product={product}
            checkout={checkout}
            addToCart={addToCart}
            toggleCart={toggleCart}
            onLoad={() => {
              return;
            }}
          />
        ) : (
          // <ProductContent
          //   product={product}
          //   checkout={checkout}
          //   addToCart={addToCart}
          //   toggleCart={toggleCart}
          //   onLoad={() => {}}
          // ></ProductContent>
          <SmoothScroll>
            {onLoad => (
              <ProductContent
                product={product}
                checkout={checkout}
                addToCart={addToCart}
                toggleCart={toggleCart}
                onLoad={onLoad}
              ></ProductContent>
            )}
          </SmoothScroll>
        )}
      </div>
    );
  }
}

interface LinkStateProps {
  product: Product;
  checkout: Checkout;
}

interface LinkDispatchProps {
  loadProduct: (
    handle: string
  ) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => void;
  unloadProduct: () => AppActions;
  addToCart: (
    variantId: string,
    quantity: string,
    checkoutId: string
  ) => (dispatch: Dispatch<AppActions>, getState: () => AppState) => void;
  toggleCart: () => AppActions;
}

function mapStateToProps(state: AppState) {
  return {
    product: state.product,
    checkout: state.checkout
  };
}

export default connect(mapStateToProps, {
  loadProduct,
  unloadProduct,
  addToCart,
  toggleCart
})(withRouter(ProductPage));