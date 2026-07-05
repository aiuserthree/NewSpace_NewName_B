**NavBar** — the slim sticky top navigation: brand wordmark left, centre links, sign-in ghost + orange CTA right, on a cream bar with a hairline underline.

```jsx
<NavBar
  brand="harvest"
  links={[{ label: "Features", hasMenu: true }, { label: "Why Harvest", hasMenu: true }, { label: "Resources", hasMenu: true }]}
  signInLabel="Sign in"
  ctaLabel="Try Harvest free"
/>
```

- `brand` is a plain type wordmark by default (no logo asset ships) — pass a node for a real mark. Background is cream, never white.
