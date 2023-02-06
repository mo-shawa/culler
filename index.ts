type ApplyQuery = HTMLElement | HTMLCollection | NodeList | string

export function genRGBA(): string {
	const [r, g, b, a] = [
		genNumBetween(0, 255),
		genNumBetween(0, 255),
		genNumBetween(0, 255),
		genNumBetween(0, 1, true),
	]

	return `rgba(${r}, ${g}, ${b}, ${a})`
}

export function apply(color: string, query: ApplyQuery): void {
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
}

function genNumBetween(min: number, max: number, isFloat = false): number {
	const num = Math.random() * max - min
	return isFloat ? num : Math.floor(num)
}

document.querySelector(".isaddress")
const test: ApplyQuery = ""
