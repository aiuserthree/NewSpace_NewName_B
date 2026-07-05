**HeroWash** — the decorative flowing warm gradient (orange / marigold / peach) behind hero content; suggests warmth and motion without competing with text.

```jsx
<section style={{ position: "relative", overflow: "hidden" }}>
  <HeroWash intensity={0.9} />
  <div style={{ position: "relative", zIndex: 1 }}>{/* hero content */}</div>
</section>
```

- Absolutely positioned (fills its relative parent). Keep content in a `zIndex: 1` layer above it. `intensity` (0–1) dials the opacity. Never place text directly on the densest part.
