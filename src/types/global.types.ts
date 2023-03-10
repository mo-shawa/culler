import { CSSNamedColor } from "css-color-types"

type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

export type Color = RGB | RGBA | HEX | CSSNamedColor

export type ColorTypes = "rgb" | "rgba" | "hex"

export type convertOptions = {
	color: Color
	to?: ColorTypes
}

export type genOptions = {
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

export type genNumOptions = {
	min?: number
	max?: number
	isInt?: boolean
	clamp?: number
}
