import { useState, type ReactNode } from 'react'
import type { Theme } from '../../types'
import { Icon } from './Icon'

type Props = {
  d: Theme
  onClose: () => void
  children: ReactNode
  /** Persistent action area at the bottom (e.g. CTA buttons). */
  footer?: ReactNode
}

/**
 * Modal bottom sheet with backdrop, grab handle and close button.
 * Slides up on mount, slides down on close (with the appropriate
 * animation backdrop and the unmount delayed by 260ms via setTimeout).
 */
export function BottomSheet({ d, onClose, children, footer }: Props) {
  const [closing, setClosing] = useState(false)
  const handle = () => {
    if (closing) return
    setClosing(true)
    setTimeout(onClose, 260)
  }
  return (
    <>
      <div
        onClick={handle}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,.55)',
          zIndex: 50,
          animation: closing ? 'backdropOut .24s ease-out both' : 'backdropIn .28s ease-out both',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 48,
          bottom: 0,
          background: d.cardBg,
          borderRadius: '24px 24px 0 0',
          zIndex: 51,
          display: 'flex',
          flexDirection: 'column',
          animation: closing
            ? 'sheetDown .26s ease-in both'
            : 'sheetUp .42s cubic-bezier(.16,1,.3,1) both',
          boxShadow: '0 -8px 32px rgba(0,0,0,.28)',
        }}
      >
        <div style={{ position: 'relative', padding: '10px 0 6px', textAlign: 'center', flexShrink: 0 }}>
          <div
            style={{
              width: 36,
              height: 4,
              background: d.isDark ? '#3A3B3F' : '#D5D6DA',
              borderRadius: 99,
              margin: '0 auto',
            }}
          />
          <div
            onClick={handle}
            style={{
              position: 'absolute',
              right: 14,
              top: 6,
              width: 32,
              height: 32,
              borderRadius: 99,
              background: d.isDark ? d.border : '#F0F0F3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Icon name="close" size={16} color={d.text} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '6px 16px 12px' }}>{children}</div>
        {footer && (
          <div
            style={{
              padding: '12px 16px 18px',
              background: d.cardBg,
              borderTop: `1px solid ${d.isDark ? d.border : '#F0F0F3'}`,
              flexShrink: 0,
              boxShadow: '0 -4px 16px rgba(0,0,0,.06)',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </>
  )
}
