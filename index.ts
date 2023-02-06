import { CSSNamedColor } from "css-color-types"

export default {
	genRGBA,
	apply,
}

type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

type Color = RGB | RGBA | HEX | CSSNamedColor

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

export function genRGBA(): RGBA {
	const [r, g, b, a] = [
		genNumBetween({ max: 255, isInt: true }),
		genNumBetween({ max: 255, isInt: true }),
		genNumBetween({ max: 255, isInt: true }),
		genNumBetween({ isInt: false }),
	]

	return `rgba(${r}, ${g}, ${b}, ${a})`
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

	let num = Math.random() * max! - min!

	if (isInt) num = Math.floor(num)

	if (!isInt && clamp !== undefined) num = parseFloat(num.toFixed(clamp))

	return num
}

console.log(genNumBetween({ clamp: 15 }))
