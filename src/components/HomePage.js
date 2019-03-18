import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BrowserView, MobileView, isMobile } from "react-device-detect";
import { TweenMax } from "gsap/TweenMax";
import { loadFeaturedProducts, updateIndex } from "../actions/actions";
import FilterDisplacement from "./FilterDisplacement";
import ProductImageWithLink from "./ProductImageWithLink";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.productImage = React.createRef();
    this.prevProduct = this.prevProduct.bind(this);
    this.nextProduct = this.nextProduct.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
    this.state = {
      isAnimating: false
    };
  }

  componentDidMount() {
    this.props.loadFeaturedProducts();
  }

  scrollHandler = event => {
    if (!this.state.isAnimating) {
      if (event.deltaY > 0) {
        this.fadeOut().then(() => {
          this.nextProduct();
          this.fadeIn();
        });
      } else {
        this.fadeOut().then(() => {
          this.prevProduct();
          this.fadeIn();
        });
      }
    }
  };

  fadeOut() {
    return new Promise((resolve, reject) => {
      this.setState({
        isAnimating: true
      });
      TweenMax.to(this.productImage.current, 0.7, {
        opacity: 0,
        onComplete: () => {
          resolve(true);
        },
        ease: "Power2.easeOut"
      });
    });
  }

  fadeIn() {
    TweenMax.to(this.productImage.current, 0.7, {
      opacity: 1,
      onComplete: () => {
        this.setState({
          isAnimating: false
        });
      },
      ease: "Power2.easeIn"
    });
  }

  prevProduct() {
    if (this.props.featuredProducts[this.props.currentIndex]) {
      const { updateIndex, featuredProducts, currentIndex } = this.props;
      const total = featuredProducts.length - 1;
      if (currentIndex === 0) {
        updateIndex(total);
      } else {
        updateIndex(currentIndex - 1);
      }
    } else {
      return;
    }
  }

  nextProduct() {
    if (this.props.featuredProducts[this.props.currentIndex]) {
      const { updateIndex, featuredProducts, currentIndex } = this.props;
      const total = featuredProducts.length - 1;
      if (currentIndex === total) {
        updateIndex(0);
      } else {
        updateIndex(currentIndex + 1);
      }
    } else {
      return;
    }
  }

  render() {
    const { featuredProducts, currentIndex } = this.props;
    const currentProduct = featuredProducts[currentIndex];
    const productTotalQuantity = featuredProducts.length;
    const productCurrentIndex = currentIndex + 1;
    let currentProductMaterial,
      currentProductSize,
      currentProductPrice,
      currentProductAspectRatio;
    if (currentProduct) {
      currentProductMaterial = currentProduct.variants[0].selectedOptions.filter(
        option => option.name === "Material"
      )[0].value;
      currentProductSize = currentProduct.variants[0].selectedOptions.filter(
        option => option.name === "Size"
      )[0].value;
      currentProductPrice = currentProduct.variants[0].price;
      currentProductAspectRatio = parseInt(
        currentProduct.variants[0].selectedOptions.filter(
          option => option.name === "Aspect Ratio"
        )[0].value,
        10
      );
    }

    return (
      <div
        className="home-page transition-item"
        onWheel={isMobile ? null : this.scrollHandler}
      >
        <div className="FeaturedProducts FeaturedProducts--alignCenter">
          <BrowserView>
            {currentProduct ? (
              <React.Fragment>
                <h1 className="FeaturedProducts__title">
                  {currentProduct.title}
                </h1>
                <div
                  className="FeaturedProducts__image"
                  ref={this.productImage}
                >
                  <ProductImageWithLink
                    handle={currentProduct.handle}
                    src={currentProduct.images[0].src}
                  />
                </div>
                <div className="FeaturedProducts__desc">
                  <span>{currentProductMaterial}</span>
                  <span>{currentProductSize}</span>
                  <span>${currentProductPrice}</span>
                </div>
                <div className="FeaturedProducts__index">
                  <span className="SelectedProducts__index-current">
                    <span>{productCurrentIndex}</span>
                  </span>
                  <span className="SelectedProducts__index-dash">
                    <span />
                  </span>
                  <span className="SelectedProducts__index-total">
                    <span>{productTotalQuantity}</span>
                  </span>
                </div>
                <div className="Scroll-to-explore">
                  <span>Scroll to Explore</span>
                </div>
                <div className="Selected-design">
                  <span>Selected Scarf Design</span>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h1 className="FeaturedProducts__title">Product</h1>
                <div className="FeaturedProducts__image">
                  <img
                    src="/assets/images/product-placeholder.jpg"
                    className="placeholder-img"
                    alt="place-holder"
                  />
                </div>
              </React.Fragment>
            )}
          </BrowserView>

          <MobileView>
            {currentProduct ? (
              <React.Fragment>
                <h1 className="FeaturedProducts__title">
                  {currentProduct.title}
                </h1>
                <div className="FeaturedProducts__image">
                  <FilterDisplacement
                    image={currentProduct.images[0].src}
                    handle={currentProduct.handle}
                    aspectRatio={currentProductAspectRatio}
                  />
                </div>
                <div className="FeaturedProducts__desc">
                  <span>{currentProductMaterial}</span>
                  <span>{currentProductSize}</span>
                  <span>${currentProductPrice}</span>
                </div>
                <button onClick={this.prevProduct}>Prev</button>
                <button onClick={this.nextProduct}>Next</button>
                <div>
                  <Link
                    to={`/work/${currentProduct.handle}`}
                    className="FeaturedProducts__link"
                  >
                    {currentProduct.handle}
                  </Link>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h1 className="FeaturedProducts__title">Product</h1>
                <div className="FeaturedProducts__image">
                  <img
                    src="/assets/images/product-placeholder.jpg"
                    className="placeholder-img"
                    alt="place-holder"
                  />
                </div>
              </React.Fragment>
            )}
          </MobileView>
        </div>
        {!isMobile && (
          <nav className="BottomNav">
            <div className="Artist">
              <span>Artist / Designer</span>
            </div>
            <div className="Social-media">
              <a href="/" alt="instagram">
                Instagram
              </a>
            </div>
          </nav>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    featuredProducts: state.featuredProducts,
    currentIndex: state.currentIndex
  };
}

export default connect(
  mapStateToProps,
  { updateIndex, loadFeaturedProducts }
)(HomePage);
