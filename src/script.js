import { gameobject } from "./scripts/gameobject.js";
import { canvas } from "./scripts/canvas.js";
import { LoadImages, LoadAudio } from "./scripts/loading.js";
import { Random } from "./scripts/utility.js";

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

let arrow_array = [];
for (let i = 0; i < 10; i++) {
  arrow_array.push(
    new gameobject(
      Random(0, cnv.canvas.width),
      Random(0, cnv.canvas.height),
      32,
      32,
      images.red_arrow,
      true
    )
  );
}

const cursor = new gameobject(0, 0, 32, 32, images.cursor, true);

document.addEventListener("mousemove", (event) => {
  let pos = cnv.mousePosition(event);
  cursor.setPos(pos);
});

document.addEventListener("click", async (event) => {
  arrow_array.forEach((arrow) => {
    if (arrow.collisionWithPoint(cursor.pos.x, cursor.pos.y)) {
      arrow.collision();
      arrow.setPos({
        x: Random(0, cnv.canvas.width),
        y: Random(0, cnv.canvas.height),
      });
      //play sounds
      let sound = new Audio(audio.explosion);
      sound.play();

      return;
    }
  });
});

const gameloop = setInterval(async () => {
  cnv.resetContext();
  cnv.clear();
  cnv.background();
  //cnv.drawGrid();

  //mouse cursor
  cursor.draw(cnv.context);

  // Your code goes here
  arrow_array.forEach((arrow) => {
    arrow.draw(cnv.context);
  });
}, 1000 / 60);
