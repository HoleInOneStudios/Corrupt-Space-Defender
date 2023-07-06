function Random(start, end, step = 1) {
  if (step === void 0) {
    step = 1;
  }
  return (
    Math.floor((Math.random() * (end - start + step)) / step) * step + start
  );
}

export { Random };
