**Button** — the primary interactive element; use `primary` for the one main CTA per screen, `secondary`/`ghost` for lower-emphasis actions.

```jsx
<Button variant="primary" size="lg" rightIcon="arrow-right">참여 시작하기</Button>
<Button variant="secondary">내용 확인하기</Button>
<Button variant="ghost">로그인</Button>
```

- `variant`: `primary` (orange fill, white text, 600), `secondary` (white fill, bone border, ink text), `ghost` (transparent, orange text, 500).
- `size`: `sm` | `md` | `lg`. `fullWidth` stretches to container. `leftIcon`/`rightIcon` take an `Icon` name.
- Hover darkens the orange ~10%; press ~18%. Radius is the signature 16px. Never introduce a second fill color — orange is the only chromatic action.
