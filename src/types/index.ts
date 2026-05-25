/**
 * Design direction (theme). The prototype supports 3 themes that switch at runtime.
 * Components accept the theme as `d` prop and use values inline.
 */
export type Theme = {
  label: string
  appBg: string
  cardBg: string
  screenBg: string
  primary: string
  text: string
  textSec: string
  textTert: string
  border: string
  inputBg: string
  accent: string
  violet: string
  orange: string
  shadow: string
  isDark: boolean
}

export type ThemeKey = 'classic' | 'accent' | 'dark'

/** Two competing UX scenarios. `A` = QuickPick first, `B` = amount first. */
export type Variant = 'A' | 'B'

/** Bank record shown in the results list and bank detail screen. */
export type Bank = {
  name: string
  /** Single-letter logo */
  l: string
  /** Logo accent color */
  lc: string
  /** Interest rate as a string with % */
  rate: string
  /** Decision speed, human-readable */
  speed: string
  /** No income certificate required */
  noDocs: boolean
}

/** Catalog of financial products available in the prototype. */
export type ProductKey =
  | 'credit-cash'
  | 'mortgage'
  | 'auto'
  | 'micro'
  | 'depo-sum'
  | 'depo-usd'
  | 'depo-save'
  | 'depo-premium'

export type Product = {
  name: string
  icon: string
  kind: 'credit' | 'depo'
}

/** Flow context — accumulated as the user moves through screens. */
export type FlowContext = {
  tab?: 'borrow' | 'save'
  type?: ProductKey
  amt?: number
  term?: number
  repay?: 'annuity' | 'diff'
  curr?: 'sum' | 'usd'
  cap?: boolean
  autoT?: 'uzauto' | 'foreign' | 'leasing' | null
  problems?: string[]
  bank?: Bank
}

export type RouteState = 'entry' | 'quickpick' | 'params' | 'loader' | 'results' | 'detail' | 'success'

export type Route = {
  s: RouteState
  ctx: FlowContext
}

/** Single survey question. */
export type SurveyOption = {
  ic: string
  c: string
  label: string
  val: string
}

export type SurveyAmountOption = {
  label: string
  val: number
}

export type SurveyQuestion =
  | { q: string; hint?: string; type: 'single' | 'multi'; opts: SurveyOption[] }
  | { q: string; hint?: string; type: 'amount'; opts: SurveyAmountOption[] }
