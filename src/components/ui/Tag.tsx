import type { ReactNode } from 'react'
import type { Theme } from '@/types'

type Props = {
  d: Theme
  children: ReactNode
  active?: boolean
  /** Override the active background color (defaults to theme primary). */
  color?: string
  onClick?: () => void
}

/** Small pill used in horizontal sort/filter strips. */
export function Tag({ d, children, active, color, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '6px 12px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        background: active ? (color || d.primary) : d.isDark ? d.border : '#EBEBEB',
        color: active ? '#fff' : d.textSec,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all .15s',
      }}
    >
      {children}
    </div>
  )
}
