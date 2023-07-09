import type { Color, ApplyQuery } from '../types/global.types'

export function apply(query: ApplyQuery, color: Color): void {
  if (typeof query === 'string') {
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

    return console.warn('Query did not yield any results')
  }

  if ('forEach' in query) {
    const elements = query as NodeListOf<HTMLElement>

    elements.forEach((element) => {
      element.style.backgroundColor = color
    })
    return
  }

  if (query instanceof HTMLElement) {
    query.style.backgroundColor = color
    return
  }

  return console.warn(`Something unexpected happened.
	args(query: ${query}, color: ${color})`)
}
