import { useState } from 'react'
import type { Theme, ProductKey, FlowContext } from '@/types'
import { Screen } from '@/components/ui/Screen'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { fmtAmt } from '@/lib/format'

type Props = {
  d: Theme
  onContinue: (ctx: Pick<FlowContext, 'amt' | 'tab' | 'type'>) => void
}

/**
 * Amount-first entry screen (Variant B in the prototype).
 * User picks a tab (borrow/save) → adjusts amount → picks product type → continue.
 */
export function EntryA({ d, onContinue }: Props) {
  const [amt, setAmt] = useState(5_000_000)
  const [tab, setTab] = useState<'borrow' | 'save'>('borrow')
  const [type, setType] = useState<ProductKey | null>(null)

  const types: [string, string, ProductKey][] =
    tab === 'borrow'
      ? [
          ['money', 'Кредит наличными', 'credit-cash'],
          ['house', 'Ипотека', 'mortgage'],
          ['car', 'Автокредит', 'auto'],
          ['lightning', 'Микрокредит', 'micro'],
        ]
      : [
          ['trendUp', 'Депозит в сумах', 'depo-sum'],
          ['money', 'Депозит в USD', 'depo-usd'],
          ['piggy', 'Накопительный', 'depo-save'],
          ['crown', 'Премиум', 'depo-premium'],
        ]

  return (
    <Screen d={d}>
      <div
        style={{
          display: 'flex',
          gap: 4,
          background: d.isDark ? d.border : '#E5E7EB',
          borderRadius: 14,
          padding: 4,
          marginBottom: 22,
          marginTop: 8,
        }}
      >
        {(['borrow', 'save'] as const).map(v => (
          <div
            key={v}
            onClick={() => {
              setTab(v)
              setType(null)
            }}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '9px 0',
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              background: tab === v ? d.cardBg : 'transparent',
              color: tab === v ? d.text : d.textSec,
              boxShadow: tab === v ? d.shadow : 'none',
            }}
          >
            {v === 'borrow' ? 'Взять' : 'Сохранить'}
          </div>
        ))}
      </div>

      <div style={{ fontSize: 22, fontWeight: 800, color: d.text, marginBottom: 4 }}>
        {tab === 'borrow' ? 'Сколько вам нужно?' : 'Сколько хотите вложить?'}
      </div>
      <div style={{ fontSize: 13, color: d.textSec, marginBottom: 16 }}>Подберём лучшие предложения</div>

      <Card d={d} style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 12 }}>
          <div
            onClick={() => setAmt(Math.max(1_000_000, amt - 1_000_000))}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              fontSize: 22,
              fontWeight: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: d.isDark ? d.border : '#F0F0F3',
              color: d.text,
              cursor: 'pointer',
            }}
          >
            −
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: d.text, fontVariantNumeric: 'tabular-nums' }}>
            {fmtAmt(amt)}
          </div>
          <div
            onClick={() => setAmt(Math.min(50_000_000, amt + 1_000_000))}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              fontSize: 22,
              fontWeight: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: d.isDark ? d.border : '#F0F0F3',
              color: d.text,
              cursor: 'pointer',
            }}
          >
            +
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          {[1, 5, 20, 50].map(v => (
            <div
              key={v}
              onClick={() => setAmt(v * 1_000_000)}
              style={{
                padding: '5px 10px',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                background: amt === v * 1_000_000 ? d.primary : d.isDark ? d.border : '#EEE',
                color: amt === v * 1_000_000 ? '#fff' : d.textSec,
              }}
            >
              {v} млн
            </div>
          ))}
        </div>
      </Card>

      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: d.textSec,
          letterSpacing: '.07em',
          marginBottom: 10,
        }}
      >
        ТИП ПРОДУКТА
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
        {types.map(([ic, nm, t]) => {
          const on = type === t
          return (
            <div
              key={t}
              onClick={() => setType(t)}
              style={{
                background: on ? d.primary : d.cardBg,
                borderRadius: 16,
                padding: '12px 14px',
                boxShadow: on ? `0 6px 20px ${d.primary}55` : d.shadow,
                border: `2px solid ${on ? d.primary : 'transparent'}`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'all .15s',
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: on ? 'rgba(255,255,255,.22)' : d.isDark ? d.border : '#F0F0F3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon name={ic} size={18} color={on ? '#fff' : d.text} />
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: on ? '#fff' : d.text,
                  lineHeight: 1.2,
                }}
              >
                {nm}
              </div>
            </div>
          )
        })}
      </div>

      <Button d={d} style={{ opacity: type ? 1 : 0.4 }} onClick={() => type && onContinue({ amt, tab, type })}>
        {type ? 'Подобрать предложения →' : 'Выберите тип продукта'}
      </Button>
    </Screen>
  )
}
