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

export function genRGBA(): RGBA {
	const [r, g, b, a] = [
		genNumBetween(0, 255),
		genNumBetween(0, 255),
		genNumBetween(0, 255),
		genNumBetween(0, 1, true),
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

		return console.warn("Query did not yield any results 🤷‍♂️")
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

	return console.warn("Something unexpected happened 😳")
}

function genNumBetween(min: number, max: number, isFloat = false): number {
	const num = Math.random() * max - min
	return isFloat ? num : Math.floor(num)
}
