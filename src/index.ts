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
