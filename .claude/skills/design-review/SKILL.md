---
name: design-review
description: Systematic UX/UI and accessibility review of the running site or a specific component. Use when asked to review the design, critique the UI, audit visual quality, check accessibility/contrast, or assess spacing/typography/motion. Triggers on "design review", "review the UI", "critique this screen", "a11y audit", "is this accessible".
---

# Design Review

A structured, opinionated UX/UI + accessibility pass — not vague "looks nice" feedback. Produce concrete, prioritized, actionable findings tied to specific elements and CSS values.

## How to run

1. **Start the preview** (`preview_start`) and confirm what you're reviewing — whole page or a specific section/component.
2. **Capture evidence with the right tool** — do NOT judge fidelity from screenshots alone:
   - `preview_inspect` for exact computed values (color, font-size, line-height, padding, margin, gap, border-radius).
   - `preview_screenshot` for layout/composition and overall feel.
   - `preview_resize` at `mobile` (375), `tablet` (768), and desktop — check every finding at all three.
   - `preview_resize` with `colorScheme` to verify both light and dark themes.
3. **Read the dev console** (`preview_console_logs`) for `@axe-core/react` violations — this project logs WCAG issues automatically in dev.
4. Walk every section below. Score each **Pass / Minor / Major**.
5. Output the report in the format at the bottom.

## Review dimensions

### 1. Typographic system
- Is there a consistent type scale, or arbitrary one-off sizes? Flag values that don't fit a ratio.
- Line-height: body text 1.5–1.8, headings 1.05–1.25. Flag cramped or loose blocks.
- Measure (line length): body copy 45–75ch. Flag overly wide paragraphs.
- Font-weight contrast between heading and body should be deliberate, not muddy.
- Letter-spacing: tighten large display text, loosen small caps/labels.

### 2. Spacing & layout
- Spacing should follow a system (4/8px base). Flag magic numbers.
- Consistent rhythm between sections; related elements grouped tighter than unrelated (proximity).
- Alignment to a grid; flag elements that drift.
- Adequate touch targets on mobile (min 44×44px).

### 3. Color & contrast (accessibility)
- Body text vs background: **WCAG AA ≥ 4.5:1**; large text (≥24px or ≥18.66px bold) **≥ 3:1**.
- Muted/secondary text is the usual failure — check `--muted` / `--muted2` against their backgrounds in BOTH themes.
- UI affordances (borders, focus rings, icons) **≥ 3:1** against adjacent colors.
- Don't rely on color alone to convey state — pair with icon/text/shape.
- Compute ratios explicitly; cite the numbers.

### 4. Interaction & state
- Every interactive element has visible hover, focus-visible, and active states.
- Focus rings must be visible and ≥3:1 — never `outline:none` without a replacement.
- Disabled/loading/error/empty states considered where relevant.
- Cursor affordances match behavior (pointer on clickable, grab on draggable).

### 5. Motion
- Entrances/transitions are consistent in duration (≈150–400ms) and easing.
- Motion has purpose (directs attention, communicates change) — not decoration that distracts.
- **`prefers-reduced-motion` is honored** — verify animations degrade gracefully. (This project's `Reveal` component already does; check new motion does too.)
- No layout shift / jank on entrance.

### 6. Responsive
- No horizontal scroll at 375px. No overlapping/clipped content.
- Tap targets, font sizes, and spacing adapt — not just shrunk desktop.
- Images/cards reflow sensibly; floating/absolute elements don't collide.

### 7. Hierarchy & content
- Clear primary action per view; one focal point per section.
- Visual weight matches importance.
- Scannable: headings, whitespace, chunking.

## Project-specific notes
- Brand accent lives in `--accent` (and per-component vars like the hero windows' `--window-*`). Check accent contrast on both `--bg` values.
- Aesthetic is intentionally retro/pixel (Silkscreen logo font, hard `box-shadow` offsets, `image-rendering:pixelated`). Respect that language — don't recommend generic "modern SaaS" smoothing. Sharpen the existing style rather than replacing it.
- Three font families: Clash Display (`--font-head`), Red Hat Mono (`--font-body`), Silkscreen (`--font-logo`).

## Output format

```
## Design Review — <scope>

### Summary
<2–3 sentences: overall verdict + biggest themes>

### Major (fix before ship)
- [<dimension>] <finding> — <element/selector>, measured <value>. → <specific fix>

### Minor (polish)
- [<dimension>] <finding> — <where>. → <fix>

### Accessibility
- Contrast: <pairs checked, ratios, pass/fail>
- axe-core console: <violations or "clean">
- Keyboard/focus: <findings>

### What's working
- <genuinely good things — be specific, not flattery>
```

Always cite measured values and selectors. Prioritize ruthlessly: 3–6 Major findings beat 30 nitpicks. If something is genuinely good, say why — don't pad.
