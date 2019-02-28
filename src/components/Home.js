import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { prevProject, nextProject } from "../actions/index";

class Home extends Component {
  render() {
    const currentProductId = Object.keys(this.props.products)[
      this.props.currentIndex
    ];
    return (
      <div className="transition-item">
        <div className="carousel">
          <Link to={`/work/${this.currentProductId}`}>
            <img
              src={this.props.products[currentProductId].image}
              alt="scarf"
            />
          </Link>
        </div>
        <button onClick={this.props.prevProject}>Prev</button>
        <button onClick={this.props.nextProject}>Next</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    currentIndex: state.currentIndex
  };
}

export default connect(
  mapStateToProps,
  { prevProject, nextProject }
)(Home);
