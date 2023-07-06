class gameobject {
  constructor(x = 0, y = 0, width, height, image_path, hitbox_shown = false) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image_path = image_path;
    this.hitbox_shown = hitbox_shown;
  }

  draw(context) {
    let image = new Image();
    image.src = this.image_path;

    let pos = {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
    };

    context.drawImage(image, pos.x, pos.y, this.width, this.height);

    if (this.hitbox_shown) {
      context.strokeStyle = "#ff0000";
      context.strokeRect(pos.x, pos.y, this.width, this.height);
    }
  }

  collisionWithPoint(x, y) {
    let pos = {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
    };

    if (
      x > pos.x &&
      x < pos.x + this.width &&
      y > pos.y &&
      y < pos.y + this.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export { gameobject };
