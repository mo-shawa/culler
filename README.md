# culler

`culler` is a tiny JavaScript Library that does everything you need it to do, if all you need it to do is generate an `RGBA` string 🎨

NOTE: `culler` is in early active development, and will see many breaking changes before version 1.0.0

### Features

- `culler` currently only serves ~~one purpose~~ two purposes:
  - Generate a random `RGBA` string using `genRGBA()`
  - Provide a clean syntax to apply a color to a CSS selector string, HTML Element, or an iterable containing HTML Elements.
- It's TINY. This library is `significantly` smaller than 1 GB 🔥

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

// Using ESM
import culler from "culler"

// Preference: you can also destructure the imports
import { genRGBA, apply } from "culler"
```

#### Syntax

```ts
culler.apply(query: ApplyQuery, color: Color)

culler.genRGBA() // no options implemented as of 0.1.0

type ApplyQuery =
	| HTMLElement
	| HTMLCollection
	| NodeList
	| NodeListOf<Element>
	| string // CSS selector string

type Color = RGB | RGBA | HEX | CSSNamedColor
```

## Examples

### `apply`

```ts
// Using a Nodelist
const cardEls = document.querySelectorAll(".card")
culler.apply(cardEls, "rgb(25, 12, 92)")

// Using a cached element
const element = document.getElementbyId("my-id")
culler.apply(element, "#FF00FF") // element is now purple

// Using a CSS selector string
culler.apply("ul > li:nth-child(3)", "aliceblue") // Every third li descendant of a ul has their background-color property set to aliceblue
```

### `genRGBA`

```ts
const randomColor = genRGBA() // rgba(22, 118, 117, 0.75)
const anotherColor = genRGBA() // rgba(137, 129, 49, 0.49)
```

### Extra examples

```ts
// Randomize color of element(s)
// (it's nice to destructure the exports in these and similar cases)
apply(element, genRGBA())

// Independently randomize colors of a Nodelist (each having a unique random color)
const elements = document.querySelectorAll("div.my-class")

elements.forEach((el) => apply(el, genRGBA()))
```

### Troubleshooting / Contact

Feel free to open an issue on this repo with bugs or suggestions :)

### Legal disclaimer

Usage of this tool for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state, and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program.

### To-do

- [x] Generate random `RGBA` string
- [x] Apply Color value to query
- [x] Figure out and apply reasonable decimal clamp for float values (alpha)
  - Default float clamp is to 2 decimal places
- [ ] Refactor `genRGBA` to `gen`, which will accept options, constraints etc
- [ ] Conversion between formats (`rbga` to `HSL`, `Hex` etc)
