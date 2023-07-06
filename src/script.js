import { gameobject } from "./scripts/gameobject.js";
import { canvas } from "./scripts/canvas.js";
import { LoadImages, LoadAudio } from "./scripts/loading.js";

const images = {
  // name, path
  red_arrow: "./assets/images/red_arrow.png",
  cursor: "./assets/images/cursor.png",
};

const audio = {
  // name, path
  explosion: "./assets/sounds/explodemini.wav",
};

LoadImages(images);
LoadAudio(audio);

let cnv = new canvas("canvas");

cnv.resize();

const arrow = new gameobject(50, 50, 32, 32, images.red_arrow, true);
const cursor = new gameobject(0, 0, 32, 32, images.cursor, false);

document.addEventListener("mousemove", (event) => {
  let pos = cnv.mousePosition(event);
  cursor.setPos(pos);
});

const gameloop = setInterval(async () => {
  cnv.resetContext();
  cnv.clear();
  cnv.background();
  //cnv.drawGrid();

  //mouse cursor
  cursor.draw(cnv.context);

  // Your code goes here
  arrow.draw(cnv.context);
}, 1000 / 60);
