# culler

`culler` is a color utility library that helps users create, manipulate, convert, and apply colors. `culler` is written in `TypeScript` and ships with full type safety, and maintains backward compatibility with commonJS imports.

NOTE: `culler` is in early active development, and will see many breaking changes before version 1.0.0

### Features

- Generate a random `rgb`, `rgba`, or `hex` color string using `gen()`
- Convert Color values between formats, including from semi-transparent to solid colors using `convert()`
- Provide a clean syntax to apply a color to a CSS selector string, HTML Element, or an iterable containing HTML Elements with `apply()`
- It's TINY. This library is `significantly` smaller than 1 GB 🔥
- BONUS: Expose utility function `genNum()`, so you don't have to google how to google how to generate a random integer between 0 and 100 again, you could just do this instead:

```ts
culler.genNum({ max: 100, isInt: true })
```

### Built with

- TypeScript
- Love

## Getting started

### Prerequisites

- Node.js and NPM installed
- A project with a package.json

### Install

```bash
$ npm i culler
```

## Usage

```ts
// If you are using commonJS syntax:
const culler = require("culler")

// Using ESM:
import culler from "culler"

// Preference - you can also destructure the imports:
import { gen, apply, convert } from "culler"
```

#### Syntax

```ts
culler.apply(query: ApplyQuery, color: Color)

culler.gen(userOptions: genOptions)

culler.convert(color: Color, to: "rgb" | "rgba" | "hex")

culler.genNum(userOptions: genNumOptions)

/////////////
// TYPES ////
/////////////

type ApplyQuery =
	| HTMLElement
	| HTMLCollection
	| NodeList
	| NodeListOf<Element>
	| string // CSS selector string

type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

type Color = RGB | RGBA | HEX | CSSNamedColor

type ColorKeys = "rgb" | "rgba" | "hex"

type genOptions = {
	type?: ColorKeys  // type of color string generated   - default: rgba
	alpha?: boolean // Allow transparency                              - default: true
	minR?: number   // Minimum value to generate for the red channel   - default: 0
	maxR?: number   // Maximum value to generate for the red channel   - default: 255
	minG?: number	// Minimum value to generate for the green channel - default: 0
	maxG?: number	// Maximum value to generate for the green channel - default: 255
	minB?: number	// Minimum value to generate for the blue channel  - default: 0
	maxB?: number	// Maximum value to generate for the blue channel  - default: 255
	r?: number      // Explicitly set the value for the red channel    - default: undefined
	g?: number      // Explicitly set the value for the blue channel   - default: undefined
	b?: number      // Explicitly set the value for the green channel  - default: undefined
	a?: number      // Explicitly set the value for the alpha channel  - default: undefined
}

type genNumOptions = {
	min?: number      // minimum number                                - default: 0
	max?: number      // maximum number                                - default: 1
	isInt?: boolean   // false for float, true for int                 - default: false
	clamp?: number    // clamp num to this many decimal places (0-16)  - default: 2
}

type convertOptions = {
	color: Color
	to?: ColorKeys
}

```

## Examples

### `apply()`

```ts
// Using a Nodelist:
const cardEls = document.querySelectorAll(".card")
culler.apply(cardEls, "rgb(25, 12, 92)")

// Using a cached element:
const element = document.getElementbyId("my-id")
culler.apply(element, "#FF00FF") // element is now purple

// Using a CSS selector string:
culler.apply("ul > li:nth-child(3)", "aliceblue")
// Selects every third li descendant of a ul
// and sets their background-color property set to aliceblue
```

### `gen()`

```ts
const randomColor = culler.gen() // rgba(22, 118, 117, 0.75)
// gen accepts an options object
// If object is omitted, it will generate a random rgba string

const hexColor = culler.gen({ type: "hex" }) // #eb634a
// The full range of color is enabled by default

// This can be changed by clamping the maximum and minimum
// values for each color channel
const greenishColor = culler.gen({ type: "rgb", minG: 200 })
// Generates a green-dominant rgb color every time

// Conversely, you could explicitly set the `g` value to 0 to generate colors
// with no green tint to them whatsoever
const notGreenAtAll = culler.gen({ g: 0 }) // note that you can omit type,
// which will default to rgba
```

### `convert()`

```ts
const hexFromRgba = culler.convert("rgba(13, 35, 55, 0.7)", "hex") // #0d2337b2

const rgbFromHex = culler.convert("#F8DE0F", "rgb") // rgb(248, 222, 15)

// culler will preserve the effect of transparency
// when converting from a transparent format to rgb

const rgbFromRgba = culler.convert("rgba(154, 25, 118, 0.35)", "rgb") // rgb(219, 174, 207)
// the rgb color will be identical to the rgba overlayed on a white background
```

### `genNum()`

```ts
// culler uses genNum under the hood and ships with
// the code anyway, so I decided to make it available
// as a small utility to users

const floatBetween0and1 = culler.genNum()
// default behaviour behaves like Math.random() => float between 0 and 1

// but easily customizable:
const intBetween66and942 = culler.genNum({ min: 66, max: 942, isInt: true })

// You can also clamp the decimal places when generating floats:
const floatTo5DecimalPlaces = culler.genNum({ clamp: 5 })
```

### Extra examples

```ts
// Randomize color of element(s)
// (It's nice to destructure the exports in these and similar cases)
apply(element, gen())

// Independently randomize colors of a Nodelist (each having a unique random color)
const elements = document.querySelectorAll("div.my-class")

elements.forEach((el) => apply(el, gen()))
```

### Troubleshooting / Contact

Feel free to open an issue on this repo with bugs or suggestions :)

### Legal disclaimer

Usage of this tool for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state, and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program.

### To-do

- [x] Generate random `RGBA` string
- [x] Support for color formats
  - [x] rgb
  - [x] rgba
  - [x] Hex
    - [ ] Transparency
  - [ ] HSL/HSV
- [x] Apply Color value to query
  - [x] Apply to HTML Element
  - [x] Apply to CSS query
  - [x] Apply to iterables
    - [ ] Option to stagger color application on iterables
    - [ ] Delay option
  - [ ] Fade/tween color option
- [x] Figure out and apply reasonable decimal clamp for float values (alpha)
  - [x] Default float clamp is to 2 decimal places
- [x] Refactor `genRGBA` to `gen`, which will accept options, constraints etc
  - [x] Ability to clamp color between two values with `minR` and `maxR`, `minG` etc
  - [x] Ability to explicitly set a value for a channel with `r`, `g`, and `b`
  - [x] Allow or disable transparency for formats that support `alpha` channel
    - [x] rgba
    - [ ] Hex
- [x] Conversion between formats (`rbga` to `HSL`, `Hex` etc)
  - [x] Respect `alpha` value when converting from `rgba` to `rgb`, for example
- [ ] Move usage, syntax etc. details out of readme into dedicated documentation
