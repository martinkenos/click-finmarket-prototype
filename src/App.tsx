import { useState, useEffect } from 'react'
import type { ThemeKey, Variant, Route } from './types'
import { THEMES } from './data/themes'
import { ProtoFlow } from './ProtoFlow'
import { FloatingControls } from './FloatingControls'
import { applyTheme } from './lib/telegram'

/**
 * App shell — fullscreen Mini App container.
 * Owns 3 pieces of state: theme key, variant (A/B), and current route.
 * Syncs Telegram WebApp theme colors whenever the active theme changes.
 */
export default function App() {
  const [dirK, setDirK] = useState<ThemeKey>('classic')
  const [pv, setPv] = useState<Variant>('A')
  const [pr, setPr] = useState<Route>({ s: 'entry', ctx: {} })
  const d = THEMES[dirK]

  useEffect(() => {
    applyTheme({ isDark: d.isDark, appBg: d.appBg })
  }, [d.isDark, d.appBg])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: d.appBg,
        overflow: 'hidden',
        color: d.text,
        fontFamily: "'Inter',-apple-system,sans-serif",
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <ProtoFlow d={d} variant={pv} route={pr} setRoute={setPr} />
      </div>
      <FloatingControls
        dirK={dirK}
        setDirK={setDirK}
        variant={pv}
        setVariant={setPv}
        setRoute={setPr}
      />
    </div>
  )
}
