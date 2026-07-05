**Input** — labelled text field for forms (name, phone, name-idea entry); white fill, bone border, warm orange focus ring.

```jsx
<Input label="이름" placeholder="홍길동" required />
<Input label="연락처" leftIcon="phone" inputMode="numeric" placeholder="010-0000-0000" required />
<Input label="연락처" error="이미 신청하신 번호입니다." value={phone} />
```

- `label`, `helper`, `error`, `required`, `leftIcon`, `disabled`. Controlled via `value`/`onChange`.
- Focus and error both use orange (single-accent discipline) — error additionally shows an info icon + message, so the two read distinctly.
- 14×20px padding, 16px radius. Placeholder is driftwood grey.
