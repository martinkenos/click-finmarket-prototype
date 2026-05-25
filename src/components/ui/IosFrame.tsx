import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  darkMode?: boolean
  time?: string
  /** Battery level 0-100. */
  battery?: number
}

/**
 * Decorative iPhone-shaped frame for desktop presentation.
 * NOTE: Currently the App renders fullscreen (Mini App mode), so this is unused
 * by default. Kept for future "Compare A/B side-by-side" presentation view.
 */
export function IosFrame({ children, darkMode, time = '9:41', battery = 100 }: Props) {
  const tc = darkMode ? '#fff' : '#000'
  return (
    <div
      style={{
        display: 'inline-block',
        padding: 12,
        background: '#000',
        borderRadius: 60,
        boxShadow: '0 0 0 2px #1f2937,0 20px 60px rgba(0,0,0,0.35)',
      }}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: 48,
          overflow: 'hidden',
          width: 390,
          height: 844,
          background: darkMode ? '#0E0F11' : '#F4F5F7',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 54,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            fontSize: 16,
            fontWeight: 600,
            fontFamily: '-apple-system,sans-serif',
            zIndex: 20,
            pointerEvents: 'none',
            color: tc,
          }}
        >
          <span>{time}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 12 }}>
              {[4, 6, 9, 11].map((h, i) => (
                <div key={i} style={{ width: 3, height: h, background: tc, borderRadius: 1 }} />
              ))}
            </div>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 11.5a1 1 0 100-2 1 1 0 000 2z" fill={tc} />
              <path d="M3 7.5a7 7 0 0110 0" stroke={tc} strokeWidth="1.3" fill="none" strokeLinecap="round" />
            </svg>
            <div
              style={{
                width: 26,
                height: 12,
                border: `1.5px solid ${tc}`,
                borderRadius: 3,
                padding: 1,
                position: 'relative',
                opacity: 0.8,
              }}
            >
              <div style={{ width: `${battery}%`, height: '100%', background: tc, borderRadius: 1 }} />
              <div
                style={{
                  position: 'absolute',
                  top: 3,
                  right: -3,
                  width: 2,
                  height: 6,
                  background: tc,
                  borderRadius: '0 1px 1px 0',
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 124,
            height: 36,
            background: '#000',
            borderRadius: 999,
            zIndex: 30,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 54,
            left: 0,
            right: 0,
            bottom: 34,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {children}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 140,
            height: 5,
            borderRadius: 999,
            zIndex: 10,
            background: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)',
          }}
        />
      </div>
    </div>
  )
}
