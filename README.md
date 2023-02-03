# Culler

`Culler` is a tiny JavaScript Library that does everything you need it to do, if all you need it to do is generate an `RGBA` string 🎨

### Features

- `Culler` currently only serves one purpose, which is to generate a random `RGBA` string using it's solitary exposed function, `genRGBA()`.
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

### Usage

If you are using commonJS syntax:

```js
const { genRGBA } = require('culler')

const randomColor = genRGBA() // rgba(22, 118, 117, 0.75)
const anotherColor = genRGBA() // rgba(137, 129, 49, 0.49)
```

Using ESM

```js
import { genRGBA } from 'culler'

const randomColor = genRGBA() // rgba(22, 118, 117, 0.75)
const anotherColor = genRGBA() // rgba(137, 129, 49, 0.49)
```

### Troubleshooting / Contact

Feel free to open an issue on this repo with bugs or suggestions :)

### Legal disclaimer

Usage of this tool for attacking targets without prior mutual consent is illegal. It is the end user's responsibility to obey all applicable local, state, and federal laws. Developers assume no liability and are not responsible for any misuse or damage caused by this program.

### To-do

- [x] Generate random `RGBA` string
- [ ] Figure out and apply reasonable decimal clamp for float values (alpha)
- [ ] Refactor `genRGBA` to accept options, constraints etc.
- [ ] Conversion between formats (`rbga` to `HSL`, `Hex` etc)
