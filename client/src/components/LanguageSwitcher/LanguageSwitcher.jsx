import { Languages } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage()
  const isUkrainian = language === 'uk'
  const nextLanguage = isUkrainian ? 'en' : 'uk'

  return (
    <button
      type="button"
      data-i18n-ignore
      lang={isUkrainian ? 'uk' : 'en'}
      aria-label={isUkrainian ? 'Switch to English' : 'Переключити українською'}
      title={isUkrainian ? 'Switch to English' : 'Переключити українською'}
      onClick={() => setLanguage(nextLanguage)}
      className="fixed right-3 bottom-3 z-[100] flex min-h-10 items-center gap-2 rounded-full border border-black/15 bg-white px-3 py-2 text-sm font-black text-[#081934] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#fff8ee] focus-visible:ring-2 focus-visible:ring-[#51AFF1] focus-visible:ring-offset-2 focus-visible:outline-none sm:right-5 sm:bottom-5"
    >
      <Languages aria-hidden="true" className="size-4" />
      <span>{isUkrainian ? 'EN' : 'UA'}</span>
    </button>
  )
}

export default LanguageSwitcher
