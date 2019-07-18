import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isBrowser } from "react-device-detect";
import SmoothScroll from "../utils/SmoothScroll";

class CollectionsPage extends Component {
  componentDidMount() {
    if (isBrowser) {
      document.body.style.cssText = "";
      new SmoothScroll();
    }
  }

  componentDidUpdate(prevProps) {
    //Make sure the component will get properly re-rendered even if the props get updated after the componentDidMount call
    if (this.props.collections !== prevProps.collections) {
      if (isBrowser) {
        document.body.style.cssText = "";
        new SmoothScroll();
      }
    }
  }

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
      <div className="collections-page transition-item smooth-scroll-wrapper">
        <div className="Collections smooth-scroll-content">
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
