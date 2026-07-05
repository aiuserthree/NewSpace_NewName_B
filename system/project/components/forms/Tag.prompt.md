**Tag** — a pill label (999px radius) for "필수 / 선택" markers, status chips and categories.

```jsx
<Tag tone="accent">필수</Tag>
<Tag tone="neutral">선택</Tag>
<Tag tone="wash" icon="calendar">2차 투표 예정</Tag>
```

- `tone`: `neutral` (default, warm grey) · `accent` (orange-tinted, for 필수) · `solid` (filled orange) · `wash` (marigold) · `outline`.
- `size` `sm` | `md`; optional leading `icon`. Keep tones within the warm palette — only accent/solid may carry orange.
