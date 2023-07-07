import { gameobject } from "./scripts/gameobject.js";
import { canvas } from "./scripts/canvas.js";
import { Random, PlaySound, LoadImages, LoadAudio } from "./scripts/utility.js";
import { Planet, Ship } from "./scripts/extendedGameObjects.js";

let score = 0;

/**
 * Image Table (name, path)
 */
const images = {
  planet: "./assets/images/center circle (defender).png",
  cursor: "./assets/images/crosshare.png",
  ship_off: "./assets/images/atacker.png",
  ship_on: "./assets/images/shielded_atacker.png",
};

/**
 * Audio Table (name, path)
 */
const audio = {
  explosion: "./assets/sounds/Explosion.wav",
  shield: "./assets/sounds/shield.wav",
  shoot: "./assets/sounds/shoot.wav",
};

// Load Images and Audio
LoadImages(images);
LoadAudio(audio);

/**
 * Game Area
 */
let cnv = new canvas("canvas");

// Resize canvas to fit window
cnv.resize();

/**
 * Mouse Cursor
 */
const cursor = new gameobject({ x: 0, y: 0 }, 32, 32, images.cursor);
document.addEventListener("mousemove", (event) => {
  let pos = cnv.mousePosition(event);
  cursor.setPos(pos);
});

/**
 * Game Objects
 * @type {Planet}
 */
const planet = new Planet(
  { x: cnv.canvas.width / 2, y: cnv.canvas.height / 2 },
  64,
  64,
  images.planet
);

/**
 * Ship Array
 * @type {Array<Ship>}
 */
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

/**
 * Planet's Target
 * @type {Ship}
 */
let target = ship_array[0];

/**
 * Mouse Click Event
 * @type {Event}
 */
const mouse_click = document.addEventListener("click", async (event) => {
  ship_array.forEach((ship) => {
    if (ship.collisionWithPoint(cursor.pos)) {
      if (!ship.immune) {
        PlaySound(audio.shield);
      }

      ship.immune = true;
    }
  });
});

/**
 * Game Loop
 * @type {Interval}
 * @description This is where the game logic goes
 */
const gameloop = setInterval(async () => {
  cnv.resetContext();
  cnv.clear();
  cnv.background();
  cnv.resetContext();
  //cnv.drawGrid();

  //mouse cursor
  cursor.draw(cnv.context);

  // Draw line from planet to target
  cnv.context.beginPath();
  cnv.context.strokeStyle = "#ff0000";
  cnv.context.moveTo(planet.pos.x, planet.pos.y);
  cnv.context.lineTo(target.pos.x, target.pos.y);
  cnv.context.stroke();

  // Draw Planet
  planet.draw(cnv.context);
  ship_array.forEach((ship) => {
    // move ship's toward planet
    ship.moveToward(planet.pos, ship.speed * Math.random());

    // if ship is closer to target than planet, set target to ship
    if (
      planet.distanceTo(target.pos) >
      planet.distanceTo(ship.pos) * Random(1.2, 1.5, 0.1)
    ) {
      target = ship;
    }

    // if ship collide with planet, reset ship position and if ship is immune, add score
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

    // draw ship
    ship.draw(cnv.context);
  });

  //draw ui
  cnv.context.font = "30px space";
  cnv.context.textAlign = "center";
  cnv.context.fillText("score: " + score, cnv.canvas.width / 2, 30);
}, 1000 / 30);

/**
 * Planet's Fire
 * @type {Interval}
 * @description Planet will fire at the target
 */
const planet_fire = setInterval(async () => {
  if (Random(0, 1, 0.01) > 0.9) {
    if (!target.immune) {
      target.setPos({
        x: Random(0, cnv.canvas.width),
        y: Random(0, cnv.canvas.height),
      });
    }
    target.immune = false;
    PlaySound(audio.shoot);
  }
}, 1000 / 5);
