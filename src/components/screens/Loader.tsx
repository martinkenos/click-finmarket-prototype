import { useState, useEffect } from 'react'
import type { Theme } from '../../types'
import { Screen } from '../ui/Screen'
import { Icon } from '../ui/Icon'

type Props = {
  d: Theme
  onDone: () => void
}

/** Animated 2.4s loader between Params/QuickPick and Results. */
export function Loader({ d, onDone }: Props) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)
  const msgs = ['Подключаемся к банкам', 'Ищем лучшее предложение', 'Почти готово']

  useEffect(() => {
    const DUR = 2400
    const stepDur = DUR / msgs.length
    const timers = msgs.map((_, i) => (i === 0 ? null : setTimeout(() => setStage(i), i * stepDur)))
    const finalT = setTimeout(onDone, DUR + 200)
    const start = Date.now()
    const tick = setInterval(() => {
      const e = Date.now() - start
      const p = Math.min(100, (e / DUR) * 100)
      setProgress(p)
      if (p >= 100) clearInterval(tick)
    }, 30)
    return () => {
      timers.forEach(t => t && clearTimeout(t))
      clearTimeout(finalT)
      clearInterval(tick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Screen
      d={d}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100dvh',
        padding: '40px 32px',
      }}
    >
      <div
        style={{
          width: 84,
          height: 84,
          borderRadius: 99,
          background: d.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 26,
          animation: 'fadeUp .5s ease-out both',
          boxShadow: `0 12px 32px ${d.primary}55`,
        }}
      >
        <Icon name="search" size={44} color="#fff" />
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: d.text,
          marginBottom: 24,
          textAlign: 'center',
          letterSpacing: '-.3px',
        }}
      >
        Подбираем предложения
      </div>
      <div
        style={{
          width: 200,
          height: 4,
          background: d.isDark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.06)',
          borderRadius: 99,
          overflow: 'hidden',
          marginBottom: 20,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: d.primary,
            borderRadius: 99,
            transition: 'width .12s linear',
          }}
        />
      </div>
      <div
        key={stage}
        style={{
          fontSize: 13,
          color: d.textSec,
          textAlign: 'center',
          animation: 'fadeUp .35s ease-out both',
          minHeight: 18,
        }}
      >
        {msgs[stage]}
      </div>
    </Screen>
  )
}
