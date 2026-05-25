import type { Theme, ProductKey } from '../../types'
import { Screen } from '../ui/Screen'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'

type Props = {
  d: Theme
  onQuickPick: () => void
  onPickType: (type: ProductKey) => void
}

/**
 * QuickPick-first entry screen (Variant A in the prototype).
 * Big gradient "Quick Pick" CTA at the top + product tiles as a fallback path.
 */
export function EntryB({ d, onQuickPick, onPickType }: Props) {
  const tiles: [string, string, string, ProductKey][] = [
    ['money',     'Кредит наличными', d.accent,   'credit-cash'],
    ['house',     'Ипотека',          '#E05C5C',  'mortgage'],
    ['car',       'Автокредит',       d.orange,   'auto'],
    ['trendUp',   'Депозит',          d.violet,   'depo-sum'],
    ['lightning', 'Микрокредит',      '#5CA8FF',  'micro'],
    ['piggy',     'USD-депозит',      '#4CAF80',  'depo-usd'],
  ]

  return (
    <Screen d={d}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 8,
          marginBottom: 18,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 800, color: d.text }}>Finmarket</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: d.textSec }}>Топ-5 банков</div>
      </div>

      <div
        onClick={onQuickPick}
        style={{
          background: `linear-gradient(135deg,${d.primary} 0%,#005FCC 100%)`,
          borderRadius: 24,
          padding: '22px 20px 18px',
          marginBottom: 20,
          cursor: 'pointer',
          animation: 'pulse 2.2s ease-in-out infinite',
          boxShadow: `0 8px 28px ${d.primary}55`,
        }}
      >
        <Icon name="sparkle" size={32} color="#fff" style={{ marginBottom: 8 }} />
        <div style={{ fontSize: 21, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Быстрый подбор</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,.85)', marginBottom: 14 }}>
          3 вопроса — лучшие предложения
        </div>
        <div
          style={{
            background: 'rgba(255,255,255,.18)',
            borderRadius: 12,
            padding: '10px 18px',
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
            textAlign: 'center',
          }}
        >
          Подобрать за 30 сек →
        </div>
      </div>

      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: d.textSec,
          letterSpacing: '.06em',
          marginBottom: 10,
        }}
      >
        ИЛИ ВЫБЕРИТЕ ТИП
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {tiles.map(([ic, nm, c, t]) => (
          <Card
            key={t}
            d={d}
            onClick={() => onPickType(t)}
            style={{ padding: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background: c + '1A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon name={ic} size={20} color={c} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: d.text, lineHeight: 1.2 }}>{nm}</div>
          </Card>
        ))}
      </div>
    </Screen>
  )
}
