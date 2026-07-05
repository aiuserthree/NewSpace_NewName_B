**TextLink** — the orange text-weight link used under feature cards and inline; use for "learn more"-style secondary navigation, not primary actions.

```jsx
<TextLink href="#features">더 알아보기</TextLink>
<TextLink withArrow={false}>자세히 보기</TextLink>
```

- Orange (`--text-link`), weight 500, no background/border/padding. Underline + slight arrow nudge on hover.
- `withArrow` toggles the trailing → (default on). `size` `sm` | `md`.
