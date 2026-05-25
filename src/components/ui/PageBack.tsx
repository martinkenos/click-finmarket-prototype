import type { Theme } from '../../types'

type Props = {
  d: Theme
  onClick: () => void
  label?: string
}

/** Tappable "‹ Назад" used in screen headers. */
export function PageBack({ d, onClick, label }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '8px 12px 8px 6px',
        marginLeft: -6,
        marginBottom: 6,
        borderRadius: 10,
        cursor: 'pointer',
        color: d.textSec,
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      <span style={{ fontSize: 20, lineHeight: 1 }}>‹</span>
      {label || 'Назад'}
    </div>
  )
}
