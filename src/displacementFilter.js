import * as PIXI from "pixi.js";

function initFilter(productImage = "/images/1.jpg", wrapperId = "canvas-1") {
  let raf, canvas;

  // Application
  let app = new PIXI.Application({
    width: window.innerWidth / 2.5,
    height: window.innerWidth / 2.5,
    transparent: true
  });
  const wrapperElement = document.getElementById(wrapperId);
  wrapperElement.appendChild(app.view);

  // Stage
  app.stage.interactive = true;

  // Container
  const container = new PIXI.Container();
  app.stage.addChild(container);

  // Background
  //const background = PIXI.Sprite.fromImage("https://unsplash.it/600/?random");
  //const background = PIXI.Sprite.fromImage("/images/1.jpg");

  const background = new PIXI.Sprite.from(productImage);
  container.addChild(background);
  background.x = 10;
  background.y = 10;
  background.scale.set(0.5, 0.5);

  // Filter
  const displacementSprite = new PIXI.Sprite.from("/images/displacement.png");
  // const displacementSprite = PIXI.Sprite.fromImage(
  //   "http://i.imgur.com/2yYayZk.png"
  // );
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
    startAnimation: function startAnimation() {
      canvas = wrapperElement.querySelector("canvas");
      raf = requestAnimationFrame(startAnimation);
      if (displacementFilter.scale.x < 10) {
        displacementFilter.scale.x += 0.2;
        displacementFilter.scale.y += 0.2;
        // console.log("hey");
      }
      displacementSprite.x += 1.2;
      if (displacementSprite.x > displacementSprite.width) {
        displacementSprite.x = 0;
      }
      displacementSprite.y += 0.8;
      if (displacementSprite.y > displacementSprite.height) {
        displacementSprite.y = 0;
      }
    },

    removeScene: function removeScene() {
      cancelAnimationFrame(raf);
      container.removeChildren();
      container.destroy(true);
      wrapperElement.removeChild(canvas);
      app = null;
    }
  };
}

export default initFilter;
