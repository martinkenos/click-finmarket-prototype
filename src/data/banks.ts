import type { Bank } from '../types'

/** Five banks that appear in the results list of this prototype. */
export const BANKS: Bank[] = [
  { name: 'UzumBank',     l: 'U', lc: '#7A5AF8', rate: '18%', speed: '1 час',  noDocs: true  },
  { name: 'Kapital Bank', l: 'K', lc: '#2F6FED', rate: '22%', speed: '1 день', noDocs: true  },
  { name: 'Ipoteka Bank', l: 'I', lc: '#0077FF', rate: '24%', speed: '3 дня',  noDocs: false },
  { name: 'Hamkorbank',   l: 'H', lc: '#FF8A3D', rate: '26%', speed: '2 дня',  noDocs: true  },
  { name: 'Agrobank',     l: 'A', lc: '#E5484D', rate: '28%', speed: '5 дней', noDocs: false },
]
