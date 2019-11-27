import React, { Component } from "react";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css";
import { AppState } from "../store/store";
import { connect } from "react-redux";
import Div100vh from "react-div-100vh";
import Product from "../types/Product";
import ProductImageWithLink from "./ProductImageWithLink";

class HomeContentMobile extends Component<LinkStateProps> {
  params;
  constructor(props) {
    super(props);
    this.params = {
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      },
      spaceBetween: 10
      //   navigation: {
      //     nextEl: ".swiper-button-next",
      //     prevEl: ".swiper-button-prev"
      //   }
    };
  }
  render() {
    const { availableProducts } = this.props;
    return (
      <Div100vh className="home-page-mobile">
        {availableProducts ? (
          <Swiper {...this.params}>
            {availableProducts.map(currentProduct => {
              let currentProductMaterial,
                currentProductSize,
                currentProductPrice;
              currentProductMaterial = currentProduct.variants[0].selectedOptions.filter(
                option => option.name === "Material"
              )[0].value;
              currentProductSize = currentProduct.variants[0].selectedOptions.filter(
                option => option.name === "Size"
              )[0].value;
              currentProductPrice = currentProduct.variants[0].price;
              return (
                <div
                  className="FeaturedProducts FeaturedProducts--alignCenter"
                  key={currentProduct.id}
                >
                  <h1 className="FeaturedProducts__title">
                    {currentProduct.title}
                  </h1>
                  <div className="FeaturedProducts__image">
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
                </div>
              );
            })}
          </Swiper>
        ) : (
          <div className="FeaturedProducts FeaturedProducts--alignCenter">
            <h1 className="FeaturedProducts__title">Product</h1>
            <div className="FeaturedProducts__image">
              <img
                src="/assets/images/product-placeholder.jpg"
                className="placeholder-img"
                alt="place-holder"
              />
            </div>
          </div>
        )}

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
      </Div100vh>
    );
  }
}

interface LinkStateProps {
  availableProducts: Product[];
}

function mapStateToProps(state: AppState) {
  return {
    availableProducts: state.availableProducts
  };
}

export default connect(mapStateToProps, null)(HomeContentMobile);

// {availableProducts.map(currentProduct => {
//     let currentProductMaterial,
//       currentProductSize,
//       currentProductPrice;
//     currentProductMaterial = currentProduct.variants[0].selectedOptions.filter(
//       option => option.name === "Material"
//     )[0].value;
//     currentProductSize = currentProduct.variants[0].selectedOptions.filter(
//       option => option.name === "Size"
//     )[0].value;
//     currentProductPrice = currentProduct.variants[0].price;
//     return (
//       <div
//         className="FeaturedProducts FeaturedProducts--alignCenter"
//         key={currentProduct.id}
//       >
//         <h1 className="FeaturedProducts__title">
//           {currentProduct.title}
//         </h1>
//         <div className="FeaturedProducts__image">
//           <ProductImageWithLink
//             handle={currentProduct.handle}
//             src={currentProduct.images[0].src}
//           />
//         </div>
//         <div className="FeaturedProducts__desc">
//           <span>{currentProductMaterial}</span>
//           <span>{currentProductSize}</span>
//           <span>${currentProductPrice}</span>
//         </div>
//       </div>
//     );
//   })}

// touchStartHandler = event => {
//     this.setState({
//       ts: {
//         x: event.touches[0].clientX,
//         y: event.touches[0].clientY
//       }
//     });
//   };

//   touchEndHandler = event => {
//     const te = {
//       x: event.changedTouches[0].clientX,
//       y: event.changedTouches[0].clientY
//     };

//     if (!this.state.isAnimating) {
//       if (this.state.ts.y > te.y + 100) {
//         // swipe up
//         this.nextProductTransition();
//       } else if (this.state.ts.y < te.y - 100) {
//         // swipe down
//         this.prevProductTransition();
//       } else {
//         return;
//       }
//     }
//   };
