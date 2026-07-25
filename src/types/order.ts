export type OrderStatus =
  | 'needs_attention'
  | 'ready_for_kitchen'
  | 'preparing'
  | 'ready'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled'

export type IssueType =
  | 'payment_review'
  | 'payment_invalid'
  | 'missing_address'
  | 'customer_change'

export type Fulfillment = 'delivery' | 'pickup'
export type PaymentMethod = 'cod' | 'bank_transfer'

export type DashboardView =
  | 'board'
  | 'orders'
  | 'attention'
  | 'payments'
  | 'conversations'
  | 'customers'
  | 'menu'
  | 'placeholder'
  | 'detail'

export interface OrderItem {
  name: string
  price: number
  qty: number
  notes?: string
}

export interface PaymentProof {
  reviewStatus: 'review' | 'verified' | 'rejected'
  txnId: string
  sender: string
  reference: string
  amount: number
  date: string
  notes: string
}

export interface ConversationMessage {
  from: 'bot' | 'customer' | 'staff'
  text: string
  time: string
  ai?: boolean
  isImage?: boolean
}

export interface Order {
  id: string
  customer: string
  phone: string
  fulfillment: Fulfillment
  address: string
  deliveryNote?: string
  items: OrderItem[]
  deliveryFee: number
  paymentMethod: PaymentMethod
  status: OrderStatus
  issueType: IssueType | null
  placedMinAgo: number
  placedTimeLabel: string
  customerNote: string
  internalNote: string
  proof?: PaymentProof
  conversation: ConversationMessage[]
  subtotal: number
  total: number
}

export interface EnrichedOrder extends Order {
  subtotalStr: string
  totalStr: string
  deliveryFeeStr: string
  itemsSummary: string
  fulfillmentLabel: string
  fulfillmentChipClass: string
  paymentMethodLabel: string
  paymentStatusLabel: string
  paymentStatusChipClass: string
  timeLabel: string
  timeChipClass: string
  issueLabel: string | null
  issueChipClass: string | null
  columnLabel: string
  columnChipClass: string
}

export interface MenuAddon {
  name: string
  price: number
}

export interface MenuItem {
  name: string
  price: number
  desc: string
  options: string[]
  addons: MenuAddon[]
}

export interface MenuCategory {
  name: string
  items: MenuItem[]
}

export interface ItemForm {
  category: string
  name: string
  price: string
  desc: string
  options: string
  addons: MenuAddon[]
  addonName: string
  addonPrice: string
}

export interface CustomerSummary {
  customer: string
  phone: string
  count: number
  totalSpent: number
  totalSpentStr: string
  lastOrderId: string
  lastColumnLabel: string
  lastColumnChipClass: string
}
