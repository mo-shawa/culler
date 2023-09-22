import { CSSNamedColor } from 'css-color-types'

export type RGB = `rgb(${number}, ${number}, ${number})`
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
export type HEX = `#${string}`

export type Color = RGB | RGBA | HEX | CSSNamedColor

export type ColorTypes = 'rgb' | 'rgba' | 'hex'

export type ColorTuple<T extends number | string> = [T, T, T, T]

export type ConvertOptions =
  | {
      color: Color
      to?: Omit<ColorTypes, 'rgb'>
    }
  | {
      color: Color
      to: 'rgb'
      preserveTransparency?: boolean
    }

export type GenOptions = {
  type?: ColorTypes
  alpha?: boolean
  minR?: number
  maxR?: number
  minG?: number
  maxG?: number
  minB?: number
  maxB?: number
  r?: number
  g?: number
  b?: number
  a?: number
}

export type ApplyQuery = Element | HTMLElement | HTMLCollection | NodeList | NodeListOf<Element> | string

export type GenNumOptions = {
  min?: number
  max?: number
  isInt?: boolean
  clamp?: number
}
