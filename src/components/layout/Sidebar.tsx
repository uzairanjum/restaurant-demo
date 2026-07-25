import { useDashboard } from '../../context/DashboardContext'
import { useT } from '../../context/LanguageContext'
import type { TranslationKey } from '../../i18n'
import './Sidebar.css'

const navItems: Array<{
  key: string
  labelKey: TranslationKey
  action: string
  style:
    | 'navBoardStyle'
    | 'navOrdersStyle'
    | 'navAttentionStyle'
    | 'navPaymentsStyle'
    | 'navConversationsStyle'
    | 'navCustomersStyle'
    | 'navMenuStyle'
    | 'navReportsStyle'
    | 'navSettingsStyle'
  icon: string
  badge?: boolean
}> = [
  { key: 'board', labelKey: 'nav.board', action: 'goToBoard', style: 'navBoardStyle', icon: 'board' },
  { key: 'orders', labelKey: 'nav.orders', action: 'goToOrders', style: 'navOrdersStyle', icon: 'orders' },
  { key: 'attention', labelKey: 'nav.attention', action: 'goToAttention', style: 'navAttentionStyle', icon: 'attention', badge: true },
  { key: 'payments', labelKey: 'nav.payments', action: 'goToPayments', style: 'navPaymentsStyle', icon: 'payments' },
  { key: 'conversations', labelKey: 'nav.conversations', action: 'goToConversations', style: 'navConversationsStyle', icon: 'conversations' },
  { key: 'customers', labelKey: 'nav.customers', action: 'goToCustomers', style: 'navCustomersStyle', icon: 'customers' },
  { key: 'menu', labelKey: 'nav.menu', action: 'goToMenu', style: 'navMenuStyle', icon: 'menu' },
  { key: 'reports', labelKey: 'nav.reports', action: 'goToPlaceholder', style: 'navReportsStyle', icon: 'reports' },
  { key: 'settings', labelKey: 'nav.settings', action: 'goToPlaceholder', style: 'navSettingsStyle', icon: 'settings' },
]

function NavIcon({ name }: { name: string }) {
  switch (name) {
    case 'board':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    case 'orders':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
          <circle cx="4" cy="6" r="1.3" fill="currentColor" stroke="none" /><circle cx="4" cy="12" r="1.3" fill="currentColor" stroke="none" /><circle cx="4" cy="18" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'attention':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3 2 20h20L12 3z" /><line x1="12" y1="10" x2="12" y2="14.5" /><circle cx="12" cy="17" r=".6" fill="currentColor" />
        </svg>
      )
    case 'payments':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="9.5" x2="22" y2="9.5" />
        </svg>
      )
    case 'conversations':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.4 8.4 0 01-8.9 8.4 8.7 8.7 0 01-3.8-.9L3 20l1.1-5a8.4 8.4 0 01-.6-3.5A8.4 8.4 0 0112 3a8.4 8.4 0 019 8.5z" />
          <circle cx="8.5" cy="11.5" r=".7" fill="currentColor" /><circle cx="12" cy="11.5" r=".7" fill="currentColor" /><circle cx="15.5" cy="11.5" r=".7" fill="currentColor" />
        </svg>
      )
    case 'customers':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="8" r="3.2" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
          <circle cx="18" cy="9" r="2.5" /><path d="M15.5 14.2c2.7.5 4.5 2.6 4.5 5.8" />
        </svg>
      )
    case 'menu':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3v10a2 2 0 002 2h.5" /><path d="M6 3v6h3V3" /><path d="M17 3c-1.7 0-3 1.7-3 4.5S15.3 12 17 12v9" />
        </svg>
      )
    case 'reports':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="12" width="4" height="8" rx="1" /><rect x="10" y="7" width="4" height="13" rx="1" /><rect x="17" y="3" width="4" height="17" rx="1" />
        </svg>
      )
    default:
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
        </svg>
      )
  }
}

export function Sidebar() {
  const dash = useDashboard()
  const t = useT()

  return (
    <>
      <button
        type="button"
        className={`sidebarBackdrop${dash.sidebarOpen ? ' sidebarBackdrop--open' : ''}`}
        aria-label={t('nav.close')}
        onClick={dash.closeSidebar}
      />
      <aside className={`sidebar${dash.sidebarOpen ? ' sidebar--open' : ''}`}>
        <div className="sidebar__mobileHead">
          <div className="sidebar__mobileBrand">
            <div className="sidebar__mobileLogo">TQ</div>
            <div>
              <div className="sidebar__mobileName">Tierra Querida</div>
              <div className="sidebar__mobileSub">{t('brand.subtitle')}</div>
            </div>
          </div>
          <button
            type="button"
            className="sidebar__closeBtn"
            onClick={dash.closeSidebar}
            aria-label={t('nav.close')}
          >
            ✕
          </button>
        </div>

        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              style={dash[item.style]}
              onClick={() => {
                const fn = dash[item.action as keyof typeof dash]
                if (typeof fn === 'function') (fn as () => void)()
              }}
            >
              <NavIcon name={item.icon} />
              {t(item.labelKey)}
              {item.badge && (
                <span className="attentionBadge">{dash.needsAttentionCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar__stats">
          <div className="sidebar__statsLabel">{t('stats.quick')}</div>
          <div>
            <div className="sidebar__statValue">{dash.activeOrdersCount}</div>
            <div className="sidebar__statLabel">{t('stats.activeOrders')}</div>
          </div>
          <div>
            <div className="sidebar__statValue">{dash.avgPrepTime}</div>
            <div className="sidebar__statLabel">{t('stats.avgPrep')}</div>
          </div>
        </div>
      </aside>
    </>
  )
}
