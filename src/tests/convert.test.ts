import culler from '../index'

describe('convert', () => {
  describe('default behaviour', () => {
    it('should convert any hex to a valid rgb string', () => {
      const sut = culler.convert

      const actual = sut('#ff00ff')

      expect(actual).toBe('rgb(255, 0, 255)')
    })

    it("should convert any rgba into a valid rgb string, preserving the color's appearance", () => {
      const sut = culler.convert

      const actual = sut('rgba(255, 0, 255, 0.5)')

      expect(actual).toBe('rgb(255, 127, 255)')
    })

    it("should return the 'color' argument if it isn't a valid color", () => {
      const sut = culler.convert
      // @ts-ignore
      const actual = sut('not a color')

      expect(actual).toBe('not a color')
    })
  })

  describe('with options', () => {
    describe('from rgb', () => {
      it('should convert to rgba', () => {
        const sut = culler.convert

        const actual = sut('rgb(255, 0, 255)', 'rgba')

        expect(actual).toBe('rgba(255, 0, 255, 1)')
      })

      it('should convert to hex', () => {
        const sut = culler.convert

        const actual = sut('rgb(225, 30, 245)', 'hex')

        expect(actual).toBe('#e11ef5')
      })

      it('should return the color if it is already RGB', () => {
        const sut = culler.convert

        const actual = sut('rgb(255, 0, 255)', 'rgb')

        expect(actual).toBe('rgb(255, 0, 255)')
      })
    })
  })

  describe('from rgba', () => {
    it("should convert to rgb, without preserving the color's appearance", () => {
      const sut = culler.convert

      const actual = sut('rgba(255, 0, 255, 0.5)', 'rgb', false)

      expect(actual).toBe('rgb(255, 0, 255)')
    })

    it('should convert to rgb, preserving the color appearance', () => {
      const sut = culler.convert

      const actual = sut('rgba(255, 0, 255, 0.5)', 'rgb')

      expect(actual).toBe('rgb(255, 127, 255)')

      const actual2 = sut('rgba(255, 0, 255, 0.25)', 'rgb')

      expect(actual2).toBe('rgb(255, 191, 255)')
    })

    it('should convert to hex, without preserving the color opacity', () => {
      const sut = culler.convert

      const actual = sut('rgba(225, 20, 155, 0.35)', 'hex', false)

      expect(actual).toBe('#e1149b')
    })

    it('should convert to hex, preserving the color opacity', () => {
      const sut = culler.convert

      const actual = sut('rgba(225, 20, 155, 0.35)', 'hex')

      expect(actual).toBe('#e1149b59')
    })

    it('should return the color if it is already RGBA', () => {
      const sut = culler.convert

      const actual = sut('rgba(255, 0, 255, 0.5)', 'rgba')

      expect(actual).toBe('rgba(255, 0, 255, 0.5)')
    })
  })

  describe('from hex', () => {
    it('should convert to rgb without alpha', () => {
      const sut = culler.convert

      const actual = sut('#e1149b', 'rgb')

      expect(actual).toBe('rgb(225, 20, 155)')
    })

    describe('should convert to rgb with alpha', () => {
      it('should preserve the color appearance', () => {
        const sut = culler.convert

        const actual = sut('#e1149b59', 'rgb', true)

        expect(actual).toBe('rgb(244, 172, 220)')
      })

      it('should not preserve the color appearance', () => {
        const sut = culler.convert

        const actual = sut('#e1149b59', 'rgb', false)

        expect(actual).toBe('rgb(225, 20, 155)')
      })
    })

    it('should convert to rgba', () => {
      const sut = culler.convert

      const actual = sut('#e1149b', 'rgba')

      expect(actual).toBe('rgba(225, 20, 155, 1)')

      const actual2 = sut('#e1149b59', 'rgba')

      expect(actual2).toBe('rgba(225, 20, 155, 0.35)')
    })

    it('should return the color if it is already hex', () => {
      const sut = culler.convert

      const actual = sut('#e1149b', 'hex')

      expect(actual).toBe('#e1149b')
    })
  })
})
