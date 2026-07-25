import { useDashboard } from '../../context/DashboardContext'

export function CustomersView() {
  const { customers, selectOrder } = useDashboard()

  return (
    <>
      <h1 className="pageTitle">Customers</h1>
      <p className="pageSubtitle">
        Everyone who has ordered through WhatsApp, aggregated across orders.
      </p>
      <div className="tableShell">
        <div className="tableHead" style={{ gridTemplateColumns: '1.6fr 1fr 0.8fr 1fr 1.2fr' }}>
          <div>Customer</div>
          <div>Phone</div>
          <div>Orders</div>
          <div>Lifetime spend</div>
          <div>Last order</div>
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
