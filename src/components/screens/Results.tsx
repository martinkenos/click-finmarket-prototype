import { useState } from 'react'
import type { Theme, FlowContext, Bank } from '@/types'
import { Screen } from '@/components/ui/Screen'
import { Tag } from '@/components/ui/Tag'
import { Icon } from '@/components/ui/Icon'
import { PageBack } from '@/components/ui/PageBack'
import { BankLogo } from '@/components/ui/BankLogo'
import { BANKS } from '@/data/banks'
import { PRODUCTS } from '@/data/products'
import { fmtAmt } from '@/lib/format'

type Props = {
  d: Theme
  ctx: FlowContext
  onBack: () => void
  onBank: (b: Bank) => void
}

const SPEED_ORDER: Record<string, number> = {
  '1 час': 1, '1 день': 2, '2 дня': 3, '3 дня': 4, '5 дней': 5,
}

const PROBLEM_LABELS: Record<string, [string, string]> = {
  fast:   ['lightning', 'Быстро'],
  cheap:  ['coins', 'Дёшево'],
  nodocs: ['clipboard', 'Без справок'],
  goal:   ['house', 'Под цель'],
  large:  ['star', 'Крупная сумма'],
}

/**
 * Top-5 bank offers. Initial order biased by the user's `problems` from QuickPick,
 * then can be re-sorted via tabs (recommended / by rate / by speed).
 */
export function Results({ d, ctx, onBack, onBank }: Props) {
  const [sort, setSort] = useState<'rec' | 'rate' | 'speed'>('rec')
  const info = PRODUCTS[ctx.type || 'credit-cash']

  let banks: Bank[] = [...BANKS]
  if (ctx.problems?.includes('cheap')) {
    banks.sort((a, b) => parseInt(a.rate) - parseInt(b.rate))
  } else if (ctx.problems?.includes('fast')) {
    banks.sort((a, b) => (SPEED_ORDER[a.speed] || 9) - (SPEED_ORDER[b.speed] || 9))
  } else if (ctx.problems?.includes('nodocs')) {
    banks.sort((a, b) => (b.noDocs ? 1 : 0) - (a.noDocs ? 1 : 0))
  }
  if (sort === 'rate') {
    banks = [...banks].sort((a, b) => parseInt(a.rate) - parseInt(b.rate))
  } else if (sort === 'speed') {
    banks = [...banks].sort((a, b) => (SPEED_ORDER[a.speed] || 9) - (SPEED_ORDER[b.speed] || 9))
  }

  return (
    <Screen d={d}>
      <PageBack d={d} onClick={onBack} />
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            fontSize: 21,
            fontWeight: 800,
            color: d.text,
            marginBottom: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {banks.length} предложений для вас <Icon name="sparkle" size={18} color={d.primary} />
        </div>
        <div style={{ fontSize: 12, color: d.textSec }}>
          {info.name} · {fmtAmt(ctx.amt || 5_000_000)}
          {ctx.term ? ` · ${ctx.term} мес` : ''}
        </div>
      </div>

      {ctx.problems && ctx.problems.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          {ctx.problems.map(p => {
            const lbl = PROBLEM_LABELS[p]
            if (!lbl) return null
            return (
              <div
                key={p}
                style={{
                  padding: '5px 10px',
                  borderRadius: 99,
                  fontSize: 11,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  background: d.primary + '15',
                  color: d.primary,
                  border: `1px solid ${d.primary}35`,
                }}
              >
                <Icon name={lbl[0]} size={12} color={d.primary} />
                {lbl[1]}
              </div>
            )
          })}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 14, overflowX: 'auto', paddingBottom: 2 }}>
        {(
          [
            ['rec', 'Рекомендуем'],
            ['rate', 'По ставке'],
            ['speed', 'По скорости'],
          ] as [typeof sort, string][]
        ).map(([v, l]) => (
          <Tag key={v} d={d} active={sort === v} onClick={() => setSort(v)}>
            {l}
          </Tag>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {banks.map((b, i) => (
          <div
            key={b.name}
            onClick={() => onBank(b)}
            style={{
              background: d.cardBg,
              borderRadius: 20,
              padding: 16,
              boxShadow: d.shadow,
              cursor: 'pointer',
              animation: `staggerIn .35s ease-out ${i * 0.07}s both`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <BankLogo b={b} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: d.text }}>{b.name}</div>
                {i === 0 && (
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: d.primary,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    <Icon name="star" size={12} color={d.primary} />
                    Рекомендуем
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: d.text,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {b.rate}
                </div>
                <div style={{ fontSize: 12, color: d.textSec }}>годовых</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 5,
                  alignItems: 'flex-end',
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: d.textSec,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <Icon name="lightning" size={13} color={d.textSec} />
                  За {b.speed}
                </div>
                {b.noDocs && (
                  <div
                    style={{
                      fontSize: 13,
                      color: d.textSec,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <Icon name="clipboard" size={13} color={d.textSec} />
                    Без справок
                  </div>
                )}
              </div>
            </div>
            <div
              style={{
                marginTop: 12,
                paddingTop: 12,
                borderTop: `1px solid ${d.isDark ? d.border : '#F0F0F3'}`,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: d.primary }}>Подробнее →</div>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  )
}
