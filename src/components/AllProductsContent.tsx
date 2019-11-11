import React, { Component } from "react";
import { Link } from "react-router-dom";
import Product from "../types/Product";

interface AllProductsContentProps {
  onLoad: () => void;
  availableProducts: Product[];
}

class AllProductsContent extends Component<AllProductsContentProps> {
  componentDidMount() {
    this.props.onLoad();
  }
  componentDidUpdate(prevProps) {
    if (this.props.availableProducts !== prevProps.availableProducts) {
      this.props.onLoad();
    }
  }

  render() {
    const { availableProducts } = this.props;
    return (
      <React.Fragment>
        <div className="scroll-content">
          {availableProducts.map((product, index) => (
            <article
              className={`slide slide--${index} js-slide`}
              key={product.id}
            >
              <div className="slide__inner">
                <div className="slide__img">
                  <figure>
                    {product.options[2].values[0].value === "Square" ? (
                      <img
                        src={product.images[0].src}
                        draggable={false}
                        alt="scarf"
                      />
                    ) : (
                      <img
                        src={product.images[2].src}
                        draggable={false}
                        alt="scarf"
                      />
                    )}
                  </figure>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="scroll-content scroll-content--last">
          {availableProducts.map((product, index) => (
            <article
              className={`slide slide--${index} js-slide`}
              key={product.id}
            >
              <div className="slide__inner">
                <div className="slide__sub-title__top">
                  <span>{product.options[0].values[0].value}</span>
                </div>
                <h1 className="slide__title">
                  <div className="js-transition-title">{product.title}</div>
                </h1>
                <div className="slide__sub-title__bottom">
                  <span>{product.options[2].values[0].value}</span>
                </div>
                <div className="slide__img slide__img--proxy">
                  <Link
                    className="slide__img-link"
                    to={`/work/${product.handle}`}
                  />
                </div>
                <div className="slide__project">
                  {product.options[1].values[0].value}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="scrollbar" data-scrollbar>
          <div className="scrollbar__handle js-scrollbar__handle" />
        </div>
      </React.Fragment>
    );
  }
}

export default AllProductsContent;
