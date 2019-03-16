import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleCart } from "../actions/actions";

class Overlay extends Component {
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

function mapStateToProps(state) {
  return {
    isCartOpen: state.isCartOpen
  };
}

export default connect(
  mapStateToProps,
  { toggleCart }
)(Overlay);
