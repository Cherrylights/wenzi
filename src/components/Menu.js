import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { toggleMenu } from "../actions/actions";

class Menu extends Component {
  render() {
    const { isMenuOpen, toggleMenu } = this.props;
    return (
      <div className={`Menu${isMenuOpen ? " Menu--open" : ""}`}>
        <div className="Menu__header">
          <span onClick={toggleMenu} className="Menu__close">
            <svg
              width="16px"
              height="16px"
              viewBox="0 0 16 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="8 7.5 15.5 0 16 0.5 8.5 8 16 15.5 15.5 16 8 8.5 0.5 16 0 15.5 7.5 8 0 0.5 0.5 0" />

              <polygon points="8 7.5 15.5 0 16 0.5 8.5 8 16 15.5 15.5 16 8 8.5 0.5 16 0 15.5 7.5 8 0 0.5 0.5 0" />
            </svg>
          </span>
        </div>
        <div className="Menu__body">
          <ul className="Menu__items">
            <Link to="/" className="Menu__link" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/works" className="Menu__link" onClick={toggleMenu}>
              All Work
            </Link>
            {isMobile ? (
              ""
            ) : (
              <Link
                to="/collections"
                className="Menu__link"
                onClick={toggleMenu}
              >
                Collections Archive
              </Link>
            )}
            <Link to="/about" className="Menu__link" onClick={toggleMenu}>
              About
            </Link>
            <Link to="/localstore" className="Menu__link" onClick={toggleMenu}>
              Find in Store
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isMenuOpen: state.isMenuOpen
  };
}

export default connect(
  mapStateToProps,
  { toggleMenu }
)(Menu);
