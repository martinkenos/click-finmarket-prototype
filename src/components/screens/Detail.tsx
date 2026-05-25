import type { Theme, FlowContext } from '../../types'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { BankLogo } from '../ui/BankLogo'
import { PRODUCTS } from '../../data/products'
import { fmtAmt, annuityPayment } from '../../lib/format'

type Props = {
  d: Theme
  ctx: FlowContext
}

/**
 * Bank detail content (renders inside the BottomSheet).
 * Shows quick stats, monthly payment for credits, conditions and requirements.
 */
export function Detail({ d, ctx }: Props) {
  if (!ctx.bank) return null
  const b = ctx.bank
  const info = PRODUCTS[ctx.type || 'credit-cash']
  const isDepo = info.kind === 'depo'
  const amt = ctx.amt || 5_000_000
  const term = ctx.term || 24
  const pay = annuityPayment(amt, parseInt(b.rate), term)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, marginTop: 8 }}>
        <BankLogo b={b} sz={54} />
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: d.text }}>{b.name}</div>
          <div
            style={{
              fontSize: 13,
              color: d.textSec,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Icon name={info.icon} size={14} color={d.textSec} />
            {info.name}
          </div>
        </div>
      </div>

      <Card d={d} style={{ marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: d.text,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {b.rate}
            </div>
            <div style={{ fontSize: 11, color: d.textSec }}>ставка/год</div>
          </div>
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: d.text,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {term}
            </div>
            <div style={{ fontSize: 11, color: d.textSec }}>месяцев</div>
          </div>
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: d.text,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {fmtAmt(amt).replace(' сум', '')}
            </div>
            <div style={{ fontSize: 11, color: d.textSec }}>сумма</div>
          </div>
        </div>
      </Card>

      {!isDepo && (
        <div
          style={{
            background: d.primary,
            borderRadius: 20,
            padding: 16,
            marginBottom: 12,
            color: '#fff',
            boxShadow: `0 6px 20px ${d.primary}40`,
          }}
        >
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.85)', marginBottom: 4 }}>Ежемесячный платёж</div>
          <div style={{ fontSize: 26, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
            {pay.toLocaleString('ru-RU')}{' '}
            <span style={{ fontSize: 15, fontWeight: 600, opacity: 0.85 }}>сум</span>
          </div>
        </div>
      )}

      <Card d={d} style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: d.text, marginBottom: 12 }}>Условия</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(
            [
              ['lightning', `Решение за ${b.speed}`],
              [b.noDocs ? 'clipboard' : 'fileText', b.noDocs ? 'Без справки о доходах' : 'Со справкой о доходах'],
              ['creditCard', 'Выдача на карту Click'],
              ['lock', 'Досрочное погашение без штрафов'],
            ] as [string, string][]
          ).map(([ic, l], i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div
                style={{
                  width: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon name={ic} size={16} color={d.primary} />
              </div>
              <div style={{ fontSize: 14, color: d.text, lineHeight: 1.45 }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card d={d} style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: d.text, marginBottom: 12 }}>Что понадобится</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'Паспорт гражданина РУз',
            b.noDocs ? 'Без справки о доходах' : 'Справка о доходах за 6 мес.',
            'Активный аккаунт Click',
          ].map((l, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 99,
                  background: d.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <Icon name="check" size={11} color="#fff" />
              </div>
              <div style={{ fontSize: 13, color: d.text }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}

/** Footer for the Detail BottomSheet: "Submit application" + "Save" CTAs. */
export function DetailActions({ d, onSubmit }: { d: Theme; onSubmit: () => void }) {
  return (
    <>
      <Button d={d} onClick={onSubmit}>
        Подать заявку →
      </Button>
      <div style={{ marginTop: 8 }}>
        <Button d={d} secondary>
          Сохранить
        </Button>
      </div>
    </>
  )
}
