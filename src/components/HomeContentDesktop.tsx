import React, { Component } from "react";
import { connect } from "react-redux";
import Charming from "react-charming";
import Skeleton from "react-loading-skeleton";
import { TweenMax } from "gsap/TweenMax";
import { AppState } from "../store/store";
import { loadFeaturedProducts, updateIndex } from "../actions/actions";
import ProductImageWithLink from "./ProductImageWithLink";
// Types
import Product from "../types/Product";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/actions";
import { bindActionCreators } from "redux";

type Props = LinkStateProps & LinkDispatchProps;

interface HomeContentDesktopState {
  isAnimating: boolean;
  ts: {
    x: number;
    y: number;
  };
}

class HomeContentDesktop extends Component<Props, HomeContentDesktopState> {
  productImage;
  productTitle;
  productDesc;
  constructor(props) {
    super(props);
    this.productImage = React.createRef();
    this.productTitle = React.createRef();
    this.productDesc = React.createRef();
    this.state = {
      isAnimating: false,
      ts: {
        x: 0,
        y: 0
      }
    };
  }

  componentDidMount() {
    //set a class on the body tag to make it overflow hidden (need to check if this is a legit way to do it)
    document.body.classList.toggle("scrollLock", true);
    this.props.loadFeaturedProducts();
    window.addEventListener("keydown", this.keyboardHandler);
  }

  componentWillUnmount() {
    //remove the scrollLock class and unbind event listener
    document.body.classList.remove("scrollLock");
    window.removeEventListener("keydown", this.keyboardHandler);
  }

  scrollHandler = event => {
    if (!this.state.isAnimating) {
      if (event.deltaY > 20) {
        this.nextProductTransition();
      } else if (event.deltaY < -20) {
        this.prevProductTransition();
      } else {
        return;
      }
    }
  };

  keyboardHandler = event => {
    const KEY_UP = 38;
    const KEY_DOWN = 40;
    if (!this.state.isAnimating) {
      if (event.keyCode === KEY_DOWN) {
        this.nextProductTransition();
      } else if (event.keyCode === KEY_UP) {
        this.prevProductTransition();
      }
    } else {
      return;
    }
  };

  prevProductTransition = () => {
    this.fadeOut().then(() => {
      this.prevProduct();
      setTimeout(this.fadeIn, 200);
    });
  };

  nextProductTransition = () => {
    this.fadeOut().then(() => {
      this.nextProduct();
      setTimeout(this.fadeIn, 200);
    });
  };

  prevProduct = () => {
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
  };

  nextProduct = () => {
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
  };

  fadeOut = () => {
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
  };

  fadeIn = () => {
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
  };

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
      <div className="home-page" onWheel={this.scrollHandler}>
        <div className="FeaturedProducts FeaturedProducts--alignCenter">
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
              <div className="FeaturedProducts__image" ref={this.productImage}>
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
                <Skeleton width="300px" />
              </h1>
              <div className="FeaturedProducts__image">
                <Skeleton width="100%" height="60vh" />
              </div>
            </React.Fragment>
          )}
        </div>
        <nav className="BottomNav">
          <div className="Artist">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Designer's Personal Website Link"
            >
              Artist / Designer
            </a>
          </div>
          <div className="Social-media">
            <a
              href="https://www.instagram.com/wenzi.ca/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Designer's Instagram Link"
            >
              Instagram
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

interface LinkStateProps {
  featuredProducts: Product[];
  currentIndex: number;
}

interface LinkDispatchProps {
  loadFeaturedProducts: () => void;
  updateIndex: (index: number) => AppActions;
}

function mapStateToProps(state: AppState) {
  return {
    featuredProducts: state.featuredProducts,
    currentIndex: state.currentIndex
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, AppActions>) {
  return {
    loadFeaturedProducts: bindActionCreators(loadFeaturedProducts, dispatch),
    updateIndex: bindActionCreators(updateIndex, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContentDesktop);
