import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { markAsLoaded } from "../../actions/actions";
import imagesLoaded from "imagesloaded";
import createTimelines from "../../utils/createTimelines";
import { AppActions } from "../../types/actions";

interface CarouselPageState {
  backgroundLoaded: boolean;
}

class CarouselPage extends Component<LinkDispatchProps, CarouselPageState> {
  constructor(props: LinkDispatchProps) {
    super(props);
    this.state = {
      backgroundLoaded: false
    };
  }

  componentDidMount() {
    imagesLoaded(
      document.querySelectorAll(".Carousel__image"),
      { background: true },
      () => {
        this.setState({
          backgroundLoaded: true
        });
        createTimelines();
      }
    );
    document.body.classList.add("carousel");
  }

  componentWillUnmount() {
    document.body.classList.remove("carousel");
  }

  render() {
    const { markAsLoaded } = this.props;

    return (
      <div className="Carousel">
        <div
          className={`Carousel__loading ${
            this.state.backgroundLoaded ? "Carousel-loaded" : ""
          }`}
        >
          <div>
            <h1>Wenzi</h1>
            {/* <img src="/assets/images/loader.svg" alt="loader" /> */}
          </div>
        </div>
        <div className="Carousel__imageWrapper">
          <div className="Carousel__image" id="Carousel__image1" />
          <div className="Carousel__image" id="Carousel__image2" />
          <div className="Carousel__image" id="Carousel__image3" />
          <div className="Carousel__image" id="Carousel__image4" />
        </div>
        <div className="Carousel__overlay" />
        <div className="Carousel__text">
          <p>MEET SCARF BLOOMINGS</p>
          <h1>Exclusive Scarf Collections</h1>
          <p>Crafted By Wenzi</p>
        </div>
        <Link
          className="Carousel__button"
          to="/"
          onClick={markAsLoaded}
          role="button"
          aria-label="Click here to enter to the main page"
        >
          Click Here to Explore
        </Link>
      </div>
    );
  }
}

interface LinkDispatchProps {
  markAsLoaded: () => AppActions;
}

export default connect(null, { markAsLoaded })(CarouselPage);
