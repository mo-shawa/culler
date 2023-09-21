import type { Color, ColorTypes, ColorTuple } from '../types/global.types'
import { getColorFormat, preserveTransparency } from '../utils'

export function convert(color: Color, to: ColorTypes = 'rgb'): Color {
  const format = getColorFormat(color)

  if (format === 'rgba') {
    const subStrStart = color.indexOf('(') + 1
    const subStrEnd = color.indexOf(')')
    const colorValueString = color.trim().substring(subStrStart, subStrEnd)

    const stringArray = colorValueString.split(',')
    const numberArray = stringArray.map((str: string) => Number(str)) as ColorTuple<number>

    if (to === 'hex') {
      numberArray[3] = Math.floor(numberArray[3]! * 255)
      const hexArray = numberArray.map((num: number) => num.toString(16)) as ColorTuple<string>

      for (let i = 0; i < hexArray.length; i++) {
        if (hexArray[i]!.toString().length < 2) {
          hexArray[i] = [0, hexArray[i]].join('')
        }
      }
      const [r, g, b, a] = hexArray
      const hex: Color = `#${r}${g}${b}${a}`
      return hex
    }

    if (to === 'rgb') {
      const [r, g, b, a] = numberArray
      const [r2, g2, b2] = preserveTransparency(r, g, b, a)
      return `rgb(${r2}, ${g2}, ${b2})`
    }
  }

  if (format === 'hex') {
    const string = color.trim().substring(1)

    const stringArray = string.match(/.{1,2}/g)!

    const base10Array: number[] = stringArray.map((str: string) => parseInt(str, 16))

    if (base10Array.length === 4) {
      let alpha = base10Array[3] as number
      alpha = parseFloat((alpha / 255).toFixed(2))
      base10Array[3] = alpha
    }

    if (to === 'rgb') {
      const [r, g, b, a] = base10Array as ColorTuple<number>
      if (string.length < 8) return `rgb(${r}, ${g}, ${b})`

      const [r2, g2, b2] = preserveTransparency(r, g, b, a) as ColorTuple<number>

      return `rgb(${r2}, ${g2}, ${b2})`
    }

    if (to === 'rgba') {
      let [r, g, b, a = 1] = base10Array as ColorTuple<number>
      return `rgba(${r}, ${g}, ${b}, ${a})`
    }
  }

  return color
}
