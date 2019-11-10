import React, { Component } from "react";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";
import SmoothScroll from "../SmoothScroll";
import CollectionsContent from "../CollectionsContent";

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
        {isMobile ? (
          <CollectionsContent
            filteredCollections={filteredCollections}
            onLoad={() => {
              return;
            }}
          ></CollectionsContent>
        ) : (
          <SmoothScroll
            render={onLoad => (
              <CollectionsContent
                onLoad={onLoad}
                filteredCollections={filteredCollections}
              ></CollectionsContent>
            )}
          ></SmoothScroll>
        )}
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
