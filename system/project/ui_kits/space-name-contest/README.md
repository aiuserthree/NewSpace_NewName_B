# UI Kit — 공간 이름 공모전 (Space Name Contest)

A mobile-web recreation of the church space-naming contest described in the planning draft (`설계서 초안.md`). The link is distributed through a KakaoTalk channel, so every screen is a single mobile column on the cream canvas.

## Run
Open `index.html`. It composes the Harvest design-system components (`window.HarvestDesignSystem_eb006c`) via `_ds_bundle.js` and drives the full click-through with local state — no backend.

## Flow (from the plan, §3 IA)
`intro → info → submit → complete`, with a duplicate branch `info → lookup`.

| Screen | File | Notes |
|--------|------|-------|
| Intro / landing | `IntroScreen.jsx` | Hero (serif headline), 참여 방법 3-steps, the three spaces, 참여 시작하기 |
| STEP 1 · 신청자 정보 | `ApplicantInfoScreen.jsx` | 이름 + 연락처; phone is the dedupe key |
| STEP 2 · 이름 제출 | `NameSubmissionScreen.jsx` | Scroll of three `SpaceCard`s (필수 1 + 선택 1 each) |
| 완료 | `CompleteScreen.jsx` | Confirmation + 2차 현장 투표 안내 |
| 조회 | `LookupScreen.jsx` | Read-only submission (from duplicate notice or completion) |

Shared: `Shell.jsx` (mobile frame + `window.CONTEST_SPACES`), `SpaceCard.jsx` (image slot + 필수/선택 name pair).

## Try the duplicate branch
On STEP 1 enter phone **010-0000-0000** and tap 다음 → "이미 신청하신 분입니다" → 내용 확인하기 opens a read-only lookup of a demo record. Any other number proceeds to STEP 2.

## Images
The three space photos use `<image-slot>` placeholders (본당 조감도 / 소예배실 / 새가족부실) — drag a real image onto each. Persistence is best-effort from this subfolder; for saved drops, host the page at the project root.

## Components used
Button, Input, Tag, Notice, StepIndicator, Icon, HeroWash. Primitives live in `/components`; this kit only composes them.
