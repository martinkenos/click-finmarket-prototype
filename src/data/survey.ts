import type { SurveyQuestion } from '../types'

/** Three-question QuickPick survey shown in Variant A. */
export const SURVEY: SurveyQuestion[] = [
  {
    q: 'Что вас интересует?',
    type: 'single',
    opts: [
      { ic: 'creditCard', c: '#2F6FED', label: 'Взять в долг',          val: 'borrow' },
      { ic: 'trendUp',    c: '#7A5AF8', label: 'Сохранить / вложить',   val: 'save'   },
      { ic: 'question',   c: '#8A8F96', label: 'Ещё не определился',    val: 'any'    },
    ],
  },
  {
    q: 'Что важнее всего?',
    hint: 'До 2 вариантов',
    type: 'multi',
    opts: [
      { ic: 'lightning', c: '#FF8A3D', label: 'Хочу быстро',        val: 'fast'   },
      { ic: 'coins',     c: '#4CAF80', label: 'Хочу дёшево',        val: 'cheap'  },
      { ic: 'clipboard', c: '#2F6FED', label: 'Без справок',        val: 'nodocs' },
      { ic: 'target',    c: '#E05C5C', label: 'Под конкретную цель', val: 'goal'   },
      { ic: 'star',      c: '#F5C518', label: 'Нужна крупная сумма', val: 'large'  },
    ],
  },
  {
    q: 'Какая сумма?',
    hint: 'Примерно',
    type: 'amount',
    opts: [
      { label: '1 млн',   val: 1   },
      { label: '5 млн',   val: 5   },
      { label: '20 млн',  val: 20  },
      { label: '100 млн', val: 100 },
    ],
  },
]
