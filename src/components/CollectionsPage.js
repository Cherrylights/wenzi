import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadCollections } from "../actions/actions";
import TextureDisplacement from "./TextureDisplacement";

class CollectionsPage extends Component {
  componentDidMount() {
    this.props.loadCollections();
  }
  render() {
    const { collections } = this.props;
    // filter out the featured collections
    const filteredCollections = collections.filter(
      collection => collection.handle !== "frontpage"
    );
    // console.log(filteredCollections);
    return (
      <div className="transition-item">
        {filteredCollections.map(collection => (
          <div key={collection.id}>
            <h1>{collection.title}</h1>
            <div>
              {collection.products.map(product => (
                <div key={product.id}>
                  <Link to={`/work/${product.handle}`}>
                    <TextureDisplacement
                      image={product.images[0].src}
                      handle={product.handle}
                    />
                    {/* <img src={product.images[0].src} alt="scarf" /> */}
                  </Link>
                  <p>{product.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
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
  { loadCollections }
)(CollectionsPage);
