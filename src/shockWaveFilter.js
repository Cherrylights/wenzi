import * as PIXI from "pixi.js";
import { TweenMax } from "gsap/TweenMax";
import { ShockwaveFilter } from "@pixi/filter-shockwave";

function initFilter(
  productImage = "/assets/images/1.jpg",
  wrapperId = "canvas-default",
  aspectRatio = 1
) {
  let canvas;

  // Application
  let app = new PIXI.Application({
    width: document.getElementById(wrapperId).offsetWidth,
    height: document.getElementById(wrapperId).offsetWidth / aspectRatio,
    antialias: true,
    transparent: true
  });
  const wrapperElement = document.getElementById(wrapperId);
  wrapperElement.appendChild(app.view);

  // Stage
  // app.stage.interactive = true;

  // Container
  const container = new PIXI.Container();
  app.stage.addChild(container);

  // Image
  const image = new PIXI.Sprite.from(productImage);
  container.addChild(image);
  image.x = 5;
  image.y = 5;
  image.scale.set(1, 1);
  image.width = app.renderer.width - 10;
  image.height = app.renderer.height - 10;

  // Find Canvas Element
  canvas = wrapperElement.querySelector("canvas");

  return {
    startAnimation: function startAnimation(productImage, title) {
      // loader.add(`image-${title}`, image);
      // loader.load(() => {
      //   image.texture = PIXI.utils.TextureCache[`image-${title}`];
      // });
      container.removeChild(image);
      const newImage = new PIXI.Sprite.from(productImage);
      container.addChild(newImage);
      newImage.x = 5;
      newImage.y = 5;
      newImage.width = app.renderer.width - 10;
      newImage.height = app.renderer.height - 10;

      // Filter
      const shockwaveFilter = new ShockwaveFilter(
        [-image.width / 2, -image.height / 6],
        {
          // amplitude: 2.5,
          amplitude: image.width * 0.0083,
          // wavelength: 400,
          wavelength: image.width * 1.33,
          time: 0
        }
      );
      app.stage.filters = [shockwaveFilter];
      TweenMax.to(shockwaveFilter, 4, {
        // time: 1.47,
        time: image.width * 0.004,
        // amplitude: 3.3,
        amplitude: image.width * 0.011,
        // wavelength: 100,
        wavelength: image.width * 0.33,
        ease: "Power3.easeOut"
      });
    },

    removeScene: function removeScene() {
      container.removeChildren();
      container.destroy(true);
      app = null;
      wrapperElement.removeChild(canvas);
    }
  };
}

export default initFilter;
