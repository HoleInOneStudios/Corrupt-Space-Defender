import { gameobject } from "./gameobject.js";
import { MakeImage } from "./utility.js";

class Planet extends gameobject {
  constructor({ x, y }, width, height, image_path, hitbox_shown = false) {
    super({ x, y }, width, height, image_path, hitbox_shown);
  }
}

class Ship extends gameobject {
  constructor(
    { x, y },
    width,
    height,
    image_path,
    immune_image_path,
    hitbox_shown = false
  ) {
    super({ x, y }, width, height, image_path, hitbox_shown);
    this.speed = 1;
    this.immune = false;
    this.immune_image_path = immune_image_path;
  }

  draw(context) {
    if (this.immune) {
      let pos = this.topCornerCoords();
      context.drawImage(
        MakeImage(this.immune_image_path),
        pos.x,
        pos.y,
        this.width,
        this.height
      );

      if (this.hitbox_shown) {
        this.drawHitbox(context);
      }
    } else {
      super.draw(context);
    }
  }
}

export { Planet, Ship };
