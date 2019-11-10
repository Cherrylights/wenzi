import React, { Component } from "react";
import imagesLoaded from "imagesloaded";

const math = {
  lerp: (a, b, n) => {
    return (1 - n) * a + n * b;
  },
  norm: (value, min, max) => {
    return (value - min) / (max - min);
  }
};

const config = {
  width: window.innerWidth,
  height: window.innerHeight
};

class HorizontalScroll extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.contentRef = React.createRef();
    this.data = {
      total: 0,
      current: 0,
      last: {
        one: 0,
        two: 0
      }
    };
    this.rAF = null;
    this.dom = {
      container: null,
      content: [],
      elems: [],
      handle: null
    };
    this.bounds = {
      elem: 0,
      content: 0,
      width: 0,
      max: 0,
      min: 0
    };
    this.rAF = null;

    this.state = {
      contentLoaded: 0
    };
  }

  onLoad = () => {
    this.setState(state => ({
      contentLoaded: state.contentLoaded + 1
    }));
  };

  componentDidMount() {
    this.dom.container = this.containerRef.current;
    this.dom.content = [
      ...this.contentRef.current.querySelectorAll(".scroll-content")
    ];
    this.dom.handle = this.contentRef.current.querySelector("[data-scrollbar]");
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

  init = () => {
    this.preload();
    this.on();
  };

  preload = () => {
    this.dom.elems = [
      [...this.dom.content[0].querySelectorAll(".js-slide")],
      [...this.dom.content[1].querySelectorAll(".js-slide")]
    ];
    this.data.total = this.dom.elems[0] && this.dom.elems[0].length - 1;
    imagesLoaded(this.dom.elems[0], instance => {
      this.setBounds(this.dom.elems[0]);
      this.setBounds(this.dom.elems[1]);
    });
  };

  setBounds = elems => {
    let w = 0;
    elems.forEach((el, index) => {
      // const bounds = el.getBoundingClientRect(); // will return {bottom, heifght, left,right,top,width,x,y}
      // console.log(bounds);
      el.style.position = "absolute";
      el.style.top = 0;
      el.style.left = `${w}px`;
      // w = w + bounds.width;
      w = w + config.width / 2;
      this.bounds.width = w;
      // this.bounds.max = this.bounds.width - config.width;
      this.bounds.max = this.bounds.width - config.width / 2;
      // console.log(this.bounds.width, this.bounds.max);

      if (this.data.total === index && elems === this.dom.elems[0]) {
        this.dom.content[0].style.width = `${w}px`;
        this.dom.content[1].style.width = `${w}px`;
        document.body.style.height = `${w}px`;
        // console.log(`hey, the height is: ${w}px`);
      }
    });
  };

  on = () => {
    this.setStyles();
    this.addEvents();
    this.requestAnimationFrame();
  };

  setStyles = () => {
    // set the container to full width and height of the viewport and set position to"fix"
    this.dom.container.style.position = "fixed";
    this.dom.container.style.top = 0;
    this.dom.container.style.left = 0;
    this.dom.container.style.height = "100%";
    this.dom.container.style.width = "100%";
    this.dom.container.style.overflow = "hidden";
  };

  addEvents = () => {
    // window.addEventListener("resize", this.resize, { passive: true });
    window.addEventListener("scroll", this.scroll, { passive: true });
  };

  resize = () => {
    this.setBounds(this.dom.elems[0]);
    this.setBounds(this.dom.elems[1]);
    this.scroll();
  };

  scroll = () => {
    // window.scrollY calculates how much user scroll -> window.scrollY + window.innerHeight = content.offsetHeight
    this.data.current = window.scrollY;
    this.clamp();
    // console.log(window.scrollY);
  };

  clamp = () => {
    // set 0 < this.data.current < this.bounds.max
    this.data.current = Math.min(
      Math.max(this.data.current, 0),
      this.bounds.max
    );
  };

  requestAnimationFrame = () => {
    //put the animation callback inside the requestAnimationFrame and save the request id into this.rAF
    this.rAF = requestAnimationFrame(this.run);
  };

  run = () => {
    this.data.last.one = math.lerp(this.data.last.one, this.data.current, 0.09);
    this.data.last.one = Math.floor(this.data.last.one * 100) / 100;
    this.data.last.two = math.lerp(
      this.data.last.two,
      this.data.current,
      0.085
    );
    this.data.last.two = Math.floor(this.data.last.two * 100) / 100;

    const diff = this.data.current - this.data.last.one;
    const acc = diff / config.width;
    const velo = +acc;
    const bounce = 1 - Math.abs(velo * 0.25);
    const skew = velo * 10;

    // move, rotate and skew images
    this.dom.content[0].style.transform = `translate3d(-${this.data.last.one.toFixed(
      2
    )}px, 0, 0) scaleY(${bounce}) skewX(${skew}deg)`;
    // move and scale texts
    this.dom.content[1].style.transform = `translate3d(-${this.data.last.two.toFixed(
      2
    )}px, 0, 0) scaleY(${bounce})`;

    const scale = math.norm(this.data.last.two, 0, this.bounds.max);
    this.dom.handle.style.transform = `scaleX(${scale})`;
    this.requestAnimationFrame();
  };

  cancelAnimationFrame = () => {
    cancelAnimationFrame(this.rAF);
  };

  destroy = () => {
    document.body.style.height = "";

    // this.data = {};
    // this.dom = {};
    // this.bounds = {};
    this.removeEvents();
    this.cancelAnimationFrame();
  };

  removeEvents = () => {
    window.removeEventListener("resize", this.resize, { passive: true });
    window.removeEventListener("scroll", this.scroll, { passive: true });
  };

  render() {
    return (
      <div ref={this.containerRef}>
        <div ref={this.contentRef}>{this.props.render(this.onLoad)}</div>
      </div>
    );
  }
}

export default HorizontalScroll;
