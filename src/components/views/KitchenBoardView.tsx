import { useDashboard } from '../../context/DashboardContext'
import { KanbanColumn } from '../orders/KanbanColumn'
import { OrderCard } from '../orders/OrderCard'
import './KitchenBoardView.css'

export function KitchenBoardView() {
  const dash = useDashboard()

  return (
    <>
      <div className="boardHeader">
        <div>
          <h1 className="pageTitle">Kitchen Board</h1>
          <p className="pageSubtitle">
            Live view of every WhatsApp order moving through the kitchen.
          </p>
        </div>
      </div>
      <div className="boardColumns">
        <KanbanColumn
          title="Needs attention"
          subtitle="Blocked — needs a human"
          count={dash.needsAttentionCount}
          iconClassName="kanbanColumn__icon--coral"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3 2 20h20L12 3z" /><line x1="12" y1="10" x2="12" y2="14.5" /><circle cx="12" cy="17" r=".6" fill="currentColor" />
            </svg>
          }
        >
          {dash.needsAttentionOrders.map((o) => (
            <OrderCard key={o.id} order={o} onOpen={dash.selectOrder} />
          ))}
        </KanbanColumn>

        <KanbanColumn
          title="Ready for kitchen"
          subtitle="Confirmed & paid"
          count={dash.readyForKitchenCount}
          iconClassName="kanbanColumn__icon--cold"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          }
        >
          {dash.readyForKitchenOrders.map((o) => (
            <OrderCard key={o.id} order={o} onOpen={dash.selectOrder} />
          ))}
        </KanbanColumn>

        <KanbanColumn
          title="Preparing"
          subtitle="Actively cooking"
          count={dash.preparingCount}
          iconClassName="kanbanColumn__icon--amber"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 22c4 0 6.5-2.8 6.5-6.3 0-3.8-3.3-5.7-4.3-9.7-.3 2.6-2.6 3.4-2.6 6 0-1.7-1.3-2.7-1.1-4.7-2 1.4-3.5 4-3.5 6.9 0 .9.2 1.7.5 2.5-1-.6-1.7-1.7-1.9-3-.9 1.2-1.4 2.7-1.4 4.3 0 2.2 1.9 4 4.2 4" />
            </svg>
          }
        >
          {dash.preparingOrders.map((o) => (
            <OrderCard key={o.id} order={o} onOpen={dash.selectOrder} />
          ))}
        </KanbanColumn>

        <KanbanColumn
          title="Ready"
          subtitle="For pickup or dispatch"
          count={dash.readyCount}
          iconClassName="kanbanColumn__icon--teal"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          }
        >
          {dash.readyOrders.map((o) => (
            <OrderCard key={o.id} order={o} onOpen={dash.selectOrder} />
          ))}
        </KanbanColumn>

        <KanbanColumn
          title="Out for delivery"
          subtitle="On the way"
          count={dash.outForDeliveryCount}
          iconClassName="kanbanColumn__icon--cold"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="7" width="13" height="9" rx="1" /><path d="M14 10h4l3 3v3h-7z" /><circle cx="6" cy="18" r="1.5" /><circle cx="17" cy="18" r="1.5" />
            </svg>
          }
        >
          {dash.outForDeliveryOrders.map((o) => (
            <OrderCard key={o.id} order={o} onOpen={dash.selectOrder} />
          ))}
        </KanbanColumn>

        <KanbanColumn
          title="Completed"
          subtitle="Delivered or picked up"
          count={dash.completedCount}
          iconClassName="kanbanColumn__icon--neutral"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12l4 4L14 8" /><path d="M8 12l4 4L22 8" />
            </svg>
          }
        >
          {dash.completedOrders.map((o) => (
            <OrderCard key={o.id} order={o} onOpen={dash.selectOrder} />
          ))}
        </KanbanColumn>
      </div>
    </>
  )
}
