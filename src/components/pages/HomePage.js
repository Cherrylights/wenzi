import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserView, MobileView, isMobile } from "react-device-detect";
import { TweenMax } from "gsap/TweenMax";
import Charming from "react-charming";
import Skeleton from "react-loading-skeleton";
import { loadFeaturedProducts, updateIndex } from "../../actions/actions";
import ProductImageWithLink from "../ProductImageWithLink";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.productImage = React.createRef();
    this.productTitle = React.createRef();
    this.productDesc = React.createRef();
    this.prevProduct = this.prevProduct.bind(this);
    this.nextProduct = this.nextProduct.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.fadeIn = this.fadeIn.bind(this);
    this.state = {
      isAnimating: false,
      ts: {
        x: 0,
        y: 0
      }
    };
  }

  componentDidMount() {
    this.props.loadFeaturedProducts();
    //set a class on the body tag to make it overflow hidden (need to check if this is a legit way to do it)
    document.body.classList.toggle("scrollLock", true);
    document.body.style.cssText = "";
  }

  componentWillUnmount() {
    //remove the scrollLock class
    document.body.classList.remove("scrollLock");
  }

  touchStartHandler = event => {
    this.setState({
      ts: {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      }
    });
  };

  touchEndHandler = event => {
    const te = {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY
    };

    if (!this.state.isAnimating) {
      if (this.state.ts.y > te.y + 100) {
        // swipe up
        this.fadeOut().then(() => {
          this.nextProduct();
          setTimeout(this.fadeIn, 200);
        });
      } else if (this.state.ts.y < te.y - 100) {
        // swipe down
        this.fadeOut().then(() => {
          this.prevProduct();
          setTimeout(this.fadeIn, 200);
        });
      }
    }
  };

  scrollHandler = event => {
    if (!this.state.isAnimating) {
      if (event.deltaY > 20) {
        this.fadeOut().then(() => {
          this.nextProduct();
          setTimeout(this.fadeIn, 200);
        });
      } else if (event.deltaY < -20) {
        this.fadeOut().then(() => {
          this.prevProduct();
          setTimeout(this.fadeIn, 200);
        });
      }
    }
  };

  fadeOut() {
    const letters = Array.prototype.slice.call(
      this.productTitle.current.querySelectorAll("span")
    );
    return new Promise((resolve, reject) => {
      this.setState({
        isAnimating: true
      });
      TweenMax.to(this.productImage.current, 0.7, {
        opacity: 0,
        onComplete: () => {
          resolve(true);
        },
        ease: "Power1.easeIn"
      });
      TweenMax.staggerTo(letters, 0.5, {
        opacity: 0,
        stagger: 0.02,
        ease: "Power1.easeOut",
        onComplete: () => {
          // Make sure to set the container to opacity 0 after the fade out animation, under such situation, even the props update is ahead of the fade in animation, the text will still get hidden.
          this.productTitle.current.style.cssText = "opacity: 0";
        }
      });
      TweenMax.to(this.productDesc.current, 0.7, {
        opacity: 0,
        ease: "Power2.easeOut"
      });
    });
  }

  fadeIn() {
    const letters = Array.prototype.slice.call(
      this.productTitle.current.querySelectorAll("span")
    );
    this.productTitle.current.style.cssText = "opacity: 1";
    TweenMax.to(
      this.productImage.current,
      0.7,
      {
        opacity: 1,
        onComplete: () => {
          this.setState({
            isAnimating: false
          });
        },
        ease: "Power1.easeIn"
      },
      0.2
    );
    TweenMax.staggerFromTo(
      letters,
      0.5,
      {
        opacity: 0
      },
      {
        opacity: 1,
        stagger: 0.02,
        ease: "Power1.easeIn"
      }
    );
    TweenMax.fromTo(
      this.productDesc.current,
      0.8,
      {
        opacity: 0
      },
      { opacity: 1, ease: "Power2.easeOut" }
    );
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
    let currentProductMaterial, currentProductSize, currentProductPrice;
    if (currentProduct) {
      currentProductMaterial = currentProduct.variants[0].selectedOptions.filter(
        option => option.name === "Material"
      )[0].value;
      currentProductSize = currentProduct.variants[0].selectedOptions.filter(
        option => option.name === "Size"
      )[0].value;
      currentProductPrice = currentProduct.variants[0].price;
    }

    return (
      <div
        className="home-page"
        onWheel={isMobile ? null : this.scrollHandler}
        onTouchStart={isMobile ? this.touchStartHandler : null}
        onTouchEnd={isMobile ? this.touchEndHandler : null}
      >
        <div className="FeaturedProducts FeaturedProducts--alignCenter">
          <BrowserView>
            {currentProduct ? (
              <React.Fragment>
                <Charming
                  className="FeaturedProducts__title Charming"
                  letters={currentProduct.title}
                  render={letters => (
                    <h1 className="charming" ref={this.productTitle}>
                      {letters}
                    </h1>
                  )}
                />
                <div
                  className="FeaturedProducts__image"
                  ref={this.productImage}
                >
                  <ProductImageWithLink
                    handle={currentProduct.handle}
                    src={currentProduct.images[0].src}
                  />
                </div>
                <div className="FeaturedProducts__desc" ref={this.productDesc}>
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
                <h1 className="FeaturedProducts__title">
                  <Skeleton width={300} />
                </h1>
                <div className="FeaturedProducts__image">
                  <Skeleton width="100%" height="60vh" />
                </div>
              </React.Fragment>
            )}
          </BrowserView>

          <MobileView>
            {currentProduct ? (
              <React.Fragment>
                <Charming
                  letters={currentProduct.title}
                  render={letters => (
                    <h1
                      className="FeaturedProducts__title charming"
                      ref={this.productTitle}
                    >
                      {letters}
                    </h1>
                  )}
                />
                <div
                  className="FeaturedProducts__image"
                  ref={this.productImage}
                >
                  <ProductImageWithLink
                    handle={currentProduct.handle}
                    src={currentProduct.images[0].src}
                  />
                </div>
                <div className="FeaturedProducts__desc" ref={this.productDesc}>
                  <span>{currentProductMaterial}</span>
                  <span>{currentProductSize}</span>
                  <span>${currentProductPrice}</span>
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
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                atl="website"
              >
                Artist / Designer
              </a>
            </div>
            <div className="Social-media">
              <a
                href="https://www.instagram.com/wenzi.ca/"
                target="_blank"
                rel="noopener noreferrer"
                alt="instagram"
              >
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
    currentIndex: state.currentIndex,
    isInitialLoad: state.isInitialLoad
  };
}

export default connect(
  mapStateToProps,
  { updateIndex, loadFeaturedProducts }
)(HomePage);
