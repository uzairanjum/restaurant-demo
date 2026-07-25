import type { ReactNode } from 'react'
import './KanbanColumn.css'

interface KanbanColumnProps {
  title: string
  subtitle: string
  count: number
  icon: ReactNode
  iconClassName: string
  children: ReactNode
}

export function KanbanColumn({
  title,
  subtitle,
  count,
  icon,
  iconClassName,
  children,
}: KanbanColumnProps) {
  return (
    <div className="kanbanColumn">
      <div className="kanbanColumn__head">
        <span className={`kanbanColumn__icon ${iconClassName}`}>{icon}</span>
        <div className="kanbanColumn__titles">
          <div className="kanbanColumn__title">{title}</div>
          <div className="kanbanColumn__subtitle">{subtitle}</div>
        </div>
        <span className="badgeCount">{count}</span>
      </div>
      {children}
    </div>
  )
}
