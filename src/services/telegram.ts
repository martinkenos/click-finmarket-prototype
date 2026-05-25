/**
 * Minimal typed wrapper around the Telegram WebApp API.
 * See https://core.telegram.org/bots/webapps for the full surface.
 *
 * The script `telegram-web-app.js` is auto-injected when the page is opened
 * inside Telegram; outside Telegram, `window.Telegram` is `undefined` and all
 * these helpers no-op silently.
 */

type TelegramWebApp = {
  ready: () => void
  expand: () => void
  setHeaderColor: (color: string) => void
  setBackgroundColor: (color: string) => void
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp }
  }
}

const wa = (): TelegramWebApp | undefined => window.Telegram?.WebApp

/** Tell Telegram the Mini App is ready (hides the Telegram loader). */
export function ready() {
  try { wa()?.ready() } catch { /* noop */ }
}

/** Expand the Mini App to full screen height. */
export function expand() {
  try { wa()?.expand() } catch { /* noop */ }
}

/** Set the Telegram header background color to match the app theme. */
export function setHeaderColor(color: string) {
  try { wa()?.setHeaderColor(color) } catch { /* noop */ }
}

/** Set the Telegram background color (visible between header and content). */
export function setBackgroundColor(color: string) {
  try { wa()?.setBackgroundColor(color) } catch { /* noop */ }
}

/** Apply all theme-related Telegram WebApp settings in one call. */
export function applyTheme(opts: { isDark: boolean; appBg: string }) {
  ready()
  expand()
  setHeaderColor(opts.isDark ? '#0E0F11' : '#FFFFFF')
  setBackgroundColor(opts.appBg)
}
