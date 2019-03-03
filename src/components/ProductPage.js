import React, { Component } from "react";
import { connect } from "react-redux";
import TextureDisplacement from "./TextureDisplacement";
import { loadProduct } from "../actions";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.props.loadProduct(this.props.match.params.productId);
  }

  render() {
    const { name, index, image } = this.props.currentProduct;
    return (
      <div className="transition-item">
        <TextureDisplacement image={image} name={name} />
        <p>{name}</p>
        <p>{index}</p>
        <p>{image}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentProduct: state.currentProduct
  };
}

export default connect(
  mapStateToProps,
  { loadProduct }
)(ProductPage);
