import { gen } from './gen/gen'
import { apply } from './apply/apply'
import { convert } from './convert/convert'
import { genNum } from './utils'

export {
  GenOptions,
  ApplyQuery,
  Color,
  ColorTypes,
  ConvertOptions,
  GenNumOptions,
} from './types/global.types'

export { gen } from './gen/gen'
export { apply } from './apply/apply'
export { convert } from './convert/convert'
export { genNum } from './utils'

export default {
  gen,
  apply,
  convert,
  genNum,
}

// const color = gen({
//   type: 'rgb',
//   minR: 220,
//   minG: 220,
//   minB: 220,
// })

// console.log(
//   '%c<a href="https://npmjs.com/package/culler">culler</a>',
//   `color: ${color}; font-size: 2rem; font-weight: bold; background: #000; padding: 0.5rem 1rem;
//   border-radius: 0.5rem;`,
// )
