import type { Theme, ThemeKey } from '../types'

/**
 * Three design directions explored in this prototype.
 * Switched at runtime via the FloatingControls menu.
 */
export const THEMES: Record<ThemeKey, Theme> = {
  classic: {
    label: 'Классик',
    appBg: '#F4F5F7',
    cardBg: '#FFFFFF',
    screenBg: '#F4F5F7',
    primary: '#0077FF',
    text: '#0E0F11',
    textSec: '#5C6066',
    textTert: '#8A8F96',
    border: '#E8E9EC',
    inputBg: '#EBECEF',
    accent: '#2F6FED',
    violet: '#7A5AF8',
    orange: '#FF8A3D',
    shadow: '0 2px 8px rgba(0,0,0,0.07)',
    isDark: false,
  },
  accent: {
    label: 'Акцент',
    appBg: '#EEF3FF',
    cardBg: '#FFFFFF',
    screenBg: '#EEF3FF',
    primary: '#0077FF',
    text: '#0E0F11',
    textSec: '#4A5578',
    textTert: '#8A8F96',
    border: '#D8E3FF',
    inputBg: '#E4ECFF',
    accent: '#2F6FED',
    violet: '#7A5AF8',
    orange: '#FF8A3D',
    shadow: '0 4px 16px rgba(47,111,237,0.10)',
    isDark: false,
  },
  dark: {
    label: 'Тёмный',
    appBg: '#0E0F11',
    cardBg: '#1A1B1E',
    screenBg: '#0E0F11',
    primary: '#0077FF',
    text: '#FFFFFF',
    textSec: '#9AA0A8',
    textTert: '#6E737A',
    border: '#2A2B2F',
    inputBg: '#0A0B0D',
    accent: '#4D8AF0',
    violet: '#9B7BFF',
    orange: '#FF9F5A',
    shadow: '0 4px 20px rgba(0,0,0,0.35)',
    isDark: true,
  },
}
