import { useDashboard } from '../../context/DashboardContext'
import { useT } from '../../context/LanguageContext'

export function PaymentsView() {
  const { bankTransferOrders, selectOrder } = useDashboard()
  const t = useT()

  return (
    <>
      <h1 className="pageTitle">{t('payments.title')}</h1>
      <p className="pageSubtitle">{t('payments.subtitle')}</p>
      <div className="tableShell">
        <div className="tableHead" style={{ gridTemplateColumns: '1fr 1.6fr 1fr 1fr 1fr 0.9fr' }}>
          <div>{t('orders.col.order')}</div>
          <div>{t('orders.col.customer')}</div>
          <div>{t('payments.col.txn')}</div>
          <div>{t('payments.col.submitted')}</div>
          <div>{t('payments.col.review')}</div>
          <div style={{ textAlign: 'right' }}>{t('payments.col.amount')}</div>
        </div>
        {bankTransferOrders.map((o) => (
          <button
            key={o.id}
            type="button"
            className="tableRow"
            style={{ gridTemplateColumns: '1fr 1.6fr 1fr 1fr 1fr 0.9fr' }}
            onClick={() => selectOrder(o.id)}
          >
            <div style={{ font: '600 12.5px var(--font-body)' }}>#{o.id}</div>
            <div style={{ font: '600 12.5px var(--font-body)' }}>{o.customer}</div>
            <div style={{ font: '400 12px var(--font-body)', color: 'var(--fg-secondary)' }}>{o.proof?.txnId}</div>
            <div style={{ font: '400 12px var(--font-body)', color: 'var(--fg-secondary)' }}>{o.proof?.date}</div>
            <div><span style={o.paymentStatusChipStyle}>{o.paymentStatusLabel}</span></div>
            <div style={{ textAlign: 'right', font: '700 12.5px var(--font-display)' }}>${o.proof?.amount}</div>
          </button>
        ))}
      </div>
    </>
  )
}
