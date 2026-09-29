import { useLanguage } from '@/i18n/LanguageContext'

// The design places a search affordance next to the heading, but the Figma
// node is an unfinished stub (an empty strip with a lone magnifying glass),
// so the heading stands alone until search is actually designed.
const PlayHeading = () => {
  const { t } = useLanguage()

  return (
    <h1 className="text-[clamp(42px,10vw,80px)] leading-none font-black tracking-[-0.025em] text-[#E86D2F]">
      {t('PLAY')}
    </h1>
  )
}

export default PlayHeading
