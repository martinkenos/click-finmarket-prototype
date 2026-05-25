import type { CSSProperties, ReactNode } from 'react'
import type { Theme } from '@/types'

type Props = {
  d: Theme
  children: ReactNode
  style?: CSSProperties
  /** Subdued style (border-grey background instead of primary). */
  secondary?: boolean
  onClick?: () => void
}

/**
 * Primary CTA button. Renders as a `div` for full styling control;
 * the underlying tap target uses `cursor: pointer` and `userSelect: none`.
 */
export function Button({ d, children, style, secondary, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        background: secondary ? (d.isDark ? d.border : '#EBEBEB') : d.primary,
        color: secondary ? d.textSec : '#fff',
        borderRadius: 16,
        padding: '16px 24px',
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 16,
        cursor: 'pointer',
        userSelect: 'none',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
