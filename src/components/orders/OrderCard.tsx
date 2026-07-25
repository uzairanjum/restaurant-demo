import type { enrichOrder } from '../../utils/orderUtils'
import './OrderCard.css'

type EnrichedOrder = ReturnType<typeof enrichOrder>

interface OrderCardProps {
  order: EnrichedOrder
  onOpen: (id: string) => void
}

export function OrderCard({ order, onOpen }: OrderCardProps) {
  return (
    <button type="button" className="orderCard" onClick={() => onOpen(order.id)}>
      <div className="orderCard__top">
        <span className="orderCard__id">#{order.id}</span>
        <span style={order.timeChipStyle}>{order.timeLabel}</span>
      </div>
      {order.issueLabel && (
        <span style={order.issueChipStyle ?? undefined}>{order.issueLabel}</span>
      )}
      <div>
        <div className="orderCard__customer">{order.customer}</div>
        <div className="orderCard__phone">{order.phone}</div>
      </div>
      <div className="orderCard__items">{order.itemsSummary}</div>
      <div className="orderCard__chips">
        <span style={order.fulfillmentChipStyle}>{order.fulfillmentLabel}</span>
        <span style={order.paymentStatusChipStyle}>{order.paymentMethodLabel}</span>
        <span style={order.paymentStatusChipStyle}>{order.paymentStatusLabel}</span>
      </div>
      <div className="orderCard__footer">
        <span>${order.totalStr}</span>
      </div>
    </button>
  )
}
