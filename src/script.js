import { gameobject } from "./scripts/gameobject.js";
import { canvas } from "./scripts/canvas.js";
import { LoadImages, LoadAudio } from "./scripts/loading.js";
import { Random, PlaySound } from "./scripts/utility.js";
import { Planet, Ship } from "./scripts/extendedGameObjects.js";

let score = 0;

const images = {
  // name, path
  planet: "./assets/images/center circle (defender).png",
  cursor: "./assets/images/crosshare.png",
  ship_off: "./assets/images/atacker.png",
  ship_on: "./assets/images/shielded_atacker.png",
};

const audio = {
  // name, path
  explosion: "./assets/sounds/Explosion.wav",
  shield: "./assets/sounds/shield.wav",
  shoot: "./assets/sounds/shoot.wav",
};

LoadImages(images);
LoadAudio(audio);

let cnv = new canvas("canvas");

cnv.resize();

const cursor = new gameobject({ x: 0, y: 0 }, 32, 32, images.cursor);
document.addEventListener("mousemove", (event) => {
  let pos = cnv.mousePosition(event);
  cursor.setPos(pos);
});

document.addEventListener("click", async (event) => {
  ship_array.forEach((ship) => {
    if (ship.collisionWithPoint(cursor.pos)) {
      if (!ship.immune) {
        PlaySound(audio.shield);
      }

      ship.immune = true;
    }
  });
});

const planet = new Planet(
  { x: cnv.canvas.width / 2, y: cnv.canvas.height / 2 },
  64,
  64,
  images.planet
);

let ship_array = [];

for (let i = 0; i < 5; i++) {
  let ship = new Ship(
    { x: Random(0, cnv.canvas.width), y: Random(0, cnv.canvas.height) },
    32,
    32,
    images.ship_off,
    images.ship_on,
    false
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
  cnv.context.strokeStyle = "#ff0000";
  cnv.context.moveTo(planet.pos.x, planet.pos.y);
  cnv.context.lineTo(planet_target.pos.x, planet_target.pos.y);
  cnv.context.stroke();

  planet.draw(cnv.context);
  ship_array.forEach((ship) => {
    ship.moveToward(planet.pos, ship.speed * Math.random());
    if (
      planet.distanceTo(planet_target.pos) >
      planet.distanceTo(ship.pos) * Random(1.2, 1.5, 0.1)
    ) {
      planet_target = ship;
    }

    if (planet.collisionWithPoint(ship.pos)) {
      if (ship.immune) {
        score += 1;
      }
      ship.setPos({
        x: Random(0, cnv.canvas.width),
        y: Random(0, cnv.canvas.height),
      });
      ship.immune = false;
      PlaySound(audio.explosion);
    }
    ship.draw(cnv.context);
  });

  //draw ui
  cnv.context.font = "30px Arial";
  cnv.context.fillText(score, cnv.canvas.width / 2, 30);
}, 1000 / 30);

const planet_fire = setInterval(async () => {
  if (Random(0, 1, 0.01) > 0.95) {
    if (!planet_target.immune) {
      planet_target.setPos({
        x: Random(0, cnv.canvas.width),
        y: Random(0, cnv.canvas.height),
      });
    }
    planet_target.immune = false;
    PlaySound(audio.shoot);
  }
}, 1000 / 5);
