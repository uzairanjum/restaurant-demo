import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useDashboard } from '../../context/DashboardContext'
import { useT } from '../../context/LanguageContext'
import type { TranslationKey } from '../../i18n'
import type { OrderStatus } from '../../types/order'
import { KanbanColumn } from '../orders/KanbanColumn'
import { OrderCard } from '../orders/OrderCard'
import './KitchenBoardView.css'

type BoardColumnId = Exclude<OrderStatus, 'cancelled'>

const ALL_COLUMNS: BoardColumnId[] = [
  'needs_attention',
  'ready_for_kitchen',
  'preparing',
  'ready',
  'out_for_delivery',
  'completed',
]

const STORAGE_KEY = 'tq-board-columns'

function readStoredColumns(): BoardColumnId[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return [...ALL_COLUMNS]
    const parsed = JSON.parse(raw) as string[]
    const valid = ALL_COLUMNS.filter((id) => parsed.includes(id))
    return valid.length > 0 ? valid : [...ALL_COLUMNS]
  } catch {
    return [...ALL_COLUMNS]
  }
}

export function KitchenBoardView() {
  const dash = useDashboard()
  const t = useT()
  const [visibleColumns, setVisibleColumns] = useState<BoardColumnId[]>(readStoredColumns)
  const [filterOpen, setFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visibleColumns))
    } catch {
      /* ignore */
    }
  }, [visibleColumns])

  useEffect(() => {
    if (!filterOpen) return
    const onPointerDown = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFilterOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [filterOpen])

  const toggleColumn = (id: BoardColumnId) => {
    setVisibleColumns((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev
        return prev.filter((c) => c !== id)
      }
      return ALL_COLUMNS.filter((c) => prev.includes(c) || c === id)
    })
  }

  const showAll = () => setVisibleColumns([...ALL_COLUMNS])

  const columns: Array<{
    id: BoardColumnId
    titleKey: TranslationKey
    subtitleKey: TranslationKey
    count: number
    orders: typeof dash.needsAttentionOrders
    iconClassName: string
    icon: ReactNode
  }> = [
    {
      id: 'needs_attention',
      titleKey: 'board.col.needs_attention',
      subtitleKey: 'board.col.needs_attention.sub',
      count: dash.needsAttentionCount,
      orders: dash.needsAttentionOrders,
      iconClassName: 'kanbanColumn__icon--coral',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3 2 20h20L12 3z" /><line x1="12" y1="10" x2="12" y2="14.5" /><circle cx="12" cy="17" r=".6" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'ready_for_kitchen',
      titleKey: 'board.col.ready_for_kitchen',
      subtitleKey: 'board.col.ready_for_kitchen.sub',
      count: dash.readyForKitchenCount,
      orders: dash.readyForKitchenOrders,
      iconClassName: 'kanbanColumn__icon--cold',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      id: 'preparing',
      titleKey: 'board.col.preparing',
      subtitleKey: 'board.col.preparing.sub',
      count: dash.preparingCount,
      orders: dash.preparingOrders,
      iconClassName: 'kanbanColumn__icon--amber',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M12 22c4 0 6.5-2.8 6.5-6.3 0-3.8-3.3-5.7-4.3-9.7-.3 2.6-2.6 3.4-2.6 6 0-1.7-1.3-2.7-1.1-4.7-2 1.4-3.5 4-3.5 6.9 0 .9.2 1.7.5 2.5-1-.6-1.7-1.7-1.9-3-.9 1.2-1.4 2.7-1.4 4.3 0 2.2 1.9 4 4.2 4" />
        </svg>
      ),
    },
    {
      id: 'ready',
      titleKey: 'board.col.ready',
      subtitleKey: 'board.col.ready.sub',
      count: dash.readyCount,
      orders: dash.readyOrders,
      iconClassName: 'kanbanColumn__icon--teal',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      id: 'out_for_delivery',
      titleKey: 'board.col.out_for_delivery',
      subtitleKey: 'board.col.out_for_delivery.sub',
      count: dash.outForDeliveryCount,
      orders: dash.outForDeliveryOrders,
      iconClassName: 'kanbanColumn__icon--cold',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="7" width="13" height="9" rx="1" /><path d="M14 10h4l3 3v3h-7z" /><circle cx="6" cy="18" r="1.5" /><circle cx="17" cy="18" r="1.5" />
        </svg>
      ),
    },
    {
      id: 'completed',
      titleKey: 'board.col.completed',
      subtitleKey: 'board.col.completed.sub',
      count: dash.completedCount,
      orders: dash.completedOrders,
      iconClassName: 'kanbanColumn__icon--neutral',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12l4 4L14 8" /><path d="M8 12l4 4L22 8" />
        </svg>
      ),
    },
  ]

  const visible = columns.filter((col) => visibleColumns.includes(col.id))
  const allSelected = visibleColumns.length === ALL_COLUMNS.length

  return (
    <>
      <div className="boardHeader">
        <div>
          <h1 className="pageTitle">{t('board.title')}</h1>
          <p className="pageSubtitle">{t('board.subtitle')}</p>
        </div>

        <div className="boardFilter" ref={filterRef}>
          <button
            type="button"
            className="boardFilter__btn"
            onClick={() => setFilterOpen((v) => !v)}
            aria-expanded={filterOpen}
            aria-haspopup="true"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span>{t('board.filter')}</span>
            <span className="boardFilter__count">
              {allSelected
                ? t('board.filter.all')
                : t('board.filter.selected', { count: visibleColumns.length })}
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {filterOpen && (
            <div className="boardFilter__menu" role="menu">
              <button type="button" className="boardFilter__showAll" onClick={showAll}>
                {t('board.filter.all')}
              </button>
              {columns.map((col) => {
                const checked = visibleColumns.includes(col.id)
                return (
                  <label key={col.id} className="boardFilter__option">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleColumn(col.id)}
                    />
                    <span>{t(col.titleKey)}</span>
                    <span className="boardFilter__optionCount">{col.count}</span>
                  </label>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="boardEmpty">{t('board.filter.empty')}</div>
      ) : (
        <div className="boardColumns">
          {visible.map((col) => (
            <KanbanColumn
              key={col.id}
              title={t(col.titleKey)}
              subtitle={t(col.subtitleKey)}
              count={col.count}
              iconClassName={col.iconClassName}
              icon={col.icon}
            >
              {col.orders.map((o) => (
                <OrderCard key={o.id} order={o} onOpen={dash.selectOrder} />
              ))}
            </KanbanColumn>
          ))}
        </div>
      )}
    </>
  )
}
