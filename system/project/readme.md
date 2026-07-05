# Harvest Design System

> Golden-hour workbench — a warm cream canvas, white floating cards, and one vivid orange flame.

This design system packages the **Harvest** visual language (extracted from [getharvest.com](https://www.getharvest.com)) as reusable tokens, components, and specimen cards, and demonstrates it on a real product: the **공간 이름 공모전 (Space Name Contest)** — a Korean church-community mobile web flow for collecting name ideas for three new/renovated spaces.

The system's discipline is a single chromatic decision: **one orange (`#fa5d00`)** carries every action, link, and brand moment; everything else is a warm-neutral, achromatic palette on a cream page. The warmth *is* the brand.

---

## Sources

| Source | What it is |
|--------|-----------|
| `uploads/DESIGN.md` | Harvest style reference — colors, type, components, do/don'ts, layout patterns |
| `uploads/tokens.json` | W3C design-token export from getharvest.com (`extractedAt 2026-06-03`) |
| `uploads/theme.css`, `uploads/variables.css` | The same tokens as Tailwind `@theme` / CSS custom properties |
| `uploads/설계서 초안.md` | Korean planning draft for the 공간 이름 공모전 web page (IA, policy, user flow, copy guide) → drives the UI kit |

No logo or brand mark was provided. Per policy we do **not** reconstruct Harvest's real wordmark — brand names render in plain type wherever a mark would sit (see `NavBar`, `Shell`).

---

## Fonts — substitution (action needed)

Harvest's real faces are proprietary and were not supplied, so both are substituted from CDN. **If you have the licensed files, send them and we'll swap them in.**

| Role | Harvest (proprietary) | Substitute (shipped) |
|------|----------------------|----------------------|
| UI + body sans | **MuotoWeb** | **Pretendard** — warm geometric sans with full Korean + Latin (ideal for the Korean product) |
| Hero display serif | **Monarch** | **Newsreader** (Latin) + **Gowun Batang** (Korean serif fallback) |

Tokens keep the original names (`--font-muotoweb`, `--font-monarch`) pointed at the substitute stacks, plus aliases `--font-sans` / `--font-serif-display`. **Pretendard is self-hosted** (`assets/fonts/PretendardVariable.woff2`, one variable file, OFL); the serifs load from Google Fonts CDN.

---

## CONTENT FUNDAMENTALS

The system serves two registers. **Know which you are writing.**

**Product copy (Korean — the 공모전 flow).** This is the live voice.
- **Tone:** warm, inviting, gently formal. It asks for participation, never commands. "우리 공간의 이름을 **함께** 지어주세요."
- **Endings:** polite **-요 / -세요** for invitations and guidance ("제안해 주세요", "입력해 주세요", "확인하실 수 있어요"); crisp **-습니다 / -됩니다** for system statements and confirmations ("이미 신청하신 분입니다", "제출이 완료되었습니다").
- **Person:** address the participant with respect (…님), speak as "우리" (we, the community) — collective, not corporate.
- **Casing / punctuation:** Korean has no casing; keep sentences short, one idea each. Middot `·` separates peers (본당 · 소예배실 · 새가족부실). Numbered/labelled spaces use ① ② ③.
- **Buttons:** verb-first and brief — 참여 시작하기, 다음, 제출하기, 내용 확인하기, 처음으로.
- **Emoji:** none. Warmth comes from tone and the cream/orange palette, not emoji or exclamation spam (a single "감사합니다!" is the ceiling).

**Brand/marketing copy (English — the Harvest surface).** Confident, plain, benefit-led: "Try Harvest free", "Time tracking, warmed up". Sentence case, no jargon, one CTA per block.

**Both registers:** concrete over clever, reassuring over urgent, one action per screen.

---

## VISUAL FOUNDATIONS

**Color.** One orange (`#fa5d00`) for actions/links/active/brand only — never body text or large fills. Everything else is a warm-neutral ramp (ink `#1d1e1c` → warm-stone → driftwood → smoke). Text is warm near-black, **never** pure `#000`. Two atmospheric-only hues: marigold glow `#fee3b5` (washes) and parchment shadow `#e3d6c5` (the warm hue inside shadows). No second accent, ever. No status green/red — validation uses orange + an info icon + message (single-accent discipline).

**Surfaces & backgrounds.** Three levels: cream canvas `#fff8f1` (page — the signature; **never** white), paper white `#ffffff` (cards), orange `#fa5d00` (brand). Backgrounds are flat cream — no dark/light banding. The one decorative background is the **HeroWash**: soft orange/marigold/peach radial blobs, low opacity, `blur(28px)`, behind hero content only. No repeating patterns, no full-page gradients, no textures.

**Typography.** Sans (Pretendard) for everything up to 50px; the serif (Newsreader/Gowun Batang) is reserved for the one hero/display moment (≈34–72px, weight 400). All sans text carries **+0.015em** tracking — the tracked-wide feel that softens the geometric sans. Weights 400/500/600/700. Scale: caption 13 · body 16 · subheading 18 · heading-sm 20 · heading 24 · heading-lg 28 · title 34 · display 48 · display-lg 72.

**Spacing & layout.** Comfortable density. Centered ≤1200px container (desktop) or a single ≤430px mobile column (the contest). Section gap 64–80px, card padding 32–40px, element gap 16–24px.

**Radii.** Two signatures — **16px** (buttons, inputs, images) and **20px** (cards) — plus **999px** pills. Never sharp 0–4px corners.

**Elevation / shadows.** Warm-tinted, never cold gray/blue. `sm` = `rgba(0,0,0,.2) 0 1px 4px` (button lift). `lg` = `rgba(250,166,0,.25) 6px 4px 24px` (the marigold card glow). **Cards get depth from shadow, not borders** — white card, 20px radius, warm glow, no outline.

**Borders.** 1px only. Bone `#c0bbb6` on inputs at rest (→ orange on focus), mist-gray `#d9d9d9` hairline dividers. We deliberately **avoid** the colored-left-border callout trope — notices are whole soft warm surfaces.

**Hover / press / focus.** Calm, quick. Hover: primary darkens ~10%, secondary border → ink, ghost gets a faint orange wash, links underline + nudge the → arrow 2px. Press: darken ~18% (color shift, no shrink/bounce). Focus: orange border + a soft `0 0 0 3px rgba(250,93,0,.15)` ring.

**Animation.** Understated — `~140ms ease` on background/border/color and small `translateX` arrow nudges. No bounce, spring, or infinite decorative loops. Honor `prefers-reduced-motion`.

**Transparency / blur.** Used sparingly: the HeroWash blur, translucent focus ring, and sticky-CTA fade (`linear-gradient` to cream). Not a glassmorphism system.

**Imagery.** Real photos front and center (the contest plan: "이미지를 전면 배치") — 조감도 and space photographs framed in white 16px-radius `PreviewCard`s / `image-slot`s with warm shadows. On the Harvest surface, product screenshots are the hero. Warm, natural, real — no stock lifestyle, no abstract 3D, no cool tones. Partner logos, when present, go grayscale so the orange stays uncontested.

---

## ICONOGRAPHY

Harvest's real icons are **proprietary custom geometric marks** (stopwatch, pie chart, receipt — dark `#1d1e1c`, ~48px, centered above feature headings, no color). None shipped with the sources.

- **Substitute (flagged): [Lucide](https://lucide.dev)** — the closest open match for outline, ~2px-stroke geometric icons. A curated 26-glyph set is **inlined** into the `Icon` component (`components/media/Icon.jsx`) so stroke follows `currentColor` and no runtime CDN fetch is needed. The raw SVGs also live in `assets/icons/`.
- **Usage:** feature/hero icons at 44–48px in ink; inline UI icons at 16–24px inheriting text color (orange inside links, white on the orange fill). Add glyphs by pasting SVG inner markup into the `ICONS` map.
- **Emoji / unicode as icons:** not used. The `①②③` space markers are the only decorative unicode.

---

## Components

All primitives live under `components/<group>/` as `Name.jsx` + `Name.d.ts` + `Name.prompt.md`, bundled to `window.HarvestDesignSystem_eb006c`. UI kits compose these — never re-implement them.

- **actions/** — **Button** (primary orange CTA · secondary · ghost; sizes; icons; disabled), **TextLink** (orange "더 알아보기 →" link).
- **forms/** — **Input** (labelled field, leading icon, warm focus ring, error/helper), **Tag** (999px pill — 필수/선택 markers, status chips).
- **content/** — **SectionHeading** (eyebrow + title + subtitle), **FeatureCard** (48px icon + heading + body + link, warm glow), **FeatureSplit** (alternating two-column text + media).
- **brand/** — **NavBar** (slim sticky cream top bar), **LogoCircle** (round integration badge), **TrustLogoRow** (grayscale partner strip), **PreviewCard** (white screenshot frame), **HeroWash** (decorative warm gradient).
- **feedback/** — **Notice** (inline callout / alert), **StepIndicator** (two-step progress).
- **media/** — **Icon** (curated Lucide set, `currentColor`).

### Intentional additions
Beyond the families named in `DESIGN.md`, three primitives were added to serve the contest flow — each justified:
- **Tag** — the source defines a `--radius-tags: 999px` pill and needs 필수/선택 markers.
- **Notice** — required for the "이미 신청하신 분입니다" duplicate message and completion confirmation.
- **StepIndicator** — required for the plan's explicit 2-step flow (정보 입력 → 이름 제출).
- **Icon** — a wrapper over the substituted glyph set (Harvest's own icons weren't provided).

---

## UI kits

- **`ui_kits/space-name-contest/`** — the 공간 이름 공모전 mobile web flow: `index.html` (interactive) + `IntroScreen`, `ApplicantInfoScreen`, `NameSubmissionScreen`, `CompleteScreen`, `LookupScreen`, plus `Shell` and `SpaceCard`. See its `README.md`. Try phone `010-0000-0000` for the duplicate → lookup branch.

---

## Design System tab (specimen cards)

Foundation cards live in `guidelines/` (groups **Colors · Type · Spacing · Brand**); component cards sit beside each component group (group **Components**); the UI kit index is grouped **공간 이름 공모전**. Every `@dsCard`-tagged `.html` links `styles.css` and renders in the Design System tab.

---

## Root manifest

| Path | What |
|------|------|
| `styles.css` | Global entry — `@import` list only (consumers link this) |
| `tokens/` | `fonts · colors · typography · spacing · elevation · base` CSS |
| `components/` | Reusable primitives (actions · forms · content · brand · feedback · media) |
| `ui_kits/space-name-contest/` | The 공모전 product recreation |
| `guidelines/` | Foundation specimen cards |
| `assets/` | Lucide `icons/`, self-hosted `fonts/`, `image-slot.js` |
| `SKILL.md` | Agent-Skill entry point (for download / Claude Code) |
| `readme.md` | This guide + manifest |

Tokens: 111 · Components: 15 · Namespace: `window.HarvestDesignSystem_eb006c`.
