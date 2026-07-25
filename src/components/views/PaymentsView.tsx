import { useDashboard } from '../../context/DashboardContext'

export function PaymentsView() {
  const { bankTransferOrders, selectOrder } = useDashboard()

  return (
    <>
      <h1 className="pageTitle">Payments</h1>
      <p className="pageSubtitle">
        Bank-transfer orders awaiting or recently reviewed for proof of payment.
      </p>
      <div className="tableShell">
        <div className="tableHead" style={{ gridTemplateColumns: '1fr 1.6fr 1fr 1fr 1fr 0.9fr' }}>
          <div>Order</div>
          <div>Customer</div>
          <div>Txn ID</div>
          <div>Submitted</div>
          <div>Review status</div>
          <div style={{ textAlign: 'right' }}>Amount</div>
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
