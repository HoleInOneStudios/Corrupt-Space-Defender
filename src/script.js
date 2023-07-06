import { gameobject } from "./scripts/gameobject.js";
import { canvas } from "./scripts/canvas.js";
import { LoadImages, LoadAudio } from "./scripts/loading.js";

const images = {
  // name, path
  red_arrow: "./assets/images/red_arrow.png",
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

const gameloop = setInterval(async () => {
  cnv.clear();
  cnv.background();
  cnv.resetContext();

  // Your code goes here
  arrow.draw(cnv.context);
}, 1000 / 60);
