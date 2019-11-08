import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
// import SmoothScroll from "../utils/SmoothScroll";
import SmoothScroll from "./SmoothScroll";

class CollectionsPage extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.smooth = undefined;
  //   }
  componentDidMount() {
    document.body.style.cssText = "";
    // window.scrollTo(0, 0);
    // if (isBrowser) {
    //   this.smooth = new SmoothScroll("collections-page");
    // }
    // console.log("collections page did mount");
  }

  componentDidUpdate(prevProps) {
    //Make sure the component will get properly re-rendered even if the props get updated after the componentDidMount call
    // if (this.props.collections !== prevProps.collections) {
    //   document.body.style.cssText = "";
    //   if (isBrowser) {
    //     if (this.smooth) {
    //       this.smooth.destroy();
    //       this.smooth = new SmoothScroll("collections-page");
    //     }
    //   }
    // }
    // console.log("collections page did update");
  }

  componentWillUnmount() {
    // this.smooth.destroy();
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
    const content = (
      <div className="collections-page-content" data-scroll-content>
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
                    <img
                      className="Collection__image"
                      src={product.images[0].src}
                      alt="scarf"
                    />
                  </Link>
                  <p className="AvailableProducts__name">{product.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
    return (
      <div className="collections-page transition-item" data-scroll>
        {isMobile ? content : <SmoothScroll>{content}</SmoothScroll>}
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
