import imagesLoaded from "imagesloaded";

const math = {
  lerp: (a, b, n) => {
    return (1 - n) * a + n * b;
  },
  norm: (value, min, max) => {
    return (value - min) / (max - min);
  }
};

// const config = {
//   height: window.innerHeight,
//   width: window.innerWidth
// };

class Smooth {
  constructor(classname) {
    this.bindMethods();

    this.data = {
      ease: 0.09,
      current: 0,
      last: 0
    };

    this.classname = classname;

    // this.dom = {
    //   el:
    //     document.querySelectorAll("[data-scroll]").length === 2
    //       ? document.querySelectorAll("[data-scroll]")[1]
    //       : document.querySelectorAll("[data-scroll]")[0],
    //   content:
    //     document.querySelectorAll("[data-scroll-content]").length === 2
    //       ? document.querySelectorAll("[data-scroll-content]")[1]
    //       : document.querySelectorAll("[data-scroll-content]")[0]
    // };

    this.dom = {
      el: document.querySelector(`.${classname}[data-scroll]`),
      content: document.querySelector(
        `.${classname}-content[data-scroll-content]`
      )
    };

    this.rAF = null;

    this.init();
  }

  bindMethods() {
    ["scroll", "run", "resize"].forEach(fn => (this[fn] = this[fn].bind(this)));
  }

  resize() {
    this.setHeight();
    this.scroll();
  }

  preload() {
    imagesLoaded(this.dom.content, instance => {
      this.setHeight();
    });
  }

  setHeight() {
    // calculate the content height
    document.body.style.height = `${this.dom.content.offsetHeight}px`;
  }

  on() {
    this.setStyles();
    this.setHeight();
    this.addEvents();
    this.requestAnimationFrame();
  }

  setStyles() {
    // give container a height 100% and make it overflow to hidden
    Object.assign(this.dom.el.style, {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      overflow: "hidden"
    });
  }

  addEvents() {
    window.addEventListener("resize", this.resize, { passive: true });
    window.addEventListener("scroll", this.scroll, { passive: true });
  }

  scroll() {
    // window.scrollY calculates how much user scroll -> window.scrollY + window.innerHeight = content.offsetHeight
    this.data.current = window.scrollY;
    console.log(window.scrollY);
  }

  requestAnimationFrame() {
    //put the animation callback inside the requestAnimationFrame and save the request id into this.rAF
    this.rAF = requestAnimationFrame(this.run);
  }

  run() {
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
  }

  off() {
    this.cancelAnimationFrame();

    this.removeEvents();
  }

  cancelAnimationFrame() {
    cancelAnimationFrame(this.rAF);
  }

  destroy() {
    document.body.style.height = "";

    this.data = null;
    this.dom = null;
    this.removeEvents();
    this.cancelAnimationFrame();
  }

  removeEvents() {
    window.removeEventListener("resize", this.resize, { passive: true });
    window.removeEventListener("scroll", this.scroll, { passive: true });
  }

  init() {
    this.preload();
    this.on();
  }
}

export default Smooth;
