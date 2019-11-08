import React, { Component } from "react";
import imagesLoaded from "imagesloaded";

const ScrollWrapper = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="data-scroll">
      {props.children}
    </div>
  );
});

const math = {
  lerp: (a, b, n) => {
    return (1 - n) * a + n * b;
  }
};

class SmoothScroll extends Component {
  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
    this.data = {
      ease: 0.125,
      current: 0,
      last: 0
    };
    this.rAF = null;
    this.dom = {
      el: null,
      content: null
    };
  }

  componentDidMount() {
    this.dom.el = this.contentRef.current;
    this.dom.content = this.contentRef.current.children[0];
    this.init();
  }

  componentDidUpdate() {
    console.log("smooth scroll update");
    this.setHeight();
  }

  componentWillUnmount() {
    this.destroy();
  }

  init = () => {
    this.preload();
    this.on();
  };

  preload = () => {
    imagesLoaded(this.dom.content, instance => {
      this.setHeight();
    });
  };

  setHeight = () => {
    // calculate the content height
    document.body.style.height = `${this.dom.content.offsetHeight}px`;
    // console.log(this.dom.content.offsetHeight);
  };

  on = () => {
    this.setStyles();
    // this.setHeight();
    this.addEvents();
    this.requestAnimationFrame();
  };

  setStyles = () => {
    // give container a height 100% and make it overflow to hidden
    Object.assign(this.dom.el.style, {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      overflow: "hidden"
    });
  };

  addEvents = () => {
    window.addEventListener("resize", this.resize, { passive: true });
    window.addEventListener("scroll", this.scroll, { passive: true });
  };

  resize = () => {
    this.setHeight();
    this.scroll();
  };

  scroll = () => {
    // window.scrollY calculates how much user scroll -> window.scrollY + window.innerHeight = content.offsetHeight
    this.data.current = window.scrollY;
    // console.log(window.scrollY);
  };

  requestAnimationFrame = () => {
    //put the animation callback inside the requestAnimationFrame and save the request id into this.rAF
    this.rAF = requestAnimationFrame(this.run);
  };

  run = () => {
    // calculate the last scroll position using lerp function
    this.data.last = math.lerp(
      this.data.last,
      this.data.current,
      this.data.ease
    );
    if (this.data.last < 0.1) {
      this.data.last = 0;
    }
    // If want to create some effect for the content when scrolling, we can do something like this
    // const diff = this.data.current - this.data.last;
    // const acc = diff / config.width;
    // const velo = +acc;
    // const skew = velo * 7.5;

    // this.dom.content.style.transform = `translate3d(0, -${this.data.last}px, 0) skewY(${skew}deg)`
    this.dom.content.style.transform = `translate3d(0, -${this.data.last}px, 0)`;

    this.requestAnimationFrame();
  };

  off = () => {
    this.cancelAnimationFrame();

    this.removeEvents();
  };

  cancelAnimationFrame = () => {
    cancelAnimationFrame(this.rAF);
  };

  destroy = () => {
    document.body.style.height = "";

    this.data = null;
    this.dom = null;
    this.removeEvents();
    this.cancelAnimationFrame();
  };

  removeEvents = () => {
    window.removeEventListener("resize", this.resize, { passive: true });
    window.removeEventListener("scroll", this.scroll, { passive: true });
  };

  render() {
    return (
      <ScrollWrapper ref={this.contentRef}>{this.props.children}</ScrollWrapper>
    );
  }
}

export default SmoothScroll;
