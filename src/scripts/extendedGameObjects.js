import { gameobject } from "./gameobject.js";

class Planet extends gameobject {
  constructor(x, y, width, height, image_path, hitbox_shown = false) {
    super(x, y, width, height, image_path, hitbox_shown);
  }
}

class Ship extends gameobject {
  constructor(
    x,
    y,
    width,
    height,
    image_path,
    hitbox_shown = false,
    immune_image_path
  ) {
    super(x, y, width, height, image_path, hitbox_shown);
    this.speed = 1;
    this.immune = false;
    this.immune_image_path = immune_image_path;
  }

  draw(context) {
    if (this.immune) {
      let image = new Image();
      image.src = this.immune_image_path;
      let pos = {
        x: this.pos.x - this.width / 2,
        y: this.pos.y - this.height / 2,
      };
      context.drawImage(image, pos.x, pos.y, this.width, this.height);
    } else {
      super.draw(context);
    }
  }
}

export { Planet, Ship };
