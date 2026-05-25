import { useRef } from 'react'
import type { Theme, FlowContext } from '@/types'
import { Screen } from '@/components/ui/Screen'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

type Props = {
  d: Theme
  ctx: FlowContext
  onDone: () => void
}

/** Final screen — application submitted, reference number generated. */
export function Success({ d, ctx, onDone }: Props) {
  const ref = useRef('FM-2026-' + String(Math.floor(Math.random() * 9000) + 1000))
  return (
    <Screen
      d={d}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100dvh',
        textAlign: 'center',
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
          marginBottom: 22,
          animation: 'fadeUp .5s ease-out both',
          boxShadow: `0 12px 32px ${d.primary}55`,
        }}
      >
        <Icon name="check" size={48} color="#fff" />
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: d.text,
          marginBottom: 8,
          animation: 'fadeUp .5s ease-out .1s both',
        }}
      >
        Заявка отправлена!
      </div>
      <div
        style={{
          fontSize: 14,
          color: d.textSec,
          marginBottom: 22,
          maxWidth: 280,
          lineHeight: 1.5,
          animation: 'fadeUp .5s ease-out .2s both',
        }}
      >
        {ctx.bank?.name || 'Банк'} свяжется с вами в течение 1 рабочего дня
      </div>
      <Card
        d={d}
        style={{
          padding: '14px 18px',
          marginBottom: 24,
          width: '100%',
          maxWidth: 280,
          animation: 'fadeUp .5s ease-out .3s both',
        }}
      >
        <div style={{ fontSize: 11, color: d.textSec, letterSpacing: '.08em', marginBottom: 4 }}>НОМЕР ЗАЯВКИ</div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: d.text,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          #{ref.current}
        </div>
      </Card>
      <div style={{ width: '100%', animation: 'fadeUp .5s ease-out .4s both' }}>
        <Button d={d} onClick={onDone}>
          В начало
        </Button>
      </div>
    </Screen>
  )
}
