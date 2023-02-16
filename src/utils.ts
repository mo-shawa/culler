import type { genNumOptions, Color, ColorKeys } from "./types/global.types"

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

export function preserveTransparency(
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

export function getColorFormat(color: Color): keyof ColorKeys | void {
	if (color.indexOf("#") > -1) return "hex"
	if (color.substring(0, 3).includes("rgb")) {
		if (color.charAt(3) === "a") return "rgba"
		return "rgb"
	}
}
