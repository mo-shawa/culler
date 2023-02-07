import { CSSNamedColor } from "css-color-types"

export default {
	gen,
	apply,
}

type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

type Color = RGB | RGBA | HEX | CSSNamedColor

type ColorKeys = {
	rgb: RGB
	rgba: RGBA
	hex: HEX
	// named: CSSNamedColor
}

type ApplyQuery =
	| HTMLElement
	| HTMLCollection
	| NodeList
	| NodeListOf<Element>
	| string

type genNumOptions = {
	min?: number
	max?: number
	isInt?: boolean
	clamp?: number
}

export type genOptions = {
	type?: keyof ColorKeys
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

export function gen(userOptions: genOptions = {}): Color {
	const defaultOptions: genOptions = {
		type: "rgba",
		minR: 0,
		minG: 0,
		minB: 0,
		maxR: 255,
		maxG: 255,
		maxB: 255,
		alpha: true,
	}

	const options: genOptions = Object.assign(defaultOptions, userOptions)

	const {
		type,
		minR,
		minG,
		minB,
		maxR,
		maxG,
		maxB,
		alpha,
		r: setR,
		g: setG,
		b: setB,
		a: setA,
	} = options

	const [r, g, b] = [
		setR || genNumBetween({ min: minR, max: maxR, isInt: true }),
		setG || genNumBetween({ min: minG, max: maxG, isInt: true }),
		setB || genNumBetween({ min: minB, max: maxB, isInt: true }),
	]

	if (type === "rgb") return `rgb(${r}, ${g}, ${b})`

	if (type === "rgba") {
		const a = setA || (alpha ? genNumBetween({ isInt: false }) : 1)
		return `rgba(${r}, ${g}, ${b}, ${a})`
	}

	if (type === "hex") {
		const [hexR, hexG, hexB] = [r.toString(16), g.toString(16), b.toString(16)]
		return `#${hexR}${hexG}${hexB}`
	}

	return `rgb(${r}, ${g}, ${b})`
}

export function apply(query: ApplyQuery, color: Color): void {
	if (typeof query === "string") {
		const result = document.querySelectorAll<HTMLElement>(query)

		if (result.length === 1) {
			const element = result[0]
			element!.style.backgroundColor = color
			return
		}

		if (result.length > 1) {
			result.forEach((element) => {
				element.style.backgroundColor = color
			})
			return
		}

		return console.warn("Query did not yield any results")
	}

	if ("forEach" in query) {
		const elements = query as NodeListOf<HTMLElement>

		elements.forEach((element) => {
			element.style.backgroundColor = color
		})
		return
	}

	if (query instanceof HTMLElement) {
		query.style.backgroundColor = color
		return
	}

	return console.warn(`Something unexpected happened.
	args(query: ${query}, color: ${color})`)
}

function genNumBetween(userOptions: genNumOptions = {}): number {
	const defaultOptions: genNumOptions = {
		min: 0,
		max: 1,
		isInt: false,
		clamp: 2,
	}

	const options: genNumOptions = Object.assign(defaultOptions, userOptions)

	const { min, max, isInt, clamp } = options

	let num = Math.random() * (max! - min!) + min!

	if (isInt) num = Math.floor(num)

	if (!isInt && clamp !== undefined) num = parseFloat(num.toFixed(clamp))

	return num
}
