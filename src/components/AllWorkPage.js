import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import FilterDisplacement from "./FilterDisplacement";

class AllWorkPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      product: this.props.availableProducts[0]
    });
  }

  componentDidUpdate(prevProps) {
    //Make sure the component will get properly re-rendered even if the props get updated after the componentDidMount call
    if (this.props.availableProducts !== prevProps.availableProducts) {
      this.setState({
        product: this.props.availableProducts[0]
      });
    }
  }
  render() {
    const { availableProducts } = this.props;
    return (
      <div className="allWork-page">
        <MobileView>
          <div className="AvailableProducts">
            <h1 className="AvailableProducts__title">All Work</h1>
            <div className="AvailableProducts__grid">
              {availableProducts.map(product => (
                <div key={product.id}>
                  <Link to={`/work/${product.handle}`}>
                    <img
                      src={product.images[0].src}
                      alt="scarf"
                      className="AvailableProducts__image"
                    />
                  </Link>
                  <Link to={`/work/${product.handle}`}>
                    <p className="AvailableProducts__name">{product.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </MobileView>
        <BrowserView>
          <div className="AvailableProducts">
            <div className="AvailableProducts__image">
              {this.state.product ? (
                <React.Fragment>
                  <FilterDisplacement
                    image={this.state.product.images[0].src}
                    handle={this.state.product.handle}
                    aspectRatio={parseInt(
                      this.state.product.variants[0].selectedOptions.filter(
                        option => option.name === "Aspect Ratio"
                      )[0].value,
                      10
                    )}
                  />
                  {this.state.product.title}
                </React.Fragment>
              ) : (
                <img
                  src="/assets/images/product-placeholder.jpg"
                  alt="placeholder"
                />
              )}
            </div>
            <div className="AvailableProducts__name">
              {availableProducts.map(product => (
                <Link
                  to={`/work/${product.handle}`}
                  key={product.id}
                  onMouseEnter={e => {
                    const product = availableProducts.filter(
                      product => product.title === e.target.textContent
                    )[0];
                    this.setState({
                      product
                    });
                  }}
                >
                  {product.title}
                </Link>
              ))}
            </div>
          </div>
        </BrowserView>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    availableProducts: state.availableProducts
  };
}

export default connect(
  mapStateToProps,
  null
)(AllWorkPage);
