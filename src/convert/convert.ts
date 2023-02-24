import type { Color, ColorKeys } from '../types/global.types'
import { getColorFormat, preserveTransparency } from '../utils'

export function convert(color: Color, to: keyof ColorKeys = 'rgb'): Color {
	const format = getColorFormat(color)

	if (format === 'rgba') {
		const subStrStart = color.indexOf('(') + 1
		const subStrEnd = color.indexOf(')')
		const string = color.trim().substring(subStrStart, subStrEnd)

		const stringArray = string.split(',')
		const numberArray = stringArray.map((str: string) => Number(str))

		if (to === 'hex') {
			numberArray[3] = Math.floor(numberArray[3]! * 255)
			const hexArray = numberArray.map((num: number) => num.toString(16))

			for (let i = 0; i < hexArray.length; i++) {
				if (hexArray[i]!.toString().length < 2) {
					hexArray[i] = [0, hexArray[i]].join('')
				}
			}
			const [r, g, b, a] = hexArray
			const hex: Color = `#${r}${g}${b}${a}`
			return hex
		}

		if (to === 'rgb') {
			const [r, g, b, a]: any = numberArray // no type assertion for destructuring :(
			const [r2, g2, b2]: any = preserveTransparency(r, g, b, a)
			return `rgb(${r2}, ${g2}, ${b2})`
		}
	}

	if (format === 'hex') {
		const string = color.trim().substring(1)

		const stringArray = string.match(/.{1,2}/g)!
		console.log(stringArray)

		const base10Array: number[] = stringArray.map((str: string) =>
			parseInt(str, 16)
		)

		if (base10Array.length === 4) {
			let alpha = base10Array[3] as number
			alpha = parseFloat((alpha / 255).toFixed(2))
			base10Array[3] = alpha
		}

		if (to === 'rgb') {
			const [r, g, b, a]: any = base10Array
			if (string.length < 8) return `rgb(${r}, ${g}, ${b})`
			const [r2, g2, b2]: any = preserveTransparency(r, g, b, a)
			return `rgb(${r2}, ${g2}, ${b2})`
		}

		if (to === 'rgba') {
			const [r, g, b, a]: any = base10Array
			return `rgba(${r}, ${g}, ${b}, ${a})`
		}
	}

	return color
}
