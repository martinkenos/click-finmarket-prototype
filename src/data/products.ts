import type { Product, ProductKey } from '@/types'

/** Catalog of financial products. */
export const PRODUCTS: Record<ProductKey, Product> = {
  'credit-cash':   { name: 'Кредит наличными', icon: 'money',   kind: 'credit' },
  'mortgage':      { name: 'Ипотека',          icon: 'house',   kind: 'credit' },
  'auto':          { name: 'Автокредит',       icon: 'car',     kind: 'credit' },
  'micro':         { name: 'Микрокредит',      icon: 'lightning', kind: 'credit' },
  'depo-sum':      { name: 'Депозит в сумах',  icon: 'trendUp', kind: 'depo'   },
  'depo-usd':      { name: 'Депозит в USD',    icon: 'money',   kind: 'depo'   },
  'depo-save':     { name: 'Накопительный',    icon: 'piggy',   kind: 'depo'   },
  'depo-premium':  { name: 'Премиум депозит',  icon: 'crown',   kind: 'depo'   },
}
