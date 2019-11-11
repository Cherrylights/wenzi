import React, { Component } from "react";
import { Link } from "react-router-dom";
import Collection from "../types/Collection";

interface WorkArchiveContentProps {
  filteredCollections: Collection[];
  onLoad: () => void;
}

class WorkArchiveContent extends Component<WorkArchiveContentProps> {
  componentDidMount() {
    this.props.onLoad();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filteredCollections !== this.props.filteredCollections) {
      this.props.onLoad();
    }
  }

  render() {
    const { filteredCollections } = this.props;
    return (
      <div className="collections-content">
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
  }
}

export default WorkArchiveContent;
