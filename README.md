# Click Finmarket — интерактивный прототип

Прототип сервиса подбора финансовых продуктов (кредиты, депозиты). Сравнивает два UX-сценария — A (Quick Pick) и B (сумма-первым) — на едином движке с тремя визуальными темами.

**Live demo:** https://martinkenos.github.io/click-finmarket-prototype/

## Stack

- **Vite 8** — dev server, сборщик
- **React 19** + **TypeScript 6** — компоненты, типы
- **Tailwind CSS 3** — для utility-классов (сейчас стили inline через theme prop, см. ниже)
- **GitHub Pages** + **GitHub Actions** — автоматический деплой при push в `main`

## Запуск локально

```bash
npm install
npm run dev
```

Открой `http://localhost:5173` — увидишь прототип с тремя темами и двумя вариантами.

## Сборка для деплоя

```bash
npm run build
```

Готовый статический сайт окажется в `dist/`. Этот же шаг автоматически выполняется в CI при push в `main` (см. `.github/workflows/deploy.yml`).

## Структура

```
src/
├── App.tsx                          корневой компонент (state: theme, variant, route)
├── ProtoFlow.tsx                    оркестратор экранов и переходов
├── main.tsx                         entry — подключает Inter и render корня
├── index.css                        глобальные стили + keyframes анимаций
├── __dev__/
│   └── FloatingControls.tsx         плавающее меню (тема + вариант, для презентации)
├── types/index.ts                   все TypeScript типы прототипа
├── data/
│   ├── themes.ts                    3 темы (classic, accent, dark)
│   ├── banks.ts                     каталог банков
│   ├── products.ts                  каталог продуктов
│   └── survey.ts                    3 вопроса Quick Pick
├── icons/phosphor.ts                15 SVG-иконок (Phosphor Fill, MIT)
├── lib/
│   └── format.ts                    форматирование сумм, аннуитет
└── components/
    ├── ui/                          переиспользуемые примитивы
    │   ├── Icon.tsx
    │   ├── Screen.tsx
    │   ├── Card.tsx
    │   ├── Button.tsx
    │   ├── Tag.tsx
    │   ├── BottomSheet.tsx
    │   ├── BankLogo.tsx
    │   ├── PageBack.tsx
    │   └── IosFrame.tsx             iPhone-frame для будущего desktop-режима
    └── screens/                     один файл на экран
        ├── EntryA.tsx               amount-first (Variant B)
        ├── EntryB.tsx               quickpick-first (Variant A)
        ├── QuickPick.tsx            3-step survey
        ├── Params.tsx               параметры (с авто-подэкраном)
        ├── Loader.tsx               2.4s анимированный лоадер
        ├── Results.tsx              топ-5 банков, сортировка
        ├── Detail.tsx               BottomSheet с деталями + DetailActions
        └── Success.tsx              финальный экран с номером заявки
```

## Архитектурные решения

### Темы — runtime объекты, передаются как prop `d`

Тема — это `Theme` объект (см. `src/types/index.ts`), который компоненты принимают как prop `d`. Стили цветов применяются inline. Альтернатива (CSS variables + Tailwind theme) была отвергнута: для прототипа с runtime-переключаемыми темами объектный подход проще, меньше косвенности, и переключение работает мгновенно без перерасчёта CSS.

### Inline-стили vs Tailwind

В прототипе **намеренно много inline-стилей**: цвета, тени, радиусы — динамические от темы. Tailwind подключен и доступен для статичных utility-классов. При эволюции в продакшен — стоит вынести дизайн-токены в CSS variables и переписать на Tailwind.

### Маршрутизация

Минимальная — собственный `route` state в `App.tsx` (7 значений: entry / quickpick / params / loader / results / detail / success). React Router не подключен сознательно: для линейного flow прототипа лишний слой.

### Path aliases

Все импорты используют алиас `@/` (например, `@/components/ui/Button`). Настроен в `tsconfig.app.json` и `vite.config.ts`.

## Деплой

При push в `main` GitHub Actions:
1. Устанавливает зависимости (`npm ci`)
2. Собирает проект (`npm run build`)
3. Публикует `dist/` на GitHub Pages

URL — `https://martinkenos.github.io/click-finmarket-prototype/`. Base path задан в `vite.config.ts` (`base: '/click-finmarket-prototype/'`).

## Лицензия

Phosphor Icons — MIT (https://phosphoricons.com/). Остальной код — внутренний прототип Click.
