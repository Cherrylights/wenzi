import * as PIXI from "pixi.js";
import { TweenMax } from "gsap/TweenMax";
import { ShockwaveFilter } from "@pixi/filter-shockwave";

function initFilter(
  productImage = "/assets/images/1.jpg",
  wrapperId = "canvas-default"
) {
  let canvas;
  // Application
  let app = new PIXI.Application({
    width: window.innerWidth / 2.5,
    height: window.innerWidth / 2.5,
    antialias: true,
    transparent: true
  });
  const wrapperElement = document.getElementById(wrapperId);
  wrapperElement.appendChild(app.view);

  // Stage
  app.stage.interactive = true;

  // Container
  const container = new PIXI.Container();
  app.stage.addChild(container);

  // Image
  const image = new PIXI.Sprite.from(productImage);
  container.addChild(image);
  image.x = 5;
  image.y = 5;
  image.scale.set(0.5, 0.5);
  image.width = app.renderer.width - 10;
  image.height = app.renderer.height - 10;

  // Find Canvas Element
  canvas = wrapperElement.querySelector("canvas");

  // TweenMax.to(shockwaveFilter, 2, {
  //   time: 0,
  //   repeat: -1,
  //   ease: "Power2.easeInOut"
  // });

  // const dispSprite = PIXI.Sprite.from("/assets/images/displacement.jpg");
  // dispSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  // const dispFilter = new PIXI.filters.DisplacementFilter(dispSprite);
  // dispFilter.padding = 2;
  // dispFilter.scale.x = 10;
  // dispFilter.scale.y = 10;
  // dispFilter.position = image.position;
  // image.filters = [dispFilter];
  // app.stage.addChild(dispSprite);

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
      // image.scale.set(1, 1);
      newImage.width = app.renderer.width - 10;
      newImage.height = app.renderer.height - 10;

      // Filter
      const shockwaveFilter = new ShockwaveFilter(
        [newImage.width / 2, newImage.height / 2],
        {
          amplitude: 1.5,
          wavelength: 230,
          time: 0
        }
      );
      app.stage.filters = [shockwaveFilter];
      TweenMax.to(shockwaveFilter, 2, {
        time: 1,
        amplitude: 1,
        wavelength: 280,
        ease: "Power1.easeOut"
      });

      // tl.to(
      //   dispFilter.scale,
      //   0.65,
      //   {
      //     x: 70,
      //     y: 70,
      //     ease: "Power2.easeInOut"
      //   },
      //   0
      // ).to(
      //   dispFilter.scale,
      //   0.65,
      //   {
      //     x: 0,
      //     y: 0,
      //     ease: "Power2.easeInOut"
      //   },
      //   0.65
      // );
    },

    removeScene: function removeScene() {
      container.removeChildren();
      container.destroy(true);
      wrapperElement.removeChild(canvas);
      app = null;
    }
  };
}

export default initFilter;
