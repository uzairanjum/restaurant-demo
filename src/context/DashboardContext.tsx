import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { buildOrders, buildRawMenu } from '../data/orders'
import { displayMenu, EMPTY_ITEM_FORM } from '../data/menu'
import type {
  DashboardView,
  ItemForm,
  MenuCategory,
  Order,
} from '../types/order'
import { useT } from './LanguageContext'
import {
  bubbleForMain,
  enrichOrder,
  money,
  navStyle,
  statusLabel,
} from '../utils/orderUtils'

interface DashboardContextValue {
  view: DashboardView
  previousView: DashboardView
  location: string
  showLocationMenu: boolean
  sidebarOpen: boolean
  kitchenOnline: boolean
  searchQuery: string
  toast: string | null
  menu: MenuCategory[]
  showCategoryInput: boolean
  categoryDraft: string
  showItemModal: boolean
  itemForm: ItemForm
  conversationsSelectedId: string | null
  conversationDraft: string
  selectedOrderId: string | null
  orders: Order[]
  enrichedOrders: ReturnType<typeof enrichOrder>[]
  selectedOrder: ReturnType<typeof enrichOrder> | null
  needsAttentionCount: number
  activeOrdersCount: number
  avgPrepTime: string
  needsAttentionOrders: ReturnType<typeof enrichOrder>[]
  readyForKitchenOrders: ReturnType<typeof enrichOrder>[]
  preparingOrders: ReturnType<typeof enrichOrder>[]
  readyOrders: ReturnType<typeof enrichOrder>[]
  outForDeliveryOrders: ReturnType<typeof enrichOrder>[]
  completedOrders: ReturnType<typeof enrichOrder>[]
  readyForKitchenCount: number
  preparingCount: number
  readyCount: number
  outForDeliveryCount: number
  completedCount: number
  filteredAllOrders: ReturnType<typeof enrichOrder>[]
  bankTransferOrders: ReturnType<typeof enrichOrder>[]
  customers: Array<{
    customer: string
    phone: string
    count: number
    totalSpent: number
    totalSpentStr: string
    lastOrderId: string
    lastColumnLabel: string
    lastColumnChipStyle: ReturnType<typeof enrichOrder>['columnChipStyle']
  }>
  conversationList: Array<{
    id: string
    customer: string
    initials: string
    lastMessage: string
    timeLabel: string
    selected: boolean
  }>
  activeConversation: {
    id: string
    customer: string
    phone: string
    messages: ReturnType<typeof bubbleForMain>[]
  } | null
  menuCategories: ReturnType<typeof displayMenu>
  showAddCategoryButton: boolean
  itemFormAddons: Array<{
    name: string
    price: number
    priceStr: string
    remove: () => void
  }>
  kitchenDotStyle: React.CSSProperties
  kitchenStatusLabel: string
  navBoardStyle: React.CSSProperties
  navOrdersStyle: React.CSSProperties
  navAttentionStyle: React.CSSProperties
  navPaymentsStyle: React.CSSProperties
  navConversationsStyle: React.CSSProperties
  navCustomersStyle: React.CSSProperties
  navMenuStyle: React.CSSProperties
  navReportsStyle: React.CSSProperties
  navSettingsStyle: React.CSSProperties
  toggleLocationMenu: () => void
  toggleSidebar: () => void
  closeSidebar: () => void
  selectRomaNorte: () => void
  selectCondesa: () => void
  toggleKitchenOnline: () => void
  onSearchChange: (value: string) => void
  goToBoard: () => void
  goToOrders: () => void
  goToAttention: () => void
  goToPayments: () => void
  goToConversations: () => void
  goToCustomers: () => void
  goToMenu: () => void
  goToPlaceholder: () => void
  selectOrder: (id: string) => void
  goBack: () => void
  clearConversationSelection: () => void
  markVerified: (id: string) => void
  rejectPayment: (id: string) => void
  advanceStatus: (id: string) => void
  resolveIssue: (id: string) => void
  cancelOrder: (id: string) => void
  contactCustomer: (id: string) => void
  selectConversation: (id: string) => void
  onConversationDraftChange: (value: string) => void
  sendConversationMessage: () => void
  openCategoryInput: () => void
  cancelCategoryInput: () => void
  onCategoryDraftChange: (value: string) => void
  saveCategory: () => void
  openAddItem: (categoryName: string) => void
  closeItemModal: () => void
  onItemFormChange: (field: keyof ItemForm) => (value: string) => void
  addAddonRow: () => void
  saveItem: () => void
}

const DashboardContext = createContext<DashboardContextValue | null>(null)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const t = useT()
  const [view, setView] = useState<DashboardView>('board')
  const [previousView, setPreviousView] = useState<DashboardView>('board')
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [location, setLocation] = useState('Roma Norte')
  const [showLocationMenu, setShowLocationMenu] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [kitchenOnline, setKitchenOnline] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [orders, setOrders] = useState(buildOrders)
  const [toast, setToast] = useState<string | null>(null)
  const [menu, setMenu] = useState<MenuCategory[]>(buildRawMenu)
  const [showCategoryInput, setShowCategoryInput] = useState(false)
  const [categoryDraft, setCategoryDraft] = useState('')
  const [showItemModal, setShowItemModal] = useState(false)
  const [itemForm, setItemForm] = useState<ItemForm>(EMPTY_ITEM_FORM)
  const [conversationsSelectedId, setConversationsSelectedId] = useState<
    string | null
  >(null)
  const [conversationDraft, setConversationDraft] = useState('')
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  const updateOrder = useCallback((id: string, patch: Partial<Order>) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...patch } : o)),
    )
  }, [])

  const selectOrder = useCallback((id: string) => {
    setView((currentView) => {
      setPreviousView((prev) => (currentView === 'detail' ? prev : currentView))
      return 'detail'
    })
    setSelectedOrderId(id)
    setSidebarOpen(false)
  }, [])

  const value = useMemo((): DashboardContextValue => {
    const active = orders.filter(
      (o) => o.status !== 'cancelled' && o.status !== 'completed',
    )
    const enriched = orders
      .filter((o) => o.status !== 'cancelled')
      .map((o) => enrichOrder(o, t))
    const q = searchQuery.trim().toLowerCase()
    const matches = (o: { customer: string; phone: string; id: string }) =>
      !q ||
      o.customer.toLowerCase().includes(q) ||
      o.phone.toLowerCase().includes(q) ||
      o.id.includes(q)
    const byStatus = (key: Order['status']) =>
      enriched.filter((o) => o.status === key && matches(o))

    const selectedRaw = selectedOrderId
      ? orders.find((o) => o.id === selectedOrderId)
      : null
    const selectedOrder = selectedRaw ? enrichOrder(selectedRaw, t) : null

    const totalPrepMin = active
      .filter((o) => ['preparing', 'ready_for_kitchen'].includes(o.status))
      .reduce((sum, o) => sum + o.placedMinAgo, 0)
    const prepCount = active.filter((o) =>
      ['preparing', 'ready_for_kitchen'].includes(o.status),
    ).length

    const sortedActive = [...active].sort(
      (a, b) => a.placedMinAgo - b.placedMinAgo,
    )
    const selConvId =
      conversationsSelectedId || (sortedActive[0] && sortedActive[0].id)

    return {
      view,
      previousView,
      location,
      showLocationMenu,
      sidebarOpen,
      kitchenOnline,
      searchQuery,
      toast,
      menu,
      showCategoryInput,
      categoryDraft,
      showItemModal,
      itemForm,
      conversationsSelectedId,
      conversationDraft,
      selectedOrderId,
      orders,
      enrichedOrders: enriched,
      selectedOrder,
      needsAttentionCount: byStatus('needs_attention').length,
      activeOrdersCount: active.length,
      avgPrepTime: prepCount ? `${Math.round(totalPrepMin / prepCount)}m` : '—',
      needsAttentionOrders: byStatus('needs_attention'),
      readyForKitchenOrders: byStatus('ready_for_kitchen'),
      preparingOrders: byStatus('preparing'),
      readyOrders: byStatus('ready'),
      outForDeliveryOrders: byStatus('out_for_delivery'),
      completedOrders: byStatus('completed'),
      readyForKitchenCount: byStatus('ready_for_kitchen').length,
      preparingCount: byStatus('preparing').length,
      readyCount: byStatus('ready').length,
      outForDeliveryCount: byStatus('out_for_delivery').length,
      completedCount: byStatus('completed').length,
      filteredAllOrders: enriched.filter(matches),
      bankTransferOrders: enriched.filter(
        (o) => o.paymentMethod === 'bank_transfer' && matches(o),
      ),
      customers: (() => {
        const map: Record<
          string,
          {
            customer: string
            phone: string
            count: number
            totalSpent: number
            lastOrder: ReturnType<typeof enrichOrder>
          }
        > = {}
        enriched.forEach((o) => {
          if (!map[o.phone]) {
            map[o.phone] = {
              customer: o.customer,
              phone: o.phone,
              count: 0,
              totalSpent: 0,
              lastOrder: o,
            }
          }
          const c = map[o.phone]
          c.count += 1
          c.totalSpent += o.total
          if (o.placedMinAgo < c.lastOrder.placedMinAgo) c.lastOrder = o
        })
        return Object.values(map)
          .filter((c) =>
            matches({
              customer: c.customer,
              phone: c.phone,
              id: c.lastOrder.id,
            }),
          )
          .map((c) => ({
            customer: c.customer,
            phone: c.phone,
            count: c.count,
            totalSpent: c.totalSpent,
            totalSpentStr: money(c.totalSpent),
            lastOrderId: c.lastOrder.id,
            lastColumnLabel: c.lastOrder.columnLabel,
            lastColumnChipStyle: c.lastOrder.columnChipStyle,
          }))
      })(),
      conversationList: sortedActive.map((o) => {
        const msgs = o.conversation || []
        const last = msgs[msgs.length - 1]
        return {
          id: o.id,
          customer: o.customer,
          initials: o.customer
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')
            .toUpperCase(),
          lastMessage: last ? last.text : t('conversations.noMessages'),
          timeLabel: `${o.placedMinAgo}m`,
          selected: o.id === selConvId,
        }
      }),
      activeConversation: (() => {
        const o = orders.find((order) => order.id === selConvId)
        if (!o) return null
        return {
          id: o.id,
          customer: o.customer,
          phone: o.phone,
          messages: (o.conversation || []).map(bubbleForMain),
        }
      })(),
      menuCategories: displayMenu(menu).map((cat) => ({
        ...cat,
        openAddItem: () => {},
      })),
      showAddCategoryButton: !showCategoryInput,
      itemFormAddons: itemForm.addons.map((a) => ({
        ...a,
        priceStr: money(a.price),
        remove: () => {},
      })),
      kitchenDotStyle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: kitchenOnline ? '#0F9C7E' : '#94979C',
        display: 'inline-block',
      },
      kitchenStatusLabel: kitchenOnline
        ? t('header.kitchenOnline')
        : t('header.kitchenOffline'),
      navBoardStyle: navStyle(view === 'board'),
      navOrdersStyle: navStyle(view === 'orders'),
      navAttentionStyle: navStyle(view === 'attention'),
      navPaymentsStyle: navStyle(view === 'payments'),
      navConversationsStyle: navStyle(view === 'conversations'),
      navCustomersStyle: navStyle(view === 'customers'),
      navMenuStyle: navStyle(view === 'menu'),
      navReportsStyle: navStyle(false),
      navSettingsStyle: navStyle(false),
      toggleLocationMenu: () => setShowLocationMenu((v) => !v),
      toggleSidebar: () => setSidebarOpen((v) => !v),
      closeSidebar: () => setSidebarOpen(false),
      selectRomaNorte: () => {
        setLocation('Roma Norte')
        setShowLocationMenu(false)
      },
      selectCondesa: () => {
        setLocation('Condesa')
        setShowLocationMenu(false)
      },
      toggleKitchenOnline: () => setKitchenOnline((v) => !v),
      onSearchChange: setSearchQuery,
      goToBoard: () => {
        setView('board')
        setSelectedOrderId(null)
        setSidebarOpen(false)
      },
      goToOrders: () => {
        setView('orders')
        setSelectedOrderId(null)
        setSidebarOpen(false)
      },
      goToAttention: () => {
        setView('attention')
        setSelectedOrderId(null)
        setSidebarOpen(false)
      },
      goToPayments: () => {
        setView('payments')
        setSelectedOrderId(null)
        setSidebarOpen(false)
      },
      goToConversations: () => {
        setView('conversations')
        setSelectedOrderId(null)
        setSidebarOpen(false)
        setConversationsSelectedId(
          (prev) => prev || (sortedActive[0] && sortedActive[0].id) || null,
        )
      },
      goToCustomers: () => {
        setView('customers')
        setSelectedOrderId(null)
        setSidebarOpen(false)
      },
      goToMenu: () => {
        setView('menu')
        setSelectedOrderId(null)
        setSidebarOpen(false)
        setShowItemModal(false)
        setItemForm(EMPTY_ITEM_FORM)
        setShowCategoryInput(false)
        setCategoryDraft('')
      },
      goToPlaceholder: () => {
        setView('placeholder')
        setSelectedOrderId(null)
        setSidebarOpen(false)
      },
      selectOrder,
      clearConversationSelection: () => setConversationsSelectedId(null),
      goBack: () => {
        setView(previousView)
        setSelectedOrderId(null)
      },
      markVerified: (id) => {
        const order = orders.find((o) => o.id === id)
        if (!order?.proof) return
        updateOrder(id, {
          issueType: null,
          status: 'ready_for_kitchen',
          proof: { ...order.proof, reviewStatus: 'verified' },
        })
        showToast(t('toast.paymentVerified'))
      },
      rejectPayment: (id) => {
        const order = orders.find((o) => o.id === id)
        if (!order?.proof) return
        updateOrder(id, {
          issueType: 'payment_invalid',
          proof: { ...order.proof, reviewStatus: 'rejected' },
        })
        showToast(t('toast.paymentRejected'))
      },
      resolveIssue: (id) => {
        updateOrder(id, { issueType: null, status: 'ready_for_kitchen' })
        showToast(t('toast.issueResolved'))
      },
      contactCustomer: () => showToast(t('toast.whatsapp')),
      cancelOrder: (id) => {
        updateOrder(id, { status: 'cancelled' })
        showToast(t('toast.cancelled'))
        setView(previousView)
        setSelectedOrderId(null)
      },
      advanceStatus: (id) => {
        const order = orders.find((o) => o.id === id)
        if (!order) return
        const nextMap: Partial<Record<Order['status'], Order['status']>> = {
          ready_for_kitchen: 'preparing',
          preparing: 'ready',
          ready:
            order.fulfillment === 'delivery' ? 'out_for_delivery' : 'completed',
          out_for_delivery: 'completed',
        }
        const next = nextMap[order.status]
        if (next) {
          updateOrder(id, { status: next })
          showToast(t('toast.moved', { status: statusLabel(next, t) }))
        }
      },
      selectConversation: setConversationsSelectedId,
      onConversationDraftChange: setConversationDraft,
      sendConversationMessage: () => {
        const text = conversationDraft.trim()
        if (!text) return
        const id = selConvId
        const o = orders.find((order) => order.id === id)
        if (!o) return
        const time = new Date().toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        })
        updateOrder(id, {
          conversation: [
            ...(o.conversation || []),
            { from: 'staff', text, time },
          ],
        })
        setConversationDraft('')
      },
      openCategoryInput: () => {
        setShowCategoryInput(true)
        setCategoryDraft('')
      },
      cancelCategoryInput: () => {
        setShowCategoryInput(false)
        setCategoryDraft('')
      },
      onCategoryDraftChange: setCategoryDraft,
      saveCategory: () => {
        const name = categoryDraft.trim()
        if (!name) return
        setMenu((prev) => [...prev, { name, items: [] }])
        setShowCategoryInput(false)
        setCategoryDraft('')
        showToast(t('toast.categoryAdded', { name }))
      },
      openAddItem: (categoryName) => {
        setShowItemModal(true)
        setItemForm({ ...EMPTY_ITEM_FORM, category: categoryName })
      },
      closeItemModal: () => {
        setShowItemModal(false)
        setItemForm(EMPTY_ITEM_FORM)
      },
      onItemFormChange: (field) => (value) => {
        setItemForm((prev) => ({ ...prev, [field]: value }))
      },
      addAddonRow: () => {
        const name = itemForm.addonName.trim()
        const price = parseFloat(itemForm.addonPrice)
        if (!name || Number.isNaN(price)) return
        setItemForm((prev) => ({
          ...prev,
          addons: [...prev.addons, { name, price }],
          addonName: '',
          addonPrice: '',
        }))
      },
      saveItem: () => {
        const name = itemForm.name.trim()
        const price = parseFloat(itemForm.price)
        if (!name || Number.isNaN(price)) {
          showToast(t('toast.itemRequired'))
          return
        }
        const options = itemForm.options
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
        const newItem = {
          name,
          price,
          desc: itemForm.desc.trim(),
          options,
          addons: itemForm.addons,
        }
        setMenu((prev) =>
          prev.map((cat) =>
            cat.name === itemForm.category
              ? { ...cat, items: [...cat.items, newItem] }
              : cat,
          ),
        )
        setShowItemModal(false)
        setItemForm(EMPTY_ITEM_FORM)
        showToast(
          t('toast.itemAdded', { name, category: itemForm.category }),
        )
      },
    }
  }, [
    t,
    view,
    previousView,
    location,
    showLocationMenu,
    sidebarOpen,
    kitchenOnline,
    searchQuery,
    orders,
    toast,
    menu,
    showCategoryInput,
    categoryDraft,
    showItemModal,
    itemForm,
    conversationsSelectedId,
    conversationDraft,
    selectedOrderId,
    selectOrder,
    updateOrder,
    showToast,
  ])

  const patchedValue = useMemo(() => {
    return {
      ...value,
      menuCategories: value.menuCategories.map((cat) => ({
        ...cat,
        openAddItem: () => value.openAddItem(cat.name),
      })),
      itemFormAddons: value.itemForm.addons.map((a, i) => ({
        ...a,
        priceStr: money(a.price),
        remove: () => {
          setItemForm((prev) => ({
            ...prev,
            addons: prev.addons.filter((_, idx) => idx !== i),
          }))
        },
      })),
    }
  }, [value])

  return (
    <DashboardContext.Provider value={patchedValue}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider')
  return ctx
}
