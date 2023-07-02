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

const gameloop = setInterval(() => {
  cnv.clear();
  cnv.background();
  cnv.resetContext();

  // Your code goes here
}, 1000 / 60);
