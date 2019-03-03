import React, { Component } from "react";
import { connect } from "react-redux";
import TextureDisplacement from "./TextureDisplacement";

class CollectionsPage extends Component {
  render() {
    const { products } = this.props;
    return (
      <div className="transition-item">
        <h1>Collection A</h1>
        {Object.keys(products)
          .filter(productId => products[productId].collection === "collection1")
          .map(productId => {
            const { name, image } = products[productId];
            return (
              <div key={name}>
                <TextureDisplacement image={image} name={name} />
                <p>{name}</p>
              </div>
            );
          })}
        <h1>Collection B</h1>
        {Object.keys(products)
          .filter(productId => products[productId].collection === "collection2")
          .map(productId => {
            const { name, image } = products[productId];
            return (
              <div key={name}>
                <TextureDisplacement image={image} name={name} />
                <p>{name}</p>
              </div>
            );
          })}
        <h1>Collection C</h1>
        {Object.keys(products)
          .filter(productId => products[productId].collection === "collection3")
          .map(productId => {
            const { name, image } = products[productId];
            return (
              <div key={name}>
                <TextureDisplacement image={image} name={name} />
                <p>{name}</p>
              </div>
            );
          })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  };
}

export default connect(
  mapStateToProps,
  null
)(CollectionsPage);
