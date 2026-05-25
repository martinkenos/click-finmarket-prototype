import type { CSSProperties, ReactNode } from 'react'
import type { Theme } from '../../types'

type Props = {
  d: Theme
  children: ReactNode
  style?: CSSProperties
}

/**
 * Root container for a single screen. Applies theme background, font and padding.
 * Min-height fills the iOS frame inner viewport.
 */
export function Screen({ d, children, style }: Props) {
  return (
    <div
      style={{
        minHeight: '100%',
        background: d.screenBg,
        padding: '8px 16px 28px',
        fontFamily: "'Inter',-apple-system,sans-serif",
        color: d.text,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
