function Random(start, end, step = 1) {
  if (step === void 0) {
    step = 1;
  }
  return (
    Math.floor((Math.random() * (end - start + step)) / step) * step + start
  );
}

function PlaySound(sound) {
  var audio = new Audio(sound);
  audio.play();
}

function MakeImage(image) {
  let img = new Image();
  img.src = image;
  return img;
}

export { Random, PlaySound, MakeImage };
