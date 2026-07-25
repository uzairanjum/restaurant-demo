import { useDashboard } from '../../context/DashboardContext'

export function OrdersView() {
  const { filteredAllOrders, selectOrder } = useDashboard()

  return (
    <>
      <h1 className="pageTitle">Orders</h1>
      <p className="pageSubtitle">Every order placed today across all channels.</p>
      <div className="tableShell">
        <div className="tableHead" style={{ gridTemplateColumns: '1fr 1.6fr 1.6fr 1fr 1fr 1fr 0.9fr' }}>
          <div>Order</div>
          <div>Customer</div>
          <div>Items</div>
          <div>Type</div>
          <div>Payment</div>
          <div>Status</div>
          <div style={{ textAlign: 'right' }}>Total</div>
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
