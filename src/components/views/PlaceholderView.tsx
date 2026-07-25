import { useT } from '../../context/LanguageContext'
import './PlaceholderView.css'

export function PlaceholderView() {
  const t = useT()

  return (
    <div className="placeholder">
      <div className="placeholder__icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="12.5" />
          <circle cx="12" cy="15.5" r=".5" fill="currentColor" />
        </svg>
      </div>
      <div className="placeholder__title">{t('placeholder.title')}</div>
      <div className="placeholder__text">{t('placeholder.text')}</div>
    </div>
  )
}
