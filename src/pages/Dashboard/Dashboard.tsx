import { DashboardProvider, useDashboard } from '../../context/DashboardContext'
import { Header } from '../../components/layout/Header'
import { Sidebar } from '../../components/layout/Sidebar'
import { OrderDetail } from '../../components/orders/OrderDetail'
import { KitchenBoardView } from '../../components/views/KitchenBoardView'
import { OrdersView } from '../../components/views/OrdersView'
import { AttentionView } from '../../components/views/AttentionView'
import { PaymentsView } from '../../components/views/PaymentsView'
import { ConversationsView } from '../../components/views/ConversationsView'
import { CustomersView } from '../../components/views/CustomersView'
import { MenuView } from '../../components/views/MenuView'
import { PlaceholderView } from '../../components/views/PlaceholderView'
import './Dashboard.css'

function DashboardContent() {
  const { view, selectedOrder, toast } = useDashboard()

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard__body">
        <Sidebar />
        <main className="dashboard__main">
          {view === 'board' && <KitchenBoardView />}
          {view === 'orders' && <OrdersView />}
          {view === 'attention' && <AttentionView />}
          {view === 'payments' && <PaymentsView />}
          {view === 'conversations' && <ConversationsView />}
          {view === 'customers' && <CustomersView />}
          {view === 'menu' && <MenuView />}
          {view === 'placeholder' && <PlaceholderView />}
          {view === 'detail' && selectedOrder && (
            <OrderDetail order={selectedOrder} />
          )}
        </main>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  )
}
