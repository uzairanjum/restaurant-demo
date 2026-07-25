import { useDashboard } from '../../context/DashboardContext'
import { useLanguage } from '../../context/LanguageContext'
import type { Locale } from '../../i18n'
import './Header.css'

export function Header() {
  const {
    location,
    showLocationMenu,
    toggleLocationMenu,
    toggleSidebar,
    selectRomaNorte,
    selectCondesa,
    kitchenOnline,
    toggleKitchenOnline,
    searchQuery,
    onSearchChange,
  } = useDashboard()
  const { locale, setLocale, t } = useLanguage()

  return (
    <header className="header">
      <div className="header__left">
        <button
          type="button"
          className="header__menuBtn"
          onClick={toggleSidebar}
          aria-label={t('nav.open')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>

        <div className="header__brand">
          <div className="header__logo">
            <span>TQ</span>
          </div>
          <div className="header__brandText">
            <div className="header__brandName">Tierra Querida</div>
            <div className="header__brandSub">{t('brand.subtitle')}</div>
          </div>
        </div>
      </div>

      <div className="header__locationWrap">
        <button
          type="button"
          className="header__locationBtn"
          onClick={toggleLocationMenu}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s7-6.5 7-12a7 7 0 00-14 0c0 5.5 7 12 7 12z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span className="header__locationLabel">{location}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {showLocationMenu && (
          <div className="header__locationMenu">
            <button type="button" onClick={selectRomaNorte}>Roma Norte</button>
            <button type="button" onClick={selectCondesa}>Condesa</button>
          </div>
        )}
      </div>

      <button
        type="button"
        className="header__kitchenBtn"
        onClick={toggleKitchenOnline}
      >
        <span
          className="header__kitchenDot"
          style={{ background: kitchenOnline ? '#0F9C7E' : '#94979C' }}
        />
        <span className="header__kitchenLabel">
          {kitchenOnline ? t('header.kitchenOnline') : t('header.kitchenOffline')}
        </span>
      </button>

      <div className="header__search">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('header.search')}
        />
      </div>

      <div className="header__spacer" />

      <label className="header__lang" aria-label={t('lang.switch')}>
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
        >
          <option value="en">{t('lang.en')}</option>
          <option value="es-CO">{t('lang.es')}</option>
        </select>
      </label>

      <button type="button" className="header__notifyBtn" aria-label={t('header.notifications')}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a5 5 0 00-5 5v3.3c0 .7-.25 1.4-.7 1.95L5 15h14l-1.3-1.75a3.2 3.2 0 01-.7-1.95V8a5 5 0 00-5-5z" />
          <path d="M9.5 18a2.5 2.5 0 005 0" />
        </svg>
        <span className="header__notifyBadge">4</span>
      </button>

      <div className="header__user">
        <span className="header__avatar">SR</span>
        <div className="header__userText">
          <div>Sofía Reyes</div>
          <div>{t('header.manager')}</div>
        </div>
      </div>
    </header>
  )
}
