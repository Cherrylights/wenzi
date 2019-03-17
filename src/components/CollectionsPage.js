import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CollectionsPage extends Component {
  render() {
    const { collections } = this.props;
    // filter out the featured collections and available products
    const filteredCollections = collections.filter(
      collection =>
        collection.handle !== "frontpage" &&
        collection.handle !== "current-available"
    );
    // console.log(filteredCollections);
    return (
      <div className="collections-page transition-item">
        <div className="Collections">
          {filteredCollections.map(collection => (
            <div key={collection.id} className="Collection">
              <h1 className="Collection__title">{collection.title}</h1>
              <div className="Collection__grid">
                {collection.products.map(product => (
                  <div key={product.id}>
                    <Link to={`/work/${product.handle}`}>
                      {/* <TextureDisplacement
                      image={product.images[0].src}
                      handle={product.handle}
                    /> */}
                      <img src={product.images[0].src} alt="scarf" />
                    </Link>
                    <p className="AvailableProducts__name">{product.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    collections: state.collections
  };
}

export default connect(
  mapStateToProps,
  null
)(CollectionsPage);
