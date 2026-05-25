import { useState } from 'react'
import type { Theme, FlowContext } from '@/types'
import { Screen } from '@/components/ui/Screen'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { PageBack } from '@/components/ui/PageBack'
import { PRODUCTS } from '@/data/products'
import { fmtAmt } from '@/lib/format'

type Props = {
  d: Theme
  ctx: FlowContext
  onBack: () => void
  onContinue: (ctx: Pick<FlowContext, 'term' | 'repay' | 'curr' | 'cap' | 'autoT'>) => void
}

/**
 * Parameters screen — term, repayment type for credits;
 * currency, term, capitalization for deposits.
 * For auto-loans there is a sub-screen asking for car category.
 */
export function Params({ d, ctx, onBack, onContinue }: Props) {
  const [term, setTerm] = useState(24)
  const [repay, setRepay] = useState<'annuity' | 'diff'>('annuity')
  const [curr, setCurr] = useState<'sum' | 'usd'>('sum')
  const [cap, setCap] = useState(true)
  const [autoT, setAutoT] = useState<'uzauto' | 'foreign' | 'leasing' | null>(null)

  const info = PRODUCTS[ctx.type || 'credit-cash']
  const isDepo = info.kind === 'depo'
  const isAuto = ctx.type === 'auto'
  const amt = ctx.amt || 5_000_000

  if (isAuto && !autoT) {
    const opts: [string, string, string, 'uzauto' | 'foreign' | 'leasing'][] = [
      ['car', 'UzAuto', 'Узбекского производства', 'uzauto'],
      ['car', 'Иномарка', 'Зарубежного производства', 'foreign'],
      ['fileText', 'Лизинг', 'Программа лизинга', 'leasing'],
    ]
    return (
      <Screen d={d}>
        <PageBack d={d} onClick={onBack} />
        <div style={{ fontSize: 22, fontWeight: 800, color: d.text, marginBottom: 4 }}>Тип автомобиля</div>
        <div style={{ fontSize: 13, color: d.textSec, marginBottom: 18 }}>Выберите категорию</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {opts.map(([ic, nm, sub, v]) => (
            <Card
              key={v}
              d={d}
              onClick={() => setAutoT(v)}
              style={{ padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: d.isDark ? d.border : '#F0F0F3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon name={ic} size={22} color={d.text} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: d.text }}>{nm}</div>
                <div style={{ fontSize: 12, color: d.textSec }}>{sub}</div>
              </div>
              <div style={{ color: d.textTert, fontSize: 22 }}>›</div>
            </Card>
          ))}
        </div>
      </Screen>
    )
  }

  return (
    <Screen d={d}>
      <PageBack d={d} onClick={onBack} />
      <div style={{ fontSize: 22, fontWeight: 800, color: d.text, marginBottom: 2 }}>
        Параметры {isDepo ? 'депозита' : 'кредита'}
      </div>
      <div
        style={{
          fontSize: 13,
          color: d.textSec,
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <Icon name={info.icon} size={14} color={d.textSec} />
        {info.name} · {fmtAmt(amt)}
      </div>

      {!isDepo && (
        <>
          <Card d={d} style={{ marginBottom: 10 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: d.textSec,
                letterSpacing: '.08em',
                marginBottom: 12,
              }}
            >
              СРОК
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[12, 24, 36, 60].map(t => (
                <div
                  key={t}
                  onClick={() => setTerm(t)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '10px 0',
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: term === t ? d.primary : d.isDark ? d.border : '#EBECEF',
                    color: term === t ? '#fff' : d.textSec,
                    transition: 'all .15s',
                  }}
                >
                  {t}м
                </div>
              ))}
            </div>
          </Card>
          <Card d={d} style={{ marginBottom: 18 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: d.textSec,
                letterSpacing: '.08em',
                marginBottom: 12,
              }}
            >
              ПОГАШЕНИЕ
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(
                [
                  ['annuity', 'Аннуитет'],
                  ['diff', 'Дифференц.'],
                ] as [typeof repay, string][]
              ).map(([v, l]) => (
                <div
                  key={v}
                  onClick={() => setRepay(v)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '10px 0',
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: repay === v ? d.primary : d.isDark ? d.border : '#EBECEF',
                    color: repay === v ? '#fff' : d.textSec,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {isDepo && (
        <>
          <Card d={d} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: d.textSec, letterSpacing: '.08em', marginBottom: 12 }}>
              ВАЛЮТА
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {(
                [
                  ['sum', 'Сум'],
                  ['usd', 'USD'],
                ] as [typeof curr, string][]
              ).map(([v, l]) => (
                <div
                  key={v}
                  onClick={() => setCurr(v)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '10px 0',
                    borderRadius: 12,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: curr === v ? d.primary : d.isDark ? d.border : '#EBECEF',
                    color: curr === v ? '#fff' : d.textSec,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
          </Card>
          <Card d={d} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: d.textSec, letterSpacing: '.08em', marginBottom: 12 }}>
              СРОК
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[3, 12, 36].map(t => (
                <div
                  key={t}
                  onClick={() => setTerm(t)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '10px 0',
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: term === t ? d.primary : d.isDark ? d.border : '#EBECEF',
                    color: term === t ? '#fff' : d.textSec,
                  }}
                >
                  {t} мес
                </div>
              ))}
            </div>
          </Card>
          <Card d={d} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: d.text }}>Капитализация</div>
                <div style={{ fontSize: 12, color: d.textSec }}>Проценты прибавляются к сумме</div>
              </div>
              <div
                onClick={() => setCap(!cap)}
                style={{
                  width: 44,
                  height: 26,
                  borderRadius: 99,
                  position: 'relative',
                  cursor: 'pointer',
                  background: cap ? d.primary : d.isDark ? d.border : '#DDD',
                  transition: 'all .2s',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 2,
                    left: cap ? 20 : 2,
                    width: 22,
                    height: 22,
                    borderRadius: 99,
                    background: '#fff',
                    boxShadow: '0 1px 3px rgba(0,0,0,.25)',
                    transition: 'left .2s',
                  }}
                />
              </div>
            </div>
          </Card>
        </>
      )}

      <Button d={d} onClick={() => onContinue({ term, repay, curr, cap, autoT })}>
        Найти предложения →
      </Button>
    </Screen>
  )
}
