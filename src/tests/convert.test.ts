import culler from '../index'

describe('convert', () => {
  describe('default behaviour', () => {
    it('should convert any value to a valid rgb string', () => {
      const sut = culler.convert

      const actual = sut('#ff00ff')

      expect(actual).toBe('rgb(255, 0, 255)')
    })
  })

  describe('with options', () => {
    it('should convert any value to a valid rgb string', () => {
      const sut = culler.convert

      const actual = sut('#ff00ff', 'rgb')

      expect(actual).toBe('rgb(255, 0, 255)')
    })

    it('should convert any value to a valid rgba string', () => {
      const sut = culler.convert

      const actual = sut('#ff00ff', 'rgba')

      expect(actual).toBe('rgba(255, 0, 255, 1)')
    })

    it('should convert any value to a valid hex string', () => {
      const sut = culler.convert

      const actual = sut('#ff00ff', 'hex')

      expect(actual).toBe('#ff00ff')
    })
  })
})
