import type { CSSProperties } from 'react'
import { ICONS } from '@/icons/phosphor'

type Props = {
  name: keyof typeof ICONS
  size?: number
  color?: string
  style?: CSSProperties
}

/** Renders one of the Phosphor SVG icons defined in src/icons/phosphor.ts */
export function Icon({ name, size = 20, color = 'currentColor', style }: Props) {
  const def = ICONS[name]
  if (!def) return null
  const d = typeof def === 'string' ? def : def.d
  const vb = typeof def === 'string' ? '0 0 256 256' : def.vb
  return (
    <svg
      width={size}
      height={size}
      viewBox={vb}
      fill={color}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    >
      <path d={d} />
    </svg>
  )
}
