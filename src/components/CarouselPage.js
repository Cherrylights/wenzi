import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TimelineMax } from "gsap";
import { markAsLoaded } from "../actions/actions";

function createTimelines() {
  //create a repeating TimelineLite
  let masterTimeline = new TimelineMax({
    onComplete: function() {
      masterTimeline.restart();
    }
  });

  const timelines = [];

  var images = document.querySelectorAll(".Carousel__image");
  for (let i = 0; i < images.length; i++) {
    if (i === images.length - 1) {
      const tl = new TimelineMax();
      tl.to(images[i], 8, {
        transform: "translate3d(-5%, 0,0)",
        ease: "Power0.easeNone"
      })
        .to(images[i], 3, { opacity: 1, ease: "Power0.easeNone" }, 0)
        .to(images[i], 1, { opacity: 0, ease: "Power0.easeNone" }, 7);

      timelines.push(tl);
    } else {
      const tl = new TimelineMax();
      tl.to(images[i], 10, {
        transform: "translate3d(-5%, 0,0)",
        ease: "Power0.easeNone"
      })
        .to(images[i], 3, { opacity: 1, ease: "Power0.easeNone" }, 0)
        .to(images[i], 3, { opacity: 0, ease: "Power0.easeNone" }, 7);

      timelines.push(tl);
    }
  }
  timelines.forEach(tl => {
    masterTimeline.add(tl, "-=4");
  });
}

class Carousel extends Component {
  componentDidMount() {
    createTimelines();
    document.body.classList.add("carousel");
  }

  componentWillUnmount() {
    document.body.classList.remove("carousel");
  }

  render() {
    const { markAsLoaded } = this.props;
    return (
      <div className="Carousel__wrapper">
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
        <Link className="Carousel__button" to="/" onClick={markAsLoaded}>
          Click Here to Explore
        </Link>
      </div>
    );
  }
}

export default connect(
  null,
  { markAsLoaded }
)(Carousel);
