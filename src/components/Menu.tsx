import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import { toggleMenu, markAsLoaded } from "../actions/actions";
import { AppActions } from "../types/actions";
import { AppState } from "../store/store";

type MenuProps = LinkStateProps & LinkDispatchProps;

class Menu extends Component<MenuProps> {
  menuRef;
  focusableEls;
  firstFocusableEl;
  lastFocusableEl;
  focusedElBeforeOpen;
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();
  }

  componentDidMount() {
    this.initFocusableEls();
  }

  componentDidUpdate(prevProps: MenuProps) {
    if (this.props.isMenuOpen !== prevProps.isMenuOpen) {
      if (this.props.isMenuOpen) {
        this.menuRef.current.style.visibility = "initial";
        this.focusedElBeforeOpen = document.activeElement;
        // focus on the span element inside the button (which it's set to outline:none) so although the button is focused but user still won't see the outline
        this.firstFocusableEl &&
          this.firstFocusableEl.querySelector("span").focus();
      } else {
        setTimeout(() => {
          this.menuRef.current.style.visibility = "hidden";
        }, 1200);
      }
    }
  }

  initFocusableEls = () => {
    this.focusableEls = [
      ...this.menuRef.current.querySelectorAll(
        "a[href], button:not([disabled])"
      )
    ];
    this.firstFocusableEl = this.focusableEls[0];
    this.lastFocusableEl = this.focusableEls[this.focusableEls.length - 1];
  };

  handleKeyDown = e => {
    const KEY_TAB = 9;
    const KEY_ESC = 27;

    const handleBackwardTab = () => {
      if (document.activeElement === this.firstFocusableEl) {
        e.preventDefault();
        this.lastFocusableEl.focus();
      }
    };

    const handleForwardTab = () => {
      if (document.activeElement === this.lastFocusableEl) {
        e.preventDefault();
        this.firstFocusableEl.focus();
      }
    };

    switch (e.keyCode) {
      case KEY_TAB: {
        if (this.focusableEls.length === 1) {
          e.preventDefault();
          break;
        }
        if (e.shiftKey) {
          handleBackwardTab();
        } else {
          handleForwardTab();
        }
        break;
      }
      case KEY_ESC: {
        this.props.toggleMenu();
        break;
      }
      default: {
        break;
      }
    }
  };

  render() {
    const { isMenuOpen, toggleMenu, markAsLoaded } = this.props;
    return (
      <div
        className={`Menu${isMenuOpen ? " Menu--open" : ""}`}
        ref={this.menuRef}
        role="dialog"
        aria-hidden={isMenuOpen ? "false" : "true"}
        aria-labelledby="menu-title"
        onKeyDown={this.handleKeyDown}
      >
        <h1 id="menu-title" className="sr-only">
          Menu
        </h1>
        <p id="menu-description" className="sr-only">
          Below are sections in this website you can navigate to
        </p>
        <div className="Menu__header">
          <button
            onClick={toggleMenu}
            className="Menu__close"
            aria-label="Close Menu"
          >
            <span tabIndex={-1}>
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
          </button>
        </div>
        <div className="Menu__body">
          <ul className="Menu__items">
            <Link
              to="/"
              className="Menu__link"
              onClick={() => {
                markAsLoaded();
                toggleMenu();
              }}
            >
              Home
            </Link>
            <Link to="/works" className="Menu__link" onClick={toggleMenu}>
              Current Work
            </Link>
            {isMobile ? null : (
              <Link
                to="/collections"
                className="Menu__link"
                onClick={toggleMenu}
              >
                Collections
              </Link>
            )}
            <Link to="/about" className="Menu__link" onClick={toggleMenu}>
              About
            </Link>
            <Link to="/localstores" className="Menu__link" onClick={toggleMenu}>
              Find in Store
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

interface LinkStateProps {
  isMenuOpen: boolean;
}

interface LinkDispatchProps {
  toggleMenu: () => AppActions;
  markAsLoaded: () => AppActions;
}

function mapStateToProps(state: AppState) {
  return {
    isMenuOpen: state.isMenuOpen
  };
}

export default connect(mapStateToProps, { toggleMenu, markAsLoaded })(Menu);
