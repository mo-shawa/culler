import culler from '../index'

const rgbaPattern = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/

const rgbPattern = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/

const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/

describe('gen', () => {
  describe('no options', () => {
    it('should return random valid rgba string', () => {
      const sut = culler.gen

      const actual = sut()

      expect(actual).toMatch(rgbaPattern)
    })
  })

  describe('given {type:"hex"}', () => {
    it('should return random valid hex string', () => {
      const sut = culler.gen

      const actual = sut({ type: 'hex' })

      expect(actual).toMatch(hexPattern)
    })
  })

  describe('given {type:"rgb"}', () => {
    it('should return random valid rgb string', () => {
      const sut = culler.gen

      const actual = sut({ type: 'rgb' })

      expect(actual).toMatch(rgbPattern)
    })
  })

  describe('given {type:"rgba"}', () => {
    it('should return random valid rgba string', () => {
      const sut = culler.gen

      const actual = sut({ type: 'rgba' })

      expect(actual).toMatch(rgbaPattern)
    })
  })

  describe('given {type:"hex", alpha:false}', () => {
    it('should return random valid hex string', () => {
      const sut = culler.gen

      const actual = sut({ type: 'hex', alpha: false })

      expect(actual).toMatch(hexPattern)
      expect(actual).not.toMatch(/#.{8}/)
    })
  })

  describe("given exact values for 'r', 'g', 'b', 'a'", () => {
    it('should return rgba string with exact values', () => {
      const sut = culler.gen

      const actual = sut({ r: 255, g: 255, b: 255, a: 0.5 })

      expect(actual).toBe('rgba(255, 255, 255, 0.5)')
    })
  })

  describe('given range', () => {
    it('should return rgba string with values within range', () => {
      const sut = culler.gen

      const actual1 = sut({ range: [0, 255] })
      const actual2 = sut({ range: [220, 225] })
      const actual3 = sut({ range: [22, 25] })

      expect(actual1).toMatch(rgbaPattern)
      expect(actual2).toMatch(rgbaPattern)
      expect(actual3).toMatch(rgbaPattern)
    })
  })
})
