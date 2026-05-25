import { useState } from 'react'
import type { Variant, ThemeKey, Route } from './types'
import { THEMES } from './data/themes'
import { Icon } from './components/ui/Icon'

type Props = {
  dirK: ThemeKey
  setDirK: (k: ThemeKey) => void
  variant: Variant
  setVariant: (v: Variant) => void
  setRoute: (r: Route) => void
}

/**
 * Floating debug menu (FAB at bottom-left). Lets the demo audience switch
 * between Variant A/B and the three themes without leaving the prototype.
 * Not part of the production UX.
 */
export function FloatingControls({ dirK, setDirK, variant, setVariant, setRoute }: Props) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      {open && (
        <div
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 998,
            background: 'rgba(0,0,0,.35)',
            animation: 'backdropIn .22s ease-out both',
          }}
        />
      )}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 84,
            left: 16,
            zIndex: 999,
            background: 'rgba(20,21,24,.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,.1)',
            borderRadius: 18,
            padding: 16,
            minWidth: 256,
            maxWidth: 'calc(100vw - 32px)',
            boxShadow: '0 24px 60px rgba(0,0,0,.55)',
            animation: 'menuIn .25s cubic-bezier(.2,.9,.3,1.15) both',
            transformOrigin: 'bottom left',
            color: '#fff',
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '.12em',
              color: 'rgba(255,255,255,.45)',
              marginBottom: 8,
            }}
          >
            СЦЕНАРИЙ
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
            {(
              [
                ['A', 'Вариант A'],
                ['B', 'Вариант B'],
              ] as [Variant, string][]
            ).map(([v, l]) => (
              <div
                key={v}
                onClick={() => {
                  setVariant(v)
                  setRoute({ s: 'entry', ctx: {} })
                }}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '10px 0',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all .15s',
                  background: variant === v ? '#0077FF' : 'rgba(255,255,255,.08)',
                  color: variant === v ? '#fff' : 'rgba(255,255,255,.55)',
                }}
              >
                {l}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '.12em',
              color: 'rgba(255,255,255,.45)',
              marginBottom: 8,
            }}
          >
            СТИЛЬ
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
            {(Object.entries(THEMES) as [ThemeKey, (typeof THEMES)[ThemeKey]][]).map(([k, dd]) => (
              <div
                key={k}
                onClick={() => setDirK(k)}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '10px 0',
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all .15s',
                  background: dirK === k ? '#0077FF' : 'rgba(255,255,255,.08)',
                  color: dirK === k ? '#fff' : 'rgba(255,255,255,.55)',
                }}
              >
                {dd.label}
              </div>
            ))}
          </div>
          <div
            onClick={() => {
              setRoute({ s: 'entry', ctx: {} })
              close()
            }}
            style={{
              padding: '11px 14px',
              borderRadius: 10,
              cursor: 'pointer',
              textAlign: 'center',
              background: 'rgba(255,255,255,.06)',
              border: '1px solid rgba(255,255,255,.12)',
              fontSize: 12,
              fontWeight: 600,
              color: 'rgba(255,255,255,.75)',
            }}
          >
            ↺ Начать сначала
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Меню"
        style={{
          position: 'fixed',
          bottom: 20,
          left: 16,
          zIndex: 1000,
          width: 52,
          height: 52,
          borderRadius: 99,
          background: '#0077FF',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 28px rgba(0,119,255,.5)',
          transition: 'transform .28s cubic-bezier(.4,1.6,.5,1)',
          transform: open ? 'rotate(90deg) scale(.94)' : 'rotate(0) scale(1)',
          padding: 0,
          outline: 'none',
        }}
      >
        <Icon name={open ? 'close' : 'dotsThree'} size={24} color="#fff" />
      </button>
    </>
  )
}
