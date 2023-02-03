"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var culler_exports = {};
__export(culler_exports, {
  genRGBA: () => genRGBA
});
module.exports = __toCommonJS(culler_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  genRGBA
});
