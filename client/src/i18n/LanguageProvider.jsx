import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './LanguageContext'
import { translateToUkrainian } from './translate'

const STORAGE_KEY = 'trackscendence-language'
const TRANSLATED_ATTRIBUTES = ['aria-label', 'alt', 'placeholder', 'title']
const originalText = new WeakMap()
const originalAttributes = new WeakMap()

const isIgnored = (node) =>
  node.parentElement?.closest('[data-i18n-ignore]') !== null

const updateTextNode = (node, language) => {
  if (isIgnored(node)) return
  if (!originalText.has(node)) originalText.set(node, node.nodeValue)
  const english = originalText.get(node)
  const translated = language === 'uk' ? translateToUkrainian(english) : english
  if (node.nodeValue !== translated) node.nodeValue = translated
}

const updateElement = (element, language) => {
  if (element.closest('[data-i18n-ignore]')) return

  let originals = originalAttributes.get(element)
  if (!originals) {
    originals = new Map()
    originalAttributes.set(element, originals)
  }

  for (const attribute of TRANSLATED_ATTRIBUTES) {
    if (!element.hasAttribute(attribute)) continue
    if (!originals.has(attribute)) {
      originals.set(attribute, element.getAttribute(attribute))
    }
    const english = originals.get(attribute)
    const translated =
      language === 'uk' ? translateToUkrainian(english) : english
    if (element.getAttribute(attribute) !== translated) {
      element.setAttribute(attribute, translated)
    }
  }
}

const translateTree = (root, language) => {
  if (root.nodeType === Node.TEXT_NODE) {
    updateTextNode(root, language)
    return
  }
  if (root.nodeType !== Node.ELEMENT_NODE) return

  updateElement(root, language)
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
  )
  let node = walker.nextNode()
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) updateTextNode(node, language)
    else updateElement(node, language)
    node = walker.nextNode()
  }
}

const getInitialLanguage = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'uk') return saved
  return navigator.language.toLowerCase().startsWith('uk') ? 'uk' : 'en'
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem(STORAGE_KEY, language)
    translateTree(document.body, language)

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) translateTree(node, language)
        if (mutation.type === 'characterData') {
          const english = originalText.get(mutation.target)
          const expected =
            language === 'uk' ? translateToUkrainian(english) : english
          if (mutation.target.nodeValue !== expected) {
            originalText.set(mutation.target, mutation.target.nodeValue)
            updateTextNode(mutation.target, language)
          }
        }
        if (
          mutation.type === 'attributes' &&
          TRANSLATED_ATTRIBUTES.includes(mutation.attributeName)
        ) {
          const originals = originalAttributes.get(mutation.target)
          const english = originals?.get(mutation.attributeName)
          const expected =
            language === 'uk' ? translateToUkrainian(english) : english
          if (
            mutation.target.getAttribute(mutation.attributeName) !== expected
          ) {
            originals?.delete(mutation.attributeName)
            updateElement(mutation.target, language)
          }
        }
      }
    })
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: TRANSLATED_ATTRIBUTES,
      characterData: true,
      childList: true,
      subtree: true,
    })
    return () => observer.disconnect()
  }, [language])

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t: (text) => (language === 'uk' ? translateToUkrainian(text) : text),
    }),
    [language],
  )

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}
