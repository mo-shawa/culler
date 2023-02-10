import { CSSNamedColor } from "css-color-types"

export default {
	gen,
	apply,
	convert,
	genNum,
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

export type convertOptions = {
	color: Color
	to?: keyof ColorKeys
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
		setR || genNum({ min: minR, max: maxR, isInt: true }),
		setG || genNum({ min: minG, max: maxG, isInt: true }),
		setB || genNum({ min: minB, max: maxB, isInt: true }),
	]

	if (type === "rgb") return `rgb(${r}, ${g}, ${b})`

	if (type === "rgba") {
		const a = setA || (alpha ? genNum({ isInt: false }) : 1)
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

export function genNum(userOptions: genNumOptions = {}): number {
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

export function convert(color: Color, to: keyof ColorKeys = "rgb"): Color {
	const format = getColorFormat(color)

	if (format === "rgba") {
		const subStrStart = color.indexOf("(") + 1
		const subStrEnd = color.indexOf(")")
		const string = color.trim().substring(subStrStart, subStrEnd)

		const stringArray = string.split(",")
		const numberArray = stringArray.map((str) => Number(str))

		if (to === "hex") {
			numberArray[3] = Math.floor(numberArray[3]! * 255)
			const hexArray = numberArray.map((num) => num.toString(16))

			for (let i = 0; i < hexArray.length; i++) {
				if (hexArray[i]!.toString().length < 2) {
					hexArray[i] = [0, hexArray[i]].join("")
				}
			}
			const [r, g, b, a] = hexArray
			const hex: Color = `#${r}${g}${b}${a}`
			return hex
		}

		if (to === "rgb") {
			const [r, g, b, a]: any = numberArray // no type assertion for destructuring :(
			const [r2, g2, b2]: any = preserveTransparency(r, g, b, a)
			return `rgb(${r2}, ${g2}, ${b2})`
		}
	}

	if (format === "hex") {
		const string = color.trim().substring(1)

		const stringArray = string.match(/.{1,2}/g)!
		console.log(stringArray)

		const base10Array: number[] = stringArray.map((str) => parseInt(str, 16))

		if (base10Array.length === 4) {
			let alpha = base10Array[3] as number
			alpha = parseFloat((alpha / 255).toFixed(2))
			base10Array[3] = alpha
		}

		if (to === "rgb") {
			const [r, g, b, a]: any = base10Array
			if (string.length < 8) return `rgb(${r}, ${g}, ${b})`
			const [r2, g2, b2]: any = preserveTransparency(r, g, b, a)
			return `rgb(${r2}, ${g2}, ${b2})`
		}

		if (to === "rgba") {
			const [r, g, b, a]: any = base10Array
			return `rgba(${r}, ${g}, ${b}, ${a})`
		}
	}

	return color
}

function getColorFormat(color: Color): keyof ColorKeys | void {
	if (color.indexOf("#") > -1) return "hex"
	if (color.substring(0, 3).includes("rgb")) {
		if (color.charAt(3) === "a") return "rgba"
		return "rgb"
	}
}

function preserveTransparency(
	r: number,
	g: number,
	b: number,
	a: number
): number[] {
	const r2 = Math.floor((1 - a) * 255 + a * r)
	const g2 = Math.floor((1 - a) * 255 + a * g)
	const b2 = Math.floor((1 - a) * 255 + a * b)
	return [r2, g2, b2]
}
