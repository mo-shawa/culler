# culler

## 0.4.0

### Minor Changes

- Add support for hex transparency

## 0.3.2

### Patch Changes

- fix set explicit color value to 0 bug, "r", "g", and "b" options for gen work as intended when passed 0 as a value

## 0.3.1

### Patch Changes

- modularize source + update readme

## 0.3.0

### Minor Changes

- - Add convert function
    - supports rgb, rgba and hex
    - preserves the effect of transparency when converting from a value with an alpha value to one that doesn't.
      - (for example, if you convert a semi-transparent `rgba` to `rgb`, the `rgb` color will be effectively identical to the `rgba` overlayed on a white background )

## 0.2.7

### Patch Changes

- forgot to save index.ts lol
- add genNum to default export too

## 0.2.6

### Patch Changes

- Undo fix nonexistent bug, expose genNum utility function

## 0.2.5

### Patch Changes

- remove destructuring aliasing, suspect root of bug

## 0.2.4

### Patch Changes

- update for npm

## 0.2.3

### Patch Changes

- Allow set explicit R,G,B values

## 0.2.2

### Patch Changes

- allow setting explicit alpha in gen()

## 0.2.1

### Patch Changes

- Update readme + export genOptions type

## 0.2.0

### Minor Changes

- gen has functionality to generate a random rgb, rgba or hex value, and accepts options allowing the user to set the min and max values of any color channel, as well as enable or disable transparency
- culler.genRGBA has been removed. using culler.gen wihout specifying options works identically to genRGBA

### Patch Changes

- 02fc229: Add `gen` function, supports formats rgb and rgba, and value clamp options
- Narrow gen return type to Color

## 0.1.0

### Minor Changes

- c8a98fc: Add apply function, begin strong typing + expose default export

### Patch Changes

- 1a34fcc: add publish workflow
- 22c6d44: Removed unecessary bloat from package, fleshing out package.json"
- 0a43797: bump package patch
