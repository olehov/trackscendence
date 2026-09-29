import { ukPatterns, ukTranslations } from './translations.js'

export const translateToUkrainian = (value) => {
  if (typeof value !== 'string') return value

  const leading = value.match(/^\s*/)?.[0] ?? ''
  const trailing = value.match(/\s*$/)?.[0] ?? ''
  const text = value.trim()
  if (!text) return value

  const direct = ukTranslations[text]
  if (direct) return `${leading}${direct}${trailing}`

  for (const [pattern, replacement] of ukPatterns) {
    if (pattern.test(text)) {
      return `${leading}${text.replace(pattern, replacement)}${trailing}`
    }
  }

  return value
}
