import { gameobject } from "./scripts/gameobject.js";
import { canvas } from "./scripts/canvas.js";
import { LoadImages, LoadAudio } from "./scripts/loading.js";
import { Random } from "./scripts/utility.js";

import { Planet, Ship } from "./scripts/extendedGameObjects.js";

let score = 0;

const images = {
  // name, path
  red_arrow: "./assets/images/red_arrow.png",
  cursor: "./assets/images/cursor.png",
  ship_off: "./assets/images/ship_off.png",
  ship_on: "./assets/images/ship_on.png",
};

const audio = {
  // name, path
  explosion: "./assets/sounds/explodemini.wav",
};

LoadImages(images);
LoadAudio(audio);

let cnv = new canvas("canvas");

cnv.resize();

const cursor = new gameobject(0, 0, 32, 32, images.cursor, true);
document.addEventListener("mousemove", (event) => {
  let pos = cnv.mousePosition(event);
  cursor.setPos(pos);
});

document.addEventListener("click", async (event) => {
  ship_array.forEach((ship) => {
    if (ship.collisionWithPoint(cursor.pos.x, cursor.pos.y)) {
      ship.immune = true;
    }
  });
});

const planet = new Planet(
  cnv.canvas.width / 2,
  cnv.canvas.height / 2,
  64,
  64,
  images.red_arrow,
  true
);

let ship_array = [];

for (let i = 0; i < 5; i++) {
  let ship = new Ship(
    Random(0, cnv.canvas.width),
    Random(0, cnv.canvas.height),
    32,
    32,
    images.ship_off,
    true,
    images.ship_on
  );
  ship_array.push(ship);
}

let planet_target = ship_array[0];

const gameloop = setInterval(async () => {
  cnv.resetContext();
  cnv.clear();
  cnv.background();
  cnv.resetContext();
  //cnv.drawGrid();

  //mouse cursor
  cursor.draw(cnv.context);

  // Your code goes here

  // draw everything
  cnv.context.beginPath();
  cnv.context.moveTo(planet.pos.x, planet.pos.y);
  cnv.context.lineTo(planet_target.pos.x, planet_target.pos.y);
  cnv.context.stroke();

  planet.draw(cnv.context);
  ship_array.forEach((ship) => {
    ship.moveTo(planet.pos.x, planet.pos.y, ship.speed * Math.random());
    if (
      planet.distanceTo(planet_target.pos.x, planet_target.pos.y) >
      planet.distanceTo(ship.pos.x, ship.pos.y) * Random(1.2, 1.5, 0.1)
    ) {
      planet_target = ship;
    }

    if (planet.collisionWithPoint(ship.pos.x, ship.pos.y)) {
      if (ship.immune) {
        score += 1;
      }
      ship.setPos({
        x: Random(0, cnv.canvas.width),
        y: Random(0, cnv.canvas.height),
      });
      ship.immune = false;
    }
    ship.draw(cnv.context);
  });

  //draw ui
  cnv.context.font = "30px Arial";
  cnv.context.fillText(score, cnv.canvas.width / 2, 30);
}, 1000 / 30);

const planet_fire = setInterval(async () => {
  let distance = planet.distanceTo(planet_target.pos.x, planet_target.pos.y);

  if (Random(0, 1, 0.01) > 0.95) {
    if (!planet_target.immune) {
      planet_target.setPos({
        x: Random(0, cnv.canvas.width),
        y: Random(0, cnv.canvas.height),
      });
    }
    planet_target.immune = false;
  }
}, 1000 / 5);
