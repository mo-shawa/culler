import { gen } from './gen/gen'
import { apply } from './apply/apply'
import { convert } from './convert/convert'
import { genNum } from './utils'

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

console.log(gen({ r: 0 }))
