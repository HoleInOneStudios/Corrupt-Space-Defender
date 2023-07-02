// Grabbing the Canvas Element and Context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Canvas Settings
const width = 640;
const height = 360;
const background_color = "#ffffff";

const default_stroke_color = "#000000";
const default_fill_color = "#000000";
const default_line_width = 1;

const fps = 60;

// Assets Table
const image_table = {
  // image_name: image_path,
  red_arrow: "./assets/images/red_arrow.png",
};

const sound_table = {
  // sound_name: sound_path,
  explosion: "./assets/sounds/explodemini.wav",
};

const font_table = {
  // font_name: font_path,
};

// Preloading
async function preload() {
  // Preload Images
  for (const image_name in image_table) {
    fetch(image_table[image_name]).finally(() => {
      console.log(`Loaded ${image_name} from ${image_table[image_name]}`);
    });
  }

  // Preload Sounds
  for (const sound_name in sound_table) {
    fetch(sound_table[sound_name]).finally(() => {
      console.log(`Loaded ${sound_name} from ${sound_table[sound_name]}`);
    });
  }

  // Preload Fonts
  for (const font_name in font_table) {
    fetch(input_table[font_name]).finally(() => {
      console.log(`Loaded ${font_name} from ${font_table[font_name]}`);
    });
  }
}

// Canvas Utility Functions
function setCanvasSize() {
  canvas.width = width;
  canvas.height = height;
}

function clearCanvas() {
  ctx.fillStyle = background_color;
  ctx.fillRect(0, 0, width, height);

  resetStyles();
}

function resetStyles() {
  ctx.strokeStyle = default_stroke_color;
  ctx.fillStyle = default_fill_color;
  ctx.lineWidth = default_line_width;
}

function drawImage(image_name, _x, _y, hitbox = false) {
  image = new Image();
  image.src = image_name;

  _x = _x - image.width / 2;
  _y = _y - image.height / 2;

  ctx.drawImage(image, _x, _y);

  if (hitbox) {
    ctx.strokeStyle = "#ff0000";
    ctx.strokeRect(_x, _y, image.width, image.height);
  }

  console.log(
    `Drew ${image_name} at (${_x}, ${_y}) ${hitbox ? "with" : "without"} hitbox`
  );
}

// Game Loop

function gameLoop() {
  clearCanvas();
  resetStyles();

  drawImage(image_table.red_arrow, 50, 50, true);
}

// Start Game
preload();
setCanvasSize();
setInterval(gameLoop, 1000 / fps);
