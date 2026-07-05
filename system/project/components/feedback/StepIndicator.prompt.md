**StepIndicator** — compact numbered progress for the two-step flow (정보 입력 → 이름 제출).

```jsx
<StepIndicator steps={["신청자 정보", "이름 제출"]} current={0} />
```

- `current` (0-based) marks the active step (outlined orange); earlier steps fill orange with a check; later steps are muted.
- Keep labels short; the connector line fills orange as steps complete.
