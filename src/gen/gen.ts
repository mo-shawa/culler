import type { genOptions, Color } from "../types/global.types"
import { genNum } from "../utils"

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
