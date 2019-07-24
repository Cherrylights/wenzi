import { TimelineMax } from "gsap";

function createTimelines() {
  //create a TimelineLite that repeat itself
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

export default createTimelines;
