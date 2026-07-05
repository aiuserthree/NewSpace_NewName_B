**Icon** — a single-color outline glyph (Lucide) whose stroke follows `currentColor`; use for inline UI icons and 48px feature icons. Lucide substitutes for Harvest's proprietary custom icons.

```jsx
<Icon name="clock" size={48} />
<span style={{ color: "var(--accent)", display: "inline-flex", gap: 6 }}>
  더 알아보기 <Icon name="arrow-right" size={18} />
</span>
```

- `name` — one of: arrow-left/right, chevron-down/right, check, check-check, circle-check, clock, chart-pie, receipt, calendar(-check), user, users, phone, map-pin, church, vote, heart, sparkles, info, lock, plus, pencil, square-pen, x.
- `size` 48 for feature-card icons; 16–24 inline. `color` defaults to currentColor — set `color:#fff` (or wrap in white text) when placed on the orange fill.
- Add glyphs by pasting the SVG inner markup into the `ICONS` map in `Icon.jsx`.
