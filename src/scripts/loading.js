async function LoadImages(list) {
  for (const key in list) {
    fetch(list[key]).finally(() => {
      console.log(`Loaded ${key}`);
    });
  }
}

async function LoadAudio(list) {
  for (const key in list) {
    fetch(list[key]).finally(() => {
      console.log(`Loaded ${key}`);
    });
  }
}

export { LoadImages, LoadAudio };
