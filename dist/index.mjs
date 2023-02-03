// index.ts
function genRGBA() {
  const [r, g, b, a] = [
    genNumBetween(0, 255),
    genNumBetween(0, 255),
    genNumBetween(0, 255),
    genNumBetween(0, 1, true)
  ];
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function genNumBetween(min, max, isFloat = false) {
  const num = Math.random() * max - min;
  return isFloat ? num : Math.floor(num);
}
export {
  genRGBA
};
