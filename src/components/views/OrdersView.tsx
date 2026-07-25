import { useDashboard } from '../../context/DashboardContext'
import { useT } from '../../context/LanguageContext'

export function OrdersView() {
  const { filteredAllOrders, selectOrder } = useDashboard()
  const t = useT()

  return (
    <>
      <h1 className="pageTitle">{t('orders.title')}</h1>
      <p className="pageSubtitle">{t('orders.subtitle')}</p>
      <div className="tableShell">
        <div className="tableHead" style={{ gridTemplateColumns: '1fr 1.6fr 1.6fr 1fr 1fr 1fr 0.9fr' }}>
          <div>{t('orders.col.order')}</div>
          <div>{t('orders.col.customer')}</div>
          <div>{t('orders.col.items')}</div>
          <div>{t('orders.col.type')}</div>
          <div>{t('orders.col.payment')}</div>
          <div>{t('orders.col.status')}</div>
          <div style={{ textAlign: 'right' }}>{t('orders.col.total')}</div>
        </div>
        {filteredAllOrders.map((o) => (
          <button
            key={o.id}
            type="button"
            className="tableRow"
            style={{ gridTemplateColumns: '1fr 1.6fr 1.6fr 1fr 1fr 1fr 0.9fr' }}
            onClick={() => selectOrder(o.id)}
          >
            <div style={{ font: '600 12.5px var(--font-body)' }}>#{o.id}</div>
            <div>
              <div style={{ font: '600 12.5px var(--font-body)' }}>{o.customer}</div>
              <div style={{ font: '400 11px var(--font-body)', color: 'var(--fg-tertiary)' }}>{o.phone}</div>
            </div>
            <div style={{ font: '400 12px var(--font-body)', color: 'var(--fg-secondary)' }}>{o.itemsSummary}</div>
            <div><span style={o.fulfillmentChipStyle}>{o.fulfillmentLabel}</span></div>
            <div><span style={o.paymentStatusChipStyle}>{o.paymentStatusLabel}</span></div>
            <div><span style={o.columnChipStyle}>{o.columnLabel}</span></div>
            <div style={{ textAlign: 'right', font: '700 12.5px var(--font-display)' }}>${o.total}</div>
          </button>
        ))}
      </div>
    </>
  )
}
