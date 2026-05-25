import type { CSSProperties, ReactNode } from 'react'
import type { Theme } from '@/types'

type Props = {
  d: Theme
  children: ReactNode
  style?: CSSProperties
  /** Optional accent color rendered as a 4px left border. */
  accent?: string
  onClick?: () => void
}

/** Standard rounded card surface used everywhere in the prototype. */
export function Card({ d, children, style, accent, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        background: d.cardBg,
        borderRadius: 20,
        padding: 16,
        boxShadow: d.shadow,
        ...(accent ? { borderLeft: `4px solid ${accent}` } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
