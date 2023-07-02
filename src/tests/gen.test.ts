import culler from "../index"

const rgbaPattern =
	/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/

const rgbPattern =
	/^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/

const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/

describe("gen", () => {
	describe("no options", () => {
		it("should return random valid rgba string", () => {
			const sut = culler.gen

			const actual = sut()

			expect(actual).toMatch(rgbaPattern)
		})
	})

	describe('given {type:"hex"}', () => {
		it("should return random valid hex string", () => {
			const sut = culler.gen

			const actual = sut({ type: "hex" })
			console.log(actual)

			expect(actual).toMatch(hexPattern)
		})
	})
})
