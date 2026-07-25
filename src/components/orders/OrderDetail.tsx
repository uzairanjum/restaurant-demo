import { useState } from 'react'
import { useDashboard } from '../../context/DashboardContext'
import type { Order } from '../../types/order'
import { enrichOrder } from '../../utils/orderUtils'
import './OrderDetail.css'

function bubbleFor(m: {
  from: string
  text: string
  time: string
  ai?: boolean
}) {
  const customer = m.from === 'customer'
  return {
    ...m,
    rowStyle: {
      display: 'flex',
      justifyContent: customer ? 'flex-start' : 'flex-end',
    },
    bubbleStyle: {
      maxWidth: '80%',
      padding: '9px 12px',
      borderRadius: '12px',
      ...(customer
        ? {
            background: 'var(--bg-subtle)',
            color: 'var(--fg-primary)',
            borderBottomLeftRadius: '3px',
          }
        : m.ai
          ? {
              background: 'var(--accent-bg)',
              color: 'var(--fg-primary)',
              borderBottomRightRadius: '3px',
            }
          : {
              background: 'var(--brand-grad)',
              color: '#fff',
              borderBottomRightRadius: '3px',
            }),
    },
  }
}

interface OrderDetailProps {
  order: ReturnType<typeof enrichOrder>
}

export function OrderDetail({ order }: OrderDetailProps) {
  const {
    goBack,
    markVerified,
    rejectPayment,
    advanceStatus,
    resolveIssue,
    cancelOrder,
    contactCustomer,
  } = useDashboard()

  const [draft, setDraft] = useState('')
  const [extraMessages, setExtraMessages] = useState<
    Array<{ from: string; text: string; time: string }>
  >([])

  const isBankTransfer = order.paymentMethod === 'bank_transfer'
  const isDelivery = order.fulfillment === 'delivery'
  const hasAddress = isDelivery && !!order.address
  const hasNoAddress = isDelivery && !order.address
  const isNeedsAttention = order.status === 'needs_attention'
  const showPaymentActions =
    isNeedsAttention && order.issueType === 'payment_review'
  const showResolveActions =
    isNeedsAttention &&
    (order.issueType === 'missing_address' ||
      order.issueType === 'customer_change' ||
      order.issueType === 'payment_invalid')
  const showProgressActions =
    !isNeedsAttention && order.status !== 'completed'
  const showCompletedNote = order.status === 'completed'
  const showCancel = order.status !== 'completed'

  const advanceLabel =
    ({
      ready_for_kitchen: 'Start preparing',
      preparing: 'Mark ready',
      ready: isDelivery ? 'Send out for delivery' : 'Mark picked up',
      out_for_delivery: 'Mark delivered',
    } as Partial<Record<Order['status'], string>>)[order.status] || 'Advance'

  const resolveLabel =
    order.issueType === 'payment_invalid'
      ? 'Retry verification'
      : 'Move to ready for kitchen'

  const reviewStatus = order.proof?.reviewStatus
  const reviewBadgeStyles = {
    review: { background: '#FFF8EB', color: '#8A5208', label: 'Under review' },
    verified: { background: '#EAFBF6', color: '#07604D', label: 'Verified' },
    rejected: { background: '#FFF0F1', color: '#9B1B2C', label: 'Rejected' },
  } as const

  const reviewBadge = reviewStatus ? reviewBadgeStyles[reviewStatus] : null

  const conversation = [...(order.conversation || []), ...extraMessages].map(
    bubbleFor,
  )

  const sendMessage = () => {
    const text = draft.trim()
    if (!text) return
    const time = new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    })
    setExtraMessages((prev) => [...prev, { from: 'staff', text, time }])
    setDraft('')
  }

  return (
    <div className="orderDetail">
      <div className="orderDetail__header">
        <button type="button" className="orderDetail__back" onClick={goBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="M11 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="orderDetail__headerMain">
          <h1>Order #{order.id}</h1>
          <div className="orderDetail__chips">
            <span style={order.columnChipStyle}>{order.columnLabel}</span>
            {order.issueLabel && (
              <span style={order.issueChipStyle ?? undefined}>{order.issueLabel}</span>
            )}
          </div>
          <div className="orderDetail__meta">
            Placed {order.timeLabel} ago · {order.placedTimeLabel} · via WhatsApp
          </div>
        </div>
      </div>

      <div className="orderDetail__grid">
        <div className="orderDetail__left">
          <div className="card">
            <div className="orderDetail__cardHead">
              <h2 className="cardTitle">Customer</h2>
              <button type="button" className="orderDetail__editBtn">Edit</button>
            </div>
            <div className="orderDetail__customerBlock">
              <div className="orderDetail__customerRow">
                <div className="orderDetail__customerName">{order.customer}</div>
                <a
                  className="orderDetail__waLink"
                  href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm5.3 14.3c-.2.6-1.3 1.2-1.8 1.2-.5.1-1.1.1-1.7-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1.1-2.5c.3-.3.6-.3.8-.3h.6c.2 0 .5 0 .7.5.3.6.9 2.1 1 2.2.1.2.1.4 0 .6-.1.2-.2.3-.3.5-.2.2-.3.3-.5.5-.2.2-.3.4-.1.7.2.3.9 1.5 1.9 2.4 1.3 1.2 2.4 1.5 2.7 1.7.3.2.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.8.9 2.1 1 .3.2.5.2.6.3.1.2.1.7-.1 1.3z" />
                  </svg>
                  {order.phone}
                </a>
              </div>
              {isDelivery && (
                <div className="orderDetail__addressBox">
                  <div className="fieldLabel">Delivery address</div>
                  {hasAddress ? (
                    <>
                      <div>{order.address}</div>
                      {order.deliveryNote && (
                        <div className="orderDetail__note">Note: {order.deliveryNote}</div>
                      )}
                    </>
                  ) : hasNoAddress ? (
                    <div className="orderDetail__missingAddress">No address on file yet</div>
                  ) : null}
                </div>
              )}
              {!isDelivery && (
                <div className="orderDetail__addressBox">Pickup in-store</div>
              )}
            </div>
          </div>

          <div className="card">
            <h2 className="cardTitle">Order status</h2>
            <div className="orderDetail__statusGrid">
              <div>
                <div className="fieldLabel">Order status</div>
                <span style={order.columnChipStyle}>{order.columnLabel}</span>
              </div>
              <div>
                <div className="fieldLabel">Payment status</div>
                <span style={order.paymentStatusChipStyle}>{order.paymentStatusLabel}</span>
              </div>
              <div>
                <div className="fieldLabel">Channel</div>
                <div className="orderDetail__value">WhatsApp</div>
              </div>
              <div>
                <div className="fieldLabel">Order type</div>
                <div className="orderDetail__value">{order.fulfillmentLabel}</div>
              </div>
              <div>
                <div className="fieldLabel">Payment method</div>
                <div className="orderDetail__value">{order.paymentMethodLabel}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="cardTitle">Order summary</h2>
            <div className="orderDetail__items">
              {order.items.map((it) => (
                <div key={`${it.name}-${it.qty}`} className="orderDetail__itemRow">
                  <div>
                    <span className="orderDetail__itemQty">{it.qty}x</span> {it.name}
                    {it.notes && <div className="orderDetail__itemNotes">{it.notes}</div>}
                  </div>
                  <div>${it.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="orderDetail__totals">
              <div><span>Subtotal</span><span>${order.subtotalStr}</span></div>
              <div><span>Delivery fee</span><span>${order.deliveryFeeStr}</span></div>
              <div className="orderDetail__totalRow"><span>Total</span><span>${order.totalStr}</span></div>
              {isBankTransfer && (
                <div className="orderDetail__expected">
                  <span>Amount expected</span><span>${order.totalStr}</span>
                </div>
              )}
            </div>
            {order.customerNote && (
              <div className="orderDetail__noteBox">
                <div className="fieldLabel">Customer note</div>
                <div>{order.customerNote}</div>
              </div>
            )}
            {order.internalNote && (
              <div className="orderDetail__internalNote">
                <div className="fieldLabel" style={{ color: 'var(--accent-fg)' }}>Internal kitchen note</div>
                <div>{order.internalNote}</div>
              </div>
            )}
          </div>

          <div className="card orderDetail__actions">
            {showPaymentActions && (
              <div>
                <div className="fieldLabel">Payment review</div>
                <div className="orderDetail__actionRow">
                  <button type="button" className="btnTeal" onClick={() => markVerified(order.id)}>Mark as verified</button>
                  <button type="button" className="btnReject" onClick={() => rejectPayment(order.id)}>Reject payment</button>
                </div>
              </div>
            )}
            {showProgressActions && (
              <div>
                <div className="fieldLabel">Order progression</div>
                <div className="orderDetail__actionRow">
                  <button type="button" className="btnPrimary orderDetail__advanceBtn" onClick={() => advanceStatus(order.id)}>{advanceLabel}</button>
                  <button type="button" className="btnSecondary orderDetail__advanceBtn" onClick={() => contactCustomer(order.id)}>Contact customer</button>
                </div>
              </div>
            )}
            {showResolveActions && (
              <div>
                <div className="fieldLabel">Resolve issue</div>
                <div className="orderDetail__actionRow">
                  <button type="button" className="btnSecondary orderDetail__advanceBtn" onClick={() => contactCustomer(order.id)}>Contact customer</button>
                  <button type="button" className="btnPrimary orderDetail__advanceBtn" onClick={() => resolveIssue(order.id)}>{resolveLabel}</button>
                </div>
              </div>
            )}
            {showCompletedNote && (
              <div className="orderDetail__completedNote">This order is complete — no further action needed.</div>
            )}
            {showCancel && (
              <div className="orderDetail__cancelRow">
                <button type="button" className="orderDetail__cancelBtn" onClick={() => cancelOrder(order.id)}>Cancel order</button>
              </div>
            )}
          </div>
        </div>

        <div className="orderDetail__right">
          {isBankTransfer && order.proof && (
            <div className="card">
              <div className="orderDetail__cardHead">
                <h2 className="cardTitle">Payment proof</h2>
                {reviewBadge && (
                  <span
                    className="orderDetail__reviewBadge"
                    style={{ background: reviewBadge.background, color: reviewBadge.color }}
                  >
                    {reviewBadge.label}
                  </span>
                )}
              </div>
              <div className="orderDetail__proofPlaceholder">
                Payment screenshot attaches here in the live app
              </div>
              <div className="orderDetail__proofGrid">
                <div><div className="fieldLabel">Transaction ID</div><div className="orderDetail__value">{order.proof.txnId}</div></div>
                <div><div className="fieldLabel">Sender</div><div className="orderDetail__value">{order.proof.sender}</div></div>
                <div><div className="fieldLabel">Reference</div><div className="orderDetail__value">{order.proof.reference}</div></div>
                <div><div className="fieldLabel">Date</div><div className="orderDetail__value">{order.proof.date}</div></div>
                <div>
                  <div className="fieldLabel">Amount received</div>
                  <div style={{ font: '700 12.5px Inter, sans-serif', color: order.proof.amount !== order.total ? '#C42A3D' : 'var(--fg-primary)' }}>
                    ${order.proof.amount}
                  </div>
                </div>
                <div><div className="fieldLabel">Amount expected</div><div className="orderDetail__value">${order.totalStr}</div></div>
              </div>
              <a href="#" className="orderDetail__proofLink">View original ↗</a>
              <div className="orderDetail__reviewNotes">
                <div className="fieldLabel">Review notes</div>
                <textarea defaultValue={order.proof.notes} placeholder="Add a note about this review…" />
              </div>
            </div>
          )}

          <div className="card orderDetail__conversation">
            <div className="orderDetail__cardHead">
              <h2 className="cardTitle">Conversation</h2>
              <a href="#" className="orderDetail__proofLink">View all ↗</a>
            </div>
            <div className="orderDetail__messages">
              {conversation.map((m, i) => (
                <div key={i} style={m.rowStyle}>
                  <div style={m.bubbleStyle}>
                    {m.ai && <div className="orderDetail__aiLabel">✦ AI parsed</div>}
                    <div>{m.text}</div>
                    <div className="orderDetail__msgTime">{m.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="orderDetail__composer">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Send a WhatsApp message…"
              />
              <button type="button" className="btnPrimary" onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
