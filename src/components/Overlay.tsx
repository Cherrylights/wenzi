import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleCart } from "../actions/actions";
import { AppState } from "../store/store";
import { AppActions } from "../types/actions";

type Props = LinkStateProps & LinkDispatchProps;

class Overlay extends Component<Props> {
  render() {
    const { isCartOpen, toggleCart } = this.props;
    return (
      <div
        className={`Overlay${isCartOpen ? " Cart--open" : ""}`}
        onClick={toggleCart}
        onWheel={e => {
          e.preventDefault();
        }}
      />
    );
  }
}

interface LinkStateProps {
  isCartOpen: boolean;
}

interface LinkDispatchProps {
  toggleCart: () => AppActions;
}

function mapStateToProps(state: AppState): LinkStateProps {
  return {
    isCartOpen: state.isCartOpen
  };
}

export default connect(
  mapStateToProps,
  { toggleCart }
)(Overlay);
