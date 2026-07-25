import { useDashboard } from '../../context/DashboardContext'
import { OrderCard } from '../orders/OrderCard'
import './AttentionView.css'

export function AttentionView() {
  const { needsAttentionOrders, selectOrder } = useDashboard()

  return (
    <>
      <h1 className="pageTitle">Needs attention</h1>
      <p className="pageSubtitle">
        Orders blocked from moving forward automatically — resolve these first.
      </p>
      <div className="attentionGrid">
        {needsAttentionOrders.map((o) => (
          <OrderCard key={o.id} order={o} onOpen={selectOrder} />
        ))}
      </div>
    </>
  )
}
