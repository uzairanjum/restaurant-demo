import { useMemo, useState } from 'react'
import { useDashboard } from '../../context/DashboardContext'
import { useT } from '../../context/LanguageContext'
import type { Fulfillment, OrderStatus, PaymentMethod } from '../../types/order'
import './OrdersView.css'

const STATUS_OPTIONS: Exclude<OrderStatus, 'cancelled'>[] = [
  'needs_attention',
  'ready_for_kitchen',
  'preparing',
  'ready',
  'out_for_delivery',
  'completed',
]

export function OrdersView() {
  const { filteredAllOrders, selectOrder } = useDashboard()
  const t = useT()

  const [orderId, setOrderId] = useState('')
  const [customer, setCustomer] = useState('')
  const [type, setType] = useState<'all' | Fulfillment>('all')
  const [payment, setPayment] = useState<'all' | PaymentMethod>('all')
  const [status, setStatus] = useState<'all' | Exclude<OrderStatus, 'cancelled'>>('all')

  const hasActiveFilters =
    orderId.trim() !== '' ||
    customer.trim() !== '' ||
    type !== 'all' ||
    payment !== 'all' ||
    status !== 'all'

  const orders = useMemo(() => {
    const idQ = orderId.trim().toLowerCase()
    const nameQ = customer.trim().toLowerCase()

    return filteredAllOrders.filter((o) => {
      if (idQ && !o.id.toLowerCase().includes(idQ)) return false
      if (nameQ && !o.customer.toLowerCase().includes(nameQ)) return false
      if (type !== 'all' && o.fulfillment !== type) return false
      if (payment !== 'all' && o.paymentMethod !== payment) return false
      if (status !== 'all' && o.status !== status) return false
      return true
    })
  }, [filteredAllOrders, orderId, customer, type, payment, status])

  const clearFilters = () => {
    setOrderId('')
    setCustomer('')
    setType('all')
    setPayment('all')
    setStatus('all')
  }

  return (
    <>
      <h1 className="pageTitle">{t('orders.title')}</h1>
      <p className="pageSubtitle">{t('orders.subtitle')}</p>

      <div className="ordersFilters">
        <label className="ordersFilters__field">
          <span>{t('orders.filter.order')}</span>
          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder={t('orders.filter.orderPlaceholder')}
          />
        </label>

        <label className="ordersFilters__field">
          <span>{t('orders.filter.customer')}</span>
          <input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder={t('orders.filter.customerPlaceholder')}
          />
        </label>

        <label className="ordersFilters__field">
          <span>{t('orders.filter.type')}</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'all' | Fulfillment)}
          >
            <option value="all">{t('orders.filter.all')}</option>
            <option value="delivery">{t('fulfillment.delivery')}</option>
            <option value="pickup">{t('fulfillment.pickup')}</option>
          </select>
        </label>

        <label className="ordersFilters__field">
          <span>{t('orders.filter.payment')}</span>
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value as 'all' | PaymentMethod)}
          >
            <option value="all">{t('orders.filter.all')}</option>
            <option value="cod">{t('payment.cod')}</option>
            <option value="bank_transfer">{t('payment.bank_transfer')}</option>
          </select>
        </label>

        <label className="ordersFilters__field">
          <span>{t('orders.filter.status')}</span>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as 'all' | Exclude<OrderStatus, 'cancelled'>)
            }
          >
            <option value="all">{t('orders.filter.all')}</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {t(`status.${s}`)}
              </option>
            ))}
          </select>
        </label>

        <div className="ordersFilters__actions">
          <span className="ordersFilters__count">
            {t('orders.filter.results', { count: orders.length })}
          </span>
          {hasActiveFilters && (
            <button type="button" className="ordersFilters__clear" onClick={clearFilters}>
              {t('orders.filter.clear')}
            </button>
          )}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="ordersEmpty">{t('orders.filter.empty')}</div>
      ) : (
        <div className="tableShell">
          <div
            className="tableHead"
            style={{ gridTemplateColumns: '1fr 1.6fr 1.6fr 1fr 1fr 1fr 0.9fr' }}
          >
            <div>{t('orders.col.order')}</div>
            <div>{t('orders.col.customer')}</div>
            <div>{t('orders.col.items')}</div>
            <div>{t('orders.col.type')}</div>
            <div>{t('orders.col.payment')}</div>
            <div>{t('orders.col.status')}</div>
            <div style={{ textAlign: 'right' }}>{t('orders.col.total')}</div>
          </div>
          {orders.map((o) => (
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
                <div
                  style={{
                    font: '400 11px var(--font-body)',
                    color: 'var(--fg-tertiary)',
                  }}
                >
                  {o.phone}
                </div>
              </div>
              <div
                style={{
                  font: '400 12px var(--font-body)',
                  color: 'var(--fg-secondary)',
                }}
              >
                {o.itemsSummary}
              </div>
              <div>
                <span style={o.fulfillmentChipStyle}>{o.fulfillmentLabel}</span>
              </div>
              <div>
                <span style={o.paymentStatusChipStyle}>{o.paymentStatusLabel}</span>
              </div>
              <div>
                <span style={o.columnChipStyle}>{o.columnLabel}</span>
              </div>
              <div
                style={{
                  textAlign: 'right',
                  font: '700 12.5px var(--font-display)',
                }}
              >
                ${o.total}
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  )
}
