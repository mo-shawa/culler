export function genRGBA() {
	const [r, g, b, a] = [
		genNumBetween(0, 255),
		genNumBetween(0, 255),
		genNumBetween(0, 255),
		genNumBetween(0, 1, true),
	]

	return `rgba(${r}, ${g}, ${b}, ${a})`
}

function genNumBetween(min: number, max: number, isFloat = false): number {
	const num = Math.random() * max - min
	return isFloat ? num : Math.floor(num) // might wanna reduce to 2 decimal places
}

console.log(genNumBetween(0, 1, true))
