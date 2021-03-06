import * as PIXI from "pixi.js";

function initFilter(
  productImage = "/assets/images/1.jpg",
  wrapperId = "canvas-default"
) {
  let raf, canvas;

  // Application
  let app = new PIXI.Application({
    width: document.getElementById(wrapperId).offsetWidth,
    height: document.getElementById(wrapperId).offsetWidth,
    antialias: true,
    transparent: true,
    resolution: 1
  });
  const wrapperElement = document.getElementById(wrapperId);
  wrapperElement.appendChild(app.view);

  // Stage
  // app.stage.interactive = true;

  // Container
  const container = new PIXI.Container();
  app.stage.addChild(container);

  // Background
  const background = new PIXI.Sprite.from(productImage);
  container.addChild(background);
  background.x = 5;
  background.y = 5;
  background.scale.set(1, 1);
  background.width = app.renderer.width - 10;
  background.height = app.renderer.height - 10;

  // setTimeout(() => {
  //   const loader = new PIXI.Loader();
  //   loader.add("img", "/images/product-placeholder.jpg");
  //   loader.load(() => {
  //     background.texture = PIXI.utils.TextureCache["img"];
  //   });
  // }, 5000);

  // Filter
  const displacementSprite = new PIXI.Sprite.from(
    "/assets/images/displacement.png"
  );
  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  const displacementFilter = new PIXI.filters.DisplacementFilter(
    displacementSprite
  );
  displacementFilter.padding = 2;
  displacementFilter.scale.x = 0;
  displacementFilter.scale.y = 0;
  displacementSprite.position = background.position;

  background.filters = [displacementFilter];
  app.stage.addChild(displacementSprite);

  return {
    changeImage: function(productImage) {
      container.removeChild(background);
      const newImage = new PIXI.Sprite.from(productImage);
      container.addChild(newImage);
      newImage.x = 5;
      newImage.y = 5;
      newImage.scale.set(1, 1);
      newImage.width = app.renderer.width - 10;
      newImage.height = app.renderer.height - 10;
      newImage.filters = [displacementFilter];
    },
    startAnimation: function startAnimation() {
      canvas = wrapperElement.querySelector("canvas");
      raf = requestAnimationFrame(startAnimation);
      if (displacementFilter.scale.x < 8) {
        displacementFilter.scale.x += 0.2;
        displacementFilter.scale.y += 0.2;
      }
      displacementSprite.x += 1.7;
      if (displacementSprite.x > displacementSprite.width) {
        displacementSprite.x = 0;
      }
      displacementSprite.y += 1.3;
      if (displacementSprite.y > displacementSprite.height) {
        displacementSprite.y = 0;
      }
    },

    removeScene: function removeScene() {
      cancelAnimationFrame(raf);
      container.removeChildren();
      container.destroy(true);
      app = null;
      wrapperElement.removeChild(canvas);
    }
  };
}

export default initFilter;
