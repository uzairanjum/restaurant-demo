import type { CSSProperties } from 'react'
import type { IssueType, Order, OrderStatus } from '../types/order'

export function chipStyle(bg: string, fg: string): CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '3px 8px',
    borderRadius: '999px',
    font: '600 10.5px Inter, sans-serif',
    background: bg,
    color: fg,
    whiteSpace: 'nowrap',
  }
}

export function money(n: number): string {
  return n.toFixed(2)
}

export const ISSUE_LABELS: Record<IssueType, string> = {
  payment_review: 'Payment verification required',
  payment_invalid: 'Payment invalid — amount mismatch',
  missing_address: 'Missing delivery address',
  customer_change: 'Customer requested a change',
}

export const ISSUE_TONE: Record<IssueType, { bg: string; fg: string }> = {
  payment_review: { bg: '#FFF0F1', fg: '#9B1B2C' },
  payment_invalid: { bg: '#FFF0F1', fg: '#9B1B2C' },
  missing_address: { bg: '#FFF8EB', fg: '#8A5208' },
  customer_change: { bg: '#F4ECFF', fg: '#5D38C3' },
}

export const COLUMN_LABELS: Record<OrderStatus, string> = {
  needs_attention: 'Needs attention',
  ready_for_kitchen: 'Ready for kitchen',
  preparing: 'Preparing',
  ready: 'Ready',
  out_for_delivery: 'Out for delivery',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export const COLUMN_TONE: Record<
  Exclude<OrderStatus, 'cancelled'>,
  { bg: string; fg: string }
> = {
  needs_attention: { bg: '#FFF0F1', fg: '#9B1B2C' },
  ready_for_kitchen: { bg: '#ECF3FF', fg: '#1F4FAA' },
  preparing: { bg: '#FFF8EB', fg: '#8A5208' },
  ready: { bg: '#EAFBF6', fg: '#07604D' },
  out_for_delivery: { bg: '#ECF3FF', fg: '#1F4FAA' },
  completed: { bg: '#F5F5F5', fg: '#555E67' },
}

export function enrichOrder(o: Order) {
  const paymentStatus =
    o.paymentMethod === 'cod'
      ? 'cod'
      : o.issueType === 'payment_review'
        ? 'review'
        : o.issueType === 'payment_invalid'
          ? 'invalid'
          : 'paid'

  const paymentStatusLabel = {
    cod: 'COD',
    review: 'Payment review',
    invalid: 'Payment invalid',
    paid: 'Paid',
  }[paymentStatus]

  const paymentStatusTone = {
    cod: { bg: '#F5F5F5', fg: '#555E67' },
    review: { bg: '#FFF8EB', fg: '#8A5208' },
    invalid: { bg: '#FFF0F1', fg: '#9B1B2C' },
    paid: { bg: '#EAFBF6', fg: '#07604D' },
  }[paymentStatus]

  const timeTone =
    o.placedMinAgo < 15
      ? { bg: '#EAFBF6', fg: '#07604D' }
      : o.placedMinAgo < 30
        ? { bg: '#FFF8EB', fg: '#8A5208' }
        : { bg: '#FFF0F1', fg: '#9B1B2C' }

  const issueTone = o.issueType ? ISSUE_TONE[o.issueType] : null
  const columnTone =
    o.status !== 'cancelled' ? COLUMN_TONE[o.status] : COLUMN_TONE.completed

  return {
    ...o,
    subtotalStr: money(o.subtotal),
    totalStr: money(o.total),
    deliveryFeeStr: money(o.deliveryFee),
    itemsSummary: o.items.map((it) => `${it.qty}x ${it.name}`).join(', '),
    fulfillmentLabel: o.fulfillment === 'delivery' ? 'Delivery' : 'Pickup',
    fulfillmentChipStyle: chipStyle(
      o.fulfillment === 'delivery' ? '#ECF3FF' : '#F5F5F5',
      o.fulfillment === 'delivery' ? '#1F4FAA' : '#555E67',
    ),
    paymentMethodLabel: o.paymentMethod === 'cod' ? 'COD' : 'Bank transfer',
    paymentStatusLabel,
    paymentStatusChipStyle: chipStyle(
      paymentStatusTone.bg,
      paymentStatusTone.fg,
    ),
    timeLabel: `${o.placedMinAgo}m`,
    timeChipStyle: chipStyle(timeTone.bg, timeTone.fg),
    issueLabel: o.issueType ? ISSUE_LABELS[o.issueType] : null,
    issueChipStyle: issueTone ? chipStyle(issueTone.bg, issueTone.fg) : null,
    columnLabel: COLUMN_LABELS[o.status],
    columnChipStyle: chipStyle(columnTone.bg, columnTone.fg),
  }
}

export type EnrichedOrder = ReturnType<typeof enrichOrder>

export function bubbleForMain(m: {
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
    } as CSSProperties,
    bubbleStyle: {
      maxWidth: '78%',
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
    } as CSSProperties,
  }
}

export function navStyle(active: boolean): CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '9px 10px',
    borderRadius: '8px',
    border: 0,
    background: active ? 'var(--brand-bg)' : 'transparent',
    color: active ? 'var(--brand-fg)' : 'var(--fg-secondary)',
    font: '600 12.5px Inter, sans-serif',
    textAlign: 'left',
  }
}
