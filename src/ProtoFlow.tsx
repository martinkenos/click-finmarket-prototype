import type { Theme, Variant, Route, FlowContext } from './types'
import { EntryA } from './components/screens/EntryA'
import { EntryB } from './components/screens/EntryB'
import { QuickPick } from './components/screens/QuickPick'
import { Params } from './components/screens/Params'
import { Loader } from './components/screens/Loader'
import { Results } from './components/screens/Results'
import { Detail, DetailActions } from './components/screens/Detail'
import { Success } from './components/screens/Success'
import { BottomSheet } from './components/ui/BottomSheet'

type Props = {
  d: Theme
  variant: Variant
  route: Route
  setRoute: (r: Route) => void
}

/**
 * Coordinates navigation between screens for the two variants:
 *   Variant A: entry (EntryB) → quickpick OR params → loader → results → detail → success
 *   Variant B: entry (EntryA) → params → loader → results → detail → success
 *
 * The "detail" screen is special: it renders Results in the background and
 * overlays a BottomSheet with the bank detail content.
 */
export function ProtoFlow({ d, variant, route, setRoute }: Props) {
  const go = (s: Route['s'], addCtx?: Partial<FlowContext>) =>
    setRoute({ s, ctx: { ...route.ctx, ...(addCtx || {}) } })
  const back = (toS: Route['s']) => setRoute({ s: toS, ctx: route.ctx })
  const reset = () => setRoute({ s: 'entry', ctx: {} })

  if (route.s === 'detail') {
    const resultsBack: Route['s'] = variant === 'B' ? 'params' : route.ctx.problems ? 'quickpick' : 'params'
    return (
      <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
        <Results d={d} ctx={route.ctx} onBack={() => back(resultsBack)} onBank={() => {}} />
        <BottomSheet
          d={d}
          onClose={() => back('results')}
          footer={<DetailActions d={d} onSubmit={() => go('success')} />}
        >
          <Detail d={d} ctx={route.ctx} />
        </BottomSheet>
      </div>
    )
  }

  let screen: React.ReactNode = null

  if (variant === 'A') {
    // QuickPick-first
    if (route.s === 'entry')
      screen = (
        <EntryB
          d={d}
          onQuickPick={() => go('quickpick')}
          onPickType={t => go('params', { type: t, amt: 5_000_000 })}
        />
      )
    else if (route.s === 'quickpick')
      screen = <QuickPick d={d} onBack={() => back('entry')} onComplete={c => go('loader', c)} />
    else if (route.s === 'params')
      screen = <Params d={d} ctx={route.ctx} onBack={() => back('entry')} onContinue={c => go('loader', c)} />
    else if (route.s === 'loader') screen = <Loader d={d} onDone={() => back('results')} />
    else if (route.s === 'results')
      screen = (
        <Results
          d={d}
          ctx={route.ctx}
          onBack={() => back(route.ctx.problems ? 'quickpick' : 'params')}
          onBank={b => go('detail', { bank: b })}
        />
      )
    else if (route.s === 'success') screen = <Success d={d} ctx={route.ctx} onDone={reset} />
  } else {
    // Amount-first
    if (route.s === 'entry') screen = <EntryA d={d} onContinue={c => go('params', c)} />
    else if (route.s === 'params')
      screen = <Params d={d} ctx={route.ctx} onBack={() => back('entry')} onContinue={c => go('loader', c)} />
    else if (route.s === 'loader') screen = <Loader d={d} onDone={() => back('results')} />
    else if (route.s === 'results')
      screen = (
        <Results d={d} ctx={route.ctx} onBack={() => back('params')} onBank={b => go('detail', { bank: b })} />
      )
    else if (route.s === 'success') screen = <Success d={d} ctx={route.ctx} onDone={reset} />
  }

  return (
    <div key={route.s} style={{ animation: 'fadeUp .28s ease-out both', minHeight: '100%' }}>
      {screen}
    </div>
  )
}
