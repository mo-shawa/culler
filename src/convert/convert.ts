import type { Color, ColorTypes, ColorTuple } from '../types/global.types'
import { getColorFormat, calculatePreservedTransparency } from '../utils'

export function convert(color: Color, to: ColorTypes = 'rgb', preserveTransparency = true): Color {
  const format = getColorFormat(color)

  if (format === to) return color
  // TODO: break this up into smaller functions and add tests **
  switch (format) {
    case 'rgb':
      return convertRGB(color, to)
    case 'rgba':
      return convertRGBA(color, to, preserveTransparency)
    case 'hex':
      return convertHex(color, to, preserveTransparency)
    default:
      return color
  }
}

function convertRGB(color: Color, to: ColorTypes): Color {
  const numberArray = contstructNumberArray(color)

  if (to === 'rgba') {
    const [r, g, b] = numberArray
    return `rgba(${r}, ${g}, ${b}, 1)`
  }

  if (to === 'hex') {
    const hexArray = constructHexArray(numberArray)
    const [r, g, b] = hexArray
    return `#${r}${g}${b}`
  }

  return color
}

function convertRGBA(color: Color, to: ColorTypes, preserveTransparency: boolean): Color {
  const numberArray = contstructNumberArray(color)

  if (to === 'hex') {
    numberArray[3] = Math.floor(numberArray[3]! * 255)
    const hexArray = constructHexArray(numberArray)
    const [r, g, b, a] = hexArray
    if (!preserveTransparency) return `#${r}${g}${b}`
    return `#${r}${g}${b}${a}`
  }

  if (to === 'rgb') {
    const [r, g, b, a] = numberArray
    if (!preserveTransparency) return `rgb(${r}, ${g}, ${b})`
    const [r2, g2, b2] = calculatePreservedTransparency(r, g, b, a)
    return `rgb(${r2}, ${g2}, ${b2})`
  }

  return color // if user tries to convert a color that is already in the desired format
}

function convertHex(color: Color, to: ColorTypes, preserveTransparency: boolean): Color {
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

    if (!preserveTransparency) return `rgb(${r}, ${g}, ${b})`

    const [r2, g2, b2] = calculatePreservedTransparency(r, g, b, a) as ColorTuple<number>
    return `rgb(${r2}, ${g2}, ${b2})`
  }

  if (to === 'rgba') {
    let [r, g, b, a = 1] = base10Array as ColorTuple<number>
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  return color // if user tries to convert a color that is already in the desired format
}

function contstructNumberArray(color: Color) {
  const subStrStart = color.indexOf('(') + 1
  const subStrEnd = color.indexOf(')')
  const colorValueString = color.trim().substring(subStrStart, subStrEnd)

  const stringArray = colorValueString.split(',')
  const numberArray = stringArray.map((str: string) => Number(str)) as ColorTuple<number>
  return numberArray
}

function constructHexArray(numberArray: ColorTuple<number>) {
  const hexArray = numberArray.map((num: number) => num.toString(16)) as ColorTuple<string>
  const hexArrayLength = hexArray.join('').length
  if (hexArrayLength !== 6 && hexArrayLength !== 8) {
    for (let i = 0; i < hexArray.length; i++) {
      if (hexArray[i]!.toString().length < 2) {
        hexArray[i] = [0, hexArray[i]].join('')
      }
    }
  }

  return hexArray
}
