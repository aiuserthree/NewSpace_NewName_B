**PreviewCard** — a white, softly-shadowed frame that presents a product screenshot as floating proof.

```jsx
<PreviewCard tilt={-2}><img src="/assets/dashboard.png" style={{ display: "block", width: "100%" }} /></PreviewCard>
<PreviewCard><image-slot id="hero-shot" style={{ width: 520, height: 320 }} /></PreviewCard>
```

- 16px radius, warm `--shadow-lg`. `tilt` rotates it for the hero "floating cards" look; `padded` adds a 16px inner frame.
