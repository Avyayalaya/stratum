# Compression Gate — When Short-Form Compresses, When Long-Form Earns Its Length

> **Purpose:** A testable rule for deciding whether a piece of Stratum content ships as a short-form post (≤ 600 words, LinkedIn) or warrants long-form (Substack essay, LinkedIn article, repo doc). The default is compression; long-form earns its length by passing this gate.

---

## The Default

**Short-form is the default.** A short post (≤ 600 words) that contains:

- One architectural decision OR one mechanism, stated directly
- One structural insight (the non-obvious "why" beneath the decision)
- One product / practice implication (what changes when you operate this way)

…is sufficient narrative compression for Stratum's body of work. Each post links back to its canonical spec entry on GitHub for readers who want depth.

This is not a length restriction. It's a confidence signal: the spec carries depth; the post carries the hook.

---

## The Gate (when long-form earns its length)

A piece warrants long-form **only if at least two** of the following triggers apply:

### Trigger 1 — Multi-Decision Argument

The argument requires connecting two or more architectural decisions in a single piece, AND the connection is non-obvious from reading each decision separately. Example: "Why mode classification matters for role weighting" — the connection between two architectural pieces is itself the insight.

A post that compresses one decision is short-form. A piece that traces a structural thread across multiple decisions is long-form.

### Trigger 2 — Counter-Evidence Synthesis

The piece engages with substantive counter-evidence — a published critique, a competing framework, or a refinement triggered by reader pushback — and the steelmanning + response cannot fit in 600 words without omission. Compression would force false brevity on a real disagreement.

A post that mentions a counter-argument is short-form. A piece that genuinely engages it is long-form.

### Trigger 3 — Case Study Narrative

The piece narrates a real team's Stratum engagement end-to-end (presenting problem → assessment → diagnosis → 90-day sprint → re-assessment delta). The arc requires sufficient narrative space to land the operational impact. Phase 1.3 case studies sit here.

A post that names the case is short-form. The case study itself is long-form.

### Trigger 4 — Stage Closure / Retrospective

The piece marks a stage transition (Stage 1 close, Phase 1.1 retrospective, framework v1.0 ship) and traces the substrate the next stage builds on. These are infrequent — at most one per stage transition — and they earn their length by integrating across the stage's full scope.

A post that announces a milestone is short-form. The retrospective is long-form.

---

## Examples

### Example A — Short-form (default)

**Topic:** Mode classification produces five modes (demonstrated, partial, avoidance, trait_claim, insufficient).

**Why short-form:** One architectural decision; structural insight is "two people with the same score of 2 require different interventions"; product implication is "score alone underdetermines coaching plan." All three fit in ~400 words. Links to `ledger/mode_classification.md` for depth.

**Trigger check:** Single decision (no Trigger 1). No active counter-evidence engagement (no Trigger 2). Not a case (no Trigger 3). Not a milestone (no Trigger 4). **Result: short-form.**

### Example B — Long-form (earns length)

**Topic:** A team Stratum engagement at [Company X]: presenting problem → diagnostic → 90-day sprint → 90-day re-assessment.

**Why long-form:** Trigger 3 (case study narrative) + Trigger 1 (the case touches mode classification + role weighting + gate-skill logic together; the connection is the substance). Two triggers met → long-form.

**Result:** ~2,500-word case study at `cases/company_x_2026.md`, with derivative compressed posts (3 short LinkedIn posts each compressing one phase: assessment finding, sprint design, re-assessment delta) all linking back to the long-form.

---

## Promotion Rule (during draft)

If a draft post starts at ≤ 600 words but the writer finds that hitting compression bar (decision + structural insight + product implication) requires omitting one of the three, the post should be promoted to long-form OR scope reduced to a tighter single point.

**Test:** can this post pass P16 (compression, not omission)? If yes → ship as short-form. If no, and at least two triggers apply → promote to long-form. If no and triggers don't apply → reduce scope.

Never compress by omission. A 350-word post that includes the structural insight and product implication is sharper than a 600-word post that pads around a single fact.

---

## When This Gate Doesn't Apply

- Repo documentation (READMEs, AGENTS.md, ledger entries) — these have their own conventions; not derivative narrative
- Internal Agent Prime artifacts (planning docs, design docs, Build Handoff Specs) — internal-only; not subject to public compression rules
- Conference talks, podcast appearances, video content — different format constraints; covered by separate guidance

---

*Created 2026-05-07 as Stratum Phase 1.0 deliverable D9 per [PLN-020](../STAGE1.md). Refines P16 (compression vs. omission) for the Stratum body-of-work surface specifically.*
