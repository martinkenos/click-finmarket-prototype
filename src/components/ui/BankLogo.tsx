import type { Bank } from '@/types'

type Props = {
  b: Bank
  /** Logo size in pixels. Defaults to 36. */
  sz?: number
}

/** Single-letter colored badge — used as a stand-in for real bank logos. */
export function BankLogo({ b, sz = 36 }: Props) {
  return (
    <div
      style={{
        width: sz,
        height: sz,
        borderRadius: sz * 0.28,
        background: b.lc + '22',
        border: `1.5px solid ${b.lc}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: sz * 0.44,
        fontWeight: 800,
        color: b.lc,
        flexShrink: 0,
      }}
    >
      {b.l}
    </div>
  )
}
