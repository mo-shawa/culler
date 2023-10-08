import type { GenOptions, Color } from '../types/global.types'
import { genNum } from '../utils'

export function gen(userOptions: GenOptions = {}): Color {
  const defaultOptions: GenOptions = {
    type: 'rgba',
    minR: 0,
    minG: 0,
    minB: 0,
    maxR: 255,
    maxG: 255,
    maxB: 255,
    alpha: true,
  }

  const options: GenOptions = Object.assign(defaultOptions, userOptions)

  const { type, minR, minG, minB, maxR, maxG, maxB, alpha, r: setR, g: setG, b: setB, a: setA, range } = options

  const getRange = () => {
    if (!range || range[0] < 0 || range[1] > 255) throw new Error('Range values must be between 0 and 255')
    if (range[0] > range[1]) throw new Error('Range values must be in ascending order')

    return genNum({ min: range![0], max: range![1], isInt: true })
  }

  const [r, g, b, a] = range
    ? [getRange(), getRange(), getRange(), 1]
    : [
        setR !== undefined ? setR : genNum({ min: minR, max: maxR, isInt: true }),
        setG !== undefined ? setG : genNum({ min: minG, max: maxG, isInt: true }),
        setB !== undefined ? setB : genNum({ min: minB, max: maxB, isInt: true }),
        setA !== undefined ? setA : alpha ? genNum({ isInt: false }) : 1,
      ]

  if (type === 'rgb') return `rgb(${r}, ${g}, ${b})`

  if (type === 'rgba') {
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  if (type === 'hex') {
    const hexA = Math.floor(a * 255)
      .toString(16)
      .padStart(2, '0')

    const [hexR, hexG, hexB] = [
      r.toString(16).padStart(2, '0'),
      g.toString(16).padStart(2, '0'),
      b.toString(16).padStart(2, '0'),
      a.toString(16).padStart(2, '0'),
    ]

    let output: Color = alpha ? `#${hexR}${hexG}${hexB}${hexA}` : `#${hexR}${hexG}${hexB}`

    return output
  }

  return 'rgb(0, 0, 0)' // default
}
