import { useDashboard } from '../../context/DashboardContext'
import { useT } from '../../context/LanguageContext'
import { OrderCard } from '../orders/OrderCard'
import './AttentionView.css'

export function AttentionView() {
  const { needsAttentionOrders, selectOrder } = useDashboard()
  const t = useT()

  return (
    <>
      <h1 className="pageTitle">{t('attention.title')}</h1>
      <p className="pageSubtitle">{t('attention.subtitle')}</p>
      <div className="attentionGrid">
        {needsAttentionOrders.map((o) => (
          <OrderCard key={o.id} order={o} onOpen={selectOrder} />
        ))}
      </div>
    </>
  )
}
