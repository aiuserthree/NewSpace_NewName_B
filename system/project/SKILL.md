---
name: harvest-design
description: Use this skill to generate well-branded interfaces and assets for the Harvest visual language (warm cream canvas + one vivid orange, extracted from getharvest.com), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping — including a Korean mobile web flow (공간 이름 공모전).
user-invocable: true
---

Read the `readme.md` file within this skill first — it is the full design guide and manifest — then explore the other available files.

- **Foundations** live in `tokens/` (colors, typography, spacing, elevation, fonts) and are surfaced as specimen cards in `guidelines/`. The single global entry point is `styles.css` (an `@import` list); link it and you get every token + webfont.
- **Components** live in `components/<group>/` as `Name.jsx` + `Name.d.ts` + `Name.prompt.md`. They bundle to `window.HarvestDesignSystem_eb006c`. Read each `.prompt.md` for the one-line "what & when" plus a usage example.
- **UI kit** lives in `ui_kits/space-name-contest/` — a full mobile-web recreation composing the components. Read its `README.md`.
- **Assets** live in `assets/` (`icons/` = curated Lucide SVGs; `image-slot.js`).

Core rules to honor (see readme for the full set): one orange (`#fa5d00`) for actions/links/brand only; cream `#fff8f1` page background (never white); warm near-black text (never `#000`); 16px/20px radii + 999px pills; warm-tinted shadows only; +0.015em tracking on sans; serif reserved for the single hero moment; no second accent, no emoji.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and create static HTML files for the user to view. If working on production code, copy assets and apply the rules here to become an expert in designing with this brand.

If the user invokes this skill without other guidance, ask what they want to build or design, ask a few focused questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Note: the display fonts (MuotoWeb, Monarch) are proprietary and substituted with Pretendard + Newsreader/Gowun Batang loaded from CDN. If the user has the licensed files, swap them into `tokens/fonts.css`.
