import culler from '../index'

describe('convert', () => {
  describe('default behavriour', () => {
    it('should convert any value to a valid rgb string', () => {
      const sut = culler.convert

      const actual = sut('#ff00ff')

      expect(actual).toBe('rgb(255, 0, 255)')
    })
  })
})
