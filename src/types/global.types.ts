import { CSSNamedColor } from 'css-color-types'

type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

export type Color = RGB | RGBA | HEX | CSSNamedColor

export type ColorTypes = 'rgb' | 'rgba' | 'hex'

export type ConvertOptions = {
  color: Color
  to?: ColorTypes
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

export type ApplyQuery =
  | HTMLElement
  | HTMLCollection
  | NodeList
  | NodeListOf<Element>
  | string

export type GenNumOptions = {
  min?: number
  max?: number
  isInt?: boolean
  clamp?: number
}
