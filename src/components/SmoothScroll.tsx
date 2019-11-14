import React, { Component, ReactNode } from "react";
import imagesLoaded from "imagesloaded";

const math = {
  lerp: (a: number, b: number, n: number) => {
    return (1 - n) * a + n * b;
  }
};

interface SmoothScrollProps {
  children: (onLoad: () => void) => ReactNode;
}

interface SmoothScrollState {
  contentLoaded: number;
}

class SmoothScroll extends Component<SmoothScrollProps, SmoothScrollState> {
  containerRef;
  contentRef;
  data;
  rAF;
  dom;
  constructor(props: SmoothScrollProps) {
    super(props);
    this.containerRef = React.createRef();
    this.contentRef = React.createRef();
    this.data = {
      ease: 0.11,
      current: 0,
      last: 0
    };
    this.rAF = null;
    this.dom = {
      container: null,
      content: null
    };
    this.state = {
      contentLoaded: 0
    };
  }

  componentDidMount() {
    this.dom.container = this.containerRef.current;
    this.dom.content = this.contentRef.current;
    this.init();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contentLoaded !== this.state.contentLoaded) {
      this.preload();
    }
  }

  componentWillUnmount() {
    this.destroy();
  }

  onLoad = () => {
    this.setState(state => ({
      contentLoaded: state.contentLoaded + 1
    }));
  };

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
  };

  on = () => {
    this.setStyles();
    this.addEvents();
    this.requestAnimationFrame();
  };

  setStyles = () => {
    // give container a height 100% and make it overflow to hidden
    Object.assign(this.dom.container.style, {
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
    // this.data = null;
    // this.dom = null;
    this.removeEvents();
    this.cancelAnimationFrame();
  };

  removeEvents = () => {
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("scroll", this.scroll);
  };

  render() {
    return (
      <div ref={this.containerRef}>
        <div ref={this.contentRef}>{this.props.children(this.onLoad)}</div>
      </div>
    );
  }
}

export default SmoothScroll;
