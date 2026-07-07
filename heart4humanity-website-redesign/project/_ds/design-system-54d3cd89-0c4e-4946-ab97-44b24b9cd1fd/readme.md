# Poppins Design System

A corporate, professional, general-purpose starter kit. Geometric **Poppins**
typography, an **emerald** brand accent over neutral **slate**, a 4px spacing
rhythm, a 10px base corner radius, and full **light + dark** theming.

## Foundations
- **Type** — Poppins (400 / 500 / 600 / 700). Scale from `--text-xs` (12px) to
  `--text-4xl` (48px). See the *Typography* card.
- **Color** — emerald brand scale + slate neutrals + semantic success/warning/
  danger/info. Role tokens (`--color-bg`, `--color-surface`, `--color-text`,
  `--color-primary`, …) flip automatically under `[data-theme="dark"]`.
- **Spacing / radius / elevation** — `--space-*`, `--radius-*`, `--shadow-*`.

## Theming
Tokens live in `styles.css`. Light is the default; set `data-theme="dark"` on
`<html>` (or any container) to switch. Every component reads role tokens, so
they adapt with no extra work.

## Components
`Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Table`, `Avatar` /
`AvatarGroup`. Each ships a React component (`.jsx`), typed props (`.d.ts`),
and a live `@dsCard` gallery. Components emit semantic `ds-*` classNames that
`styles.css` styles — import `styles.css` once globally in any consuming app.

## Usage
1. Link `styles.css` (it `@import`s Poppins).
2. Render components from the compiled bundle namespace
   `window.DesignSystem_54d3cd`.
