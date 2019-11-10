import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import FilterDisplacement from "../FilterDisplacement";

class AllWorkPage extends Component {
  state = {};

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
      <div className="allWork-page transition-item">
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
            <div className="AvailableProducts__info">
              {this.state.product ? (
                <React.Fragment>
                  <div className="AvailableProducts__titleTop">
                    <h1>{this.state.product.title}</h1>
                  </div>
                  <ul className="AvailableProducts__name">
                    {availableProducts.map(product => (
                      <li key={product.id}>
                        <Link
                          to={`/work/${product.handle}`}
                          className={
                            this.state.product.title === product.title
                              ? "active"
                              : ""
                          }
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
                      </li>
                    ))}
                  </ul>
                  <div className="AvailableProducts__titleBottom">
                    {this.state.product.title}
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}
            </div>

            <div className="AvailableProducts__image">
              {this.state.product ? (
                <FilterDisplacement
                  image={this.state.product.images[0].src}
                  handle={this.state.product.handle}
                />
              ) : (
                <img
                  src="/assets/images/product-placeholder.jpg"
                  alt="placeholder"
                  className="placeholder-img"
                />
              )}
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
