**FeatureSplit** — an alternating two-column block (text on one side, media on the other) for detailed feature breakdowns. Flip `reverse` each section for rhythm.

```jsx
<FeatureSplit
  eyebrow="본당"
  title="새로 짓는 본당의 이름"
  body="조감도를 보며 어울리는 이름을 상상해 보세요."
  media={<PreviewCard><image-slot id="bondang" /></PreviewCard>}
/>
```

- Provide `media` (a `PreviewCard`, `image-slot`, illustration) or pass it as children. `ctaLabel`/`onCta` render an orange Button.
- The two columns are equal width; stack them manually below ~840px.
