import { useState } from 'react'
import type { Theme, FlowContext } from '../../types'
import { Screen } from '../ui/Screen'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SURVEY } from '../../data/survey'

type Props = {
  d: Theme
  onBack: () => void
  onComplete: (ctx: Pick<FlowContext, 'tab' | 'type' | 'amt' | 'problems'>) => void
}

/**
 * 3-step survey: intent → priorities → amount.
 * On completion, derives a flow context with `tab`, `type`, `amt` and `problems`
 * (used downstream by Results to reorder banks).
 */
type Answers = {
  q1?: string[]
  q2?: string[]
  amount?: number
}

export function QuickPick({ d, onBack, onComplete }: Props) {
  const [step, setStep] = useState(0)
  const [sel, setSel] = useState<string[]>([])
  const [amt, setAmt] = useState<number | null>(null)
  const [ans, setAns] = useState<Answers>({})

  const cur = SURVEY[step]
  const progress = (step + 1) / 3

  const toggle = (v: string) => {
    if (cur.type === 'single') setSel([v])
    else if (sel.includes(v)) setSel(sel.filter(x => x !== v))
    else if (sel.length < 2) setSel([...sel, v])
  }

  const canNext = cur.type === 'amount' ? amt !== null : sel.length > 0

  const next = () => {
    const newAns: Answers =
      cur.type === 'amount'
        ? { ...ans, amount: amt! }
        : { ...ans, [`q${step + 1}`]: sel }
    setAns(newAns)
    if (step < 2) {
      setStep(step + 1)
      setSel([])
      setAmt(null)
    } else {
      const tab: 'save' | 'borrow' = newAns.q1?.includes('save') ? 'save' : 'borrow'
      const type = tab === 'save' ? 'depo-sum' : 'credit-cash'
      const amount = newAns.amount ?? 5
      onComplete({ tab, type, amt: amount * 1_000_000, problems: newAns.q2 ?? [] })
    }
  }

  return (
    <Screen d={d} style={{ paddingTop: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
        <div
          onClick={step > 0 ? () => setStep(step - 1) : onBack}
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            fontSize: 18,
            cursor: 'pointer',
            color: d.textSec,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ‹
        </div>
        <div
          style={{
            flex: 1,
            height: 4,
            background: d.isDark ? d.border : '#E5E7EB',
            borderRadius: 99,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress * 100}%`,
              background: d.primary,
              borderRadius: 99,
              transition: 'width .35s cubic-bezier(.4,0,.2,1)',
            }}
          />
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: d.textSec, width: 28, textAlign: 'right' }}>
          {step + 1}/3
        </div>
      </div>

      <div style={{ fontSize: 22, fontWeight: 800, color: d.text, lineHeight: 1.2, marginBottom: 4 }}>{cur.q}</div>
      {cur.hint ? (
        <div style={{ fontSize: 13, color: d.textSec, marginBottom: 18 }}>{cur.hint}</div>
      ) : (
        <div style={{ marginBottom: 18 }} />
      )}

      {cur.type !== 'amount' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 22 }}>
          {cur.opts.map(opt => {
            const on = sel.includes(opt.val)
            return (
              <div
                key={opt.val}
                onClick={() => toggle(opt.val)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 16,
                  background: on ? (d.isDark ? '#0A2540' : '#E8F2FF') : d.cardBg,
                  border: `2px solid ${on ? d.primary : 'transparent'}`,
                  boxShadow: on ? 'none' : d.shadow,
                  cursor: 'pointer',
                  transition: 'all .15s',
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: opt.c + '1A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon name={opt.ic} size={20} color={opt.c} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: d.text }}>{opt.label}</span>
                {on && <Icon name="check" size={18} color={d.primary} style={{ marginLeft: 'auto' }} />}
              </div>
            )
          })}
        </div>
      )}

      {cur.type === 'amount' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16, marginTop: 6 }}>
            {cur.opts.map(o => {
              const isPreset = amt === o.val
              return (
                <div
                  key={o.label}
                  onClick={() => setAmt(o.val)}
                  style={{
                    padding: '18px 12px',
                    borderRadius: 16,
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: isPreset ? (d.isDark ? '#0A2540' : '#E8F2FF') : d.cardBg,
                    border: `2px solid ${isPreset ? d.primary : 'transparent'}`,
                    boxShadow: isPreset ? 'none' : d.shadow,
                    transition: 'all .15s',
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 800, color: isPreset ? d.primary : d.text }}>
                    {o.label}
                  </div>
                  <div style={{ fontSize: 12, color: d.textSec }}>сум</div>
                </div>
              )
            })}
          </div>
          {(() => {
            const isCustom = amt != null && !cur.opts.find(o => o.val === amt)
            return (
              <input
                type="number"
                inputMode="decimal"
                placeholder="Или введите свою сумму, млн"
                value={isCustom ? amt! : ''}
                onChange={e => {
                  const v = parseFloat(e.target.value)
                  setAmt(isNaN(v) || v <= 0 ? null : v)
                }}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 16,
                  background: d.inputBg,
                  border: `2px solid ${isCustom ? d.primary : 'transparent'}`,
                  outline: 'none',
                  color: d.text,
                  fontSize: 15,
                  marginBottom: 18,
                  WebkitAppearance: 'none',
                }}
              />
            )
          })()}
        </>
      )}

      <Button d={d} style={{ opacity: canNext ? 1 : 0.4 }} onClick={() => canNext && next()}>
        {step < 2 ? (
          'Далее →'
        ) : (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Icon name="sparkle" size={16} color="#fff" />
            Найти предложения
          </span>
        )}
      </Button>
    </Screen>
  )
}
