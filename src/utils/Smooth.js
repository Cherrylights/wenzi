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
  height: window.innerHeight,
  width: window.innerWidth
};

class Smooth {
  constructor() {
    this.bindAll();

    this.el = document.querySelector("[data-scroll]");
    this.content = [...document.querySelectorAll("[data-scroll-content]")];

    this.dom = {
      el: this.el,
      content: this.content,
      elems: [
        [...this.content[0].querySelectorAll(".js-slide")],
        [...this.content[1].querySelectorAll(".js-slide")]
      ],
      handle: this.el.querySelector(".js-scrollbar__handle")
    };

    this.data = {
      total: this.dom.elems[0].length - 1,
      current: 0,
      last: {
        one: 0,
        two: 0
      },
      on: 0,
      off: 0
    };

    this.bounds = {
      elem: 0,
      content: 0,
      width: 0,
      max: 0,
      min: 0
    };

    this.state = {
      dragging: false
    };

    this.rAF = null;
    this.parallax = null;
    this.init();
  }

  bindAll() {
    ["scroll", "run", "resize"].forEach(fn => (this[fn] = this[fn].bind(this)));
  }

  preload() {
    imagesLoaded(this.dom.content, instance => {
      this.setBounds(this.dom.elems[0]);
      this.setBounds(this.dom.elems[1]);
    });
  }

  setBounds(elems) {
    let w = 0;
    elems.forEach((el, index) => {
      const bounds = el.getBoundingClientRect(); // will return {bottom, heifght, left,right,top,width,x,y}

      el.style.position = "absolute";
      el.style.top = 0;
      el.style.left = `${w}px`;
      // Calculate the total width of all elements
      w = w + bounds.width;

      this.bounds.width = w;
      this.bounds.max = this.bounds.width - config.width;

      // console.log(this.bounds.width, this.bounds.max);

      if (this.data.total === index && elems === this.dom.elems[0]) {
        this.dom.content[0].style.width = `${w}px`;
        this.dom.content[1].style.width = `${w}px`;
        document.body.style.height = `${w}px`;
        // console.log(`hey, the height is: ${w}px`);
      }
    });
  }

  on() {
    // make sure the images are all loaded so we can calculate the body height correctly when user click the back button
    imagesLoaded(this.dom.content, instance => {
      this.setBounds(this.dom.elems[0]);
      this.setBounds(this.dom.elems[1]);
    });
    this.setStyles();
    // this.setBounds(this.dom.elems[0]);
    // this.setBounds(this.dom.elems[1]);
    this.addEvents();

    this.requestAnimationFrame();
  }

  setStyles() {
    // set the container to full width and height of the viewport and set position to"fix"
    this.dom.el.style.position = "fixed";
    this.dom.el.style.top = 0;
    this.dom.el.style.left = 0;
    this.dom.el.style.height = "100%";
    this.dom.el.style.width = "100%";
    this.dom.el.style.overflow = "hidden";
  }

  resize() {
    this.setBounds(this.dom.elems[0]);
    this.setBounds(this.dom.elems[1]);
    this.scroll();
  }

  addEvents() {
    window.addEventListener("scroll", this.scroll, { passive: true });

    // this.dom.el.addEventListener(
    //   "mousemove",
    //   e => {
    //     if (!this.state.dragging) return;

    //     this.drag(e);
    //   },
    //   { passive: true }
    // );

    // this.dom.el.addEventListener("mousedown", e => {
    // 	this.state.dragging = true;
    // 	this.data.on = e.clientX;
    // });

    // window.addEventListener("mouseup", () => {
    // 	this.state.dragging = false;
    // 	window.scrollTo(0, this.data.current);
    // });
  }

  scroll() {
    if (this.state.dragging) return;

    this.data.current = window.scrollY;
    this.clamp();
  }

  clamp() {
    // set 0 < this.data.current < this.bounds.max
    this.data.current = Math.min(
      Math.max(this.data.current, 0),
      this.bounds.max
    );
  }

  drag(e) {
    this.data.current = window.scrollY - (e.clientX - this.data.on);
    this.clamp();
  }

  requestAnimationFrame() {
    this.rAF = requestAnimationFrame(this.run);
  }

  run() {
    this.data.last.one = math.lerp(
      this.data.last.one,
      this.data.current,
      0.085
    );
    this.data.last.one = Math.floor(this.data.last.one * 100) / 100;

    this.data.last.two = math.lerp(this.data.last.two, this.data.current, 0.08);
    this.data.last.two = Math.floor(this.data.last.two * 100) / 100;

    const diff = this.data.current - this.data.last.one;
    const acc = diff / config.width;
    const velo = +acc;
    const bounce = 1 - Math.abs(velo * 0.25);
    const skew = velo * 7.5;

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
  }

  // resize() {
  //   this.setBounds();
  // }

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

  init() {
    this.preload();
    this.on();
  }
}

export default Smooth;
