import { useDashboard } from '../../context/DashboardContext'
import { useT } from '../../context/LanguageContext'

export function CustomersView() {
  const { customers, selectOrder } = useDashboard()
  const t = useT()

  return (
    <>
      <h1 className="pageTitle">{t('customers.title')}</h1>
      <p className="pageSubtitle">{t('customers.subtitle')}</p>
      <div className="tableShell">
        <div className="tableHead" style={{ gridTemplateColumns: '1.6fr 1fr 0.8fr 1fr 1.2fr' }}>
          <div>{t('customers.col.customer')}</div>
          <div>{t('customers.col.phone')}</div>
          <div>{t('customers.col.orders')}</div>
          <div>{t('customers.col.spend')}</div>
          <div>{t('customers.col.last')}</div>
        </div>
        {customers.map((c) => (
          <button
            key={c.phone}
            type="button"
            className="tableRow"
            style={{ gridTemplateColumns: '1.6fr 1fr 0.8fr 1fr 1.2fr' }}
            onClick={() => selectOrder(c.lastOrderId)}
          >
            <div style={{ font: '600 12.5px var(--font-body)' }}>{c.customer}</div>
            <div style={{ font: '400 12px var(--font-body)', color: 'var(--fg-secondary)' }}>{c.phone}</div>
            <div>{c.count}</div>
            <div style={{ font: '700 12.5px var(--font-display)' }}>${c.totalSpentStr}</div>
            <div>
              <span style={c.lastColumnChipStyle}>
                #{c.lastOrderId} · {c.lastColumnLabel}
              </span>
            </div>
          </button>
        ))}
      </div>
    </>
  )
}
