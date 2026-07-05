**Notice** — an inline callout / alert. Use for the duplicate-submission message, completion confirmation, and general info.

```jsx
<Notice tone="accent" title="이미 신청하신 분입니다"
  action={<Button variant="secondary" size="sm">내용 확인하기</Button>}>
  같은 번호로 접수된 내역이 있어요.
</Notice>
<Notice tone="success" title="제출이 완료되었습니다">참여해 주셔서 감사합니다!</Notice>
```

- `tone`: `info` (neutral card) · `accent` (marigold wash, orange icon) · `success` (wash + check). No coloured left-border — the whole callout is a soft warm surface.
- `title`, `action`, `onClose` optional; the tone picks a default icon (override with `icon`).
