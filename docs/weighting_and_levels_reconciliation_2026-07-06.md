# Weighting & Levels — Reconciliation Note (2026-07-06)

Part of the Phase 1.1 architecture audit. This note records a divergence between
the **spec** and the **code**, the empirical test used to resolve it, and the
single reconciled model both now share.

---

## 1. The divergence we found

The spec/ledger described an elaborate quantitative layer:

- Function weights in **four tiers** (3.0 / 2.0 / 1.5 / 1.0).
- A **15 × 6 level-modifier table** (90 hand-set cells).
- `W_final = W_function × M_level`, `Gap = (5 − S) × W_final`.
- A **hard-no gate**: `W_final ≥ 4.0 AND S ≤ 2`.

The actual code (`cli/roadmap.js`, `cli/report.js`) implemented something else:

- **Three** role profiles (PM, Engineer, Operations), mild weights **1.1–1.3**.
- `priority = rawScore / weight`. **No level dimension. No gate.**

A reader of the spec and a user of the tool were getting two different frameworks.
For a project whose README says the rigor lives in the open, that gap is the thing
to fix first.

---

## 2. The empirical test (Dawes 1979 check)

Before choosing which way to reconcile, we tested whether the weighting even
changes the guidance a person receives. `cli/weighting-test.js` (deterministic,
seeded, no LLM) compares the current role-weighted top-3 development gaps against
a **flat unit-weighted** model across 5,000 random score profiles per role, plus
four adversarial archetypes.

**Result:**

| Role | top-1 gap same | top-3 set identical | mean Jaccard |
|------|----------------|---------------------|--------------|
| Product Manager | 72.2% | 66.8% | 0.822 |
| Engineer | 78.0% | 84.6% | 0.922 |
| Operations | 59.4% | 72.3% | 0.856 |
| **Mean** | **69.9%** | **74.6%** | **0.867** |

Adversarial archetypes: 3 of 4 identical to unit weights; only the all-3s
"flat generalist" differs, where the weight simply breaks a tie.

**Reading:** the weighting does real work **only at the margins / ties**. When
scores actually spread, the low scores dominate and the weights change nothing.
This is Dawes (1979) — improper linear models (unit weights) match optimized
weights out of sample — reproduced on Stratum's own math.

**Conclusion:** the elaborate 4-tier × 90-cell apparatus is not earning its
complexity, but weights are not useless either (they reorder ~25% of top-3 sets at
the margin). The right model is **coarse weights + coarse level bands** — not the
90-cell table, and not pure unit weights.

---

## 3. The reconciled model (spec == code, as of v1.1)

Both the spec (`ledger/level_modifiers.md`, `ledger/combined_formula.md`) and the
code (`cli/roadmap.js`) now share one model:

**Function weight `W_function`** — coarse role importance (1.0–1.3), applied as a
mild multiplier. No four-tier precision claimed.

**Level band `M_level`** — a coarse **3 domains × 3 levels** table (replacing the
90-cell version), grounded in the leadership-skills strataplex (Mumford, Campion &
Morgeson 2007) and Katz (1955):

| Domain | IC | Manager | Executive |
|--------|----|---------|-----------|
| Cognitive Mastery | 1.2 | 1.0 | 0.9 |
| Character Core | 1.0 | 1.1 | 1.2 |
| Trust Dynamics | 0.8 | 1.2 | 1.5 |

Monotonic by design: as level rises the emphasis shifts from Person↔Problem
(cognitive) toward Person↔People (trust). Nine values, each traceable — not ninety.

**Formula (canonical, implemented):**

```
effectiveWeight = W_function × M_level
gap             = (5 − S) × effectiveWeight     # ranked descending; bigger gap = higher priority
```

**Hard-no gate:** deliberately **not** shipped. Per `ledger/gate_skills.md`, a hard
cutoff on a single-rater 1–5 score (interrater reliability ≈ .52; Viswesvaran, Ones
& Schmidt 1996) carries adverse-impact and false-negative risk. The report shows
**soft risk flags** for scores ≤ 2 instead of a terminating verdict.

---

## 4. What changed in code

- `cli/roadmap.js` — added `SKILL_DOMAIN`, `LEVEL_BANDS`, `effectiveWeight()`,
  `rankByGap()`; switched to `gap = (5 − S) × effectiveWeight`; `generateRoadmap`
  takes an optional `level`.
- `cli/report.js` — removed duplicated gap math; now imports `rankByGap`; takes `level`.
- `cli/index.js` — added a Level prompt (IC / Manager / Executive) threaded through.
- `cli/weighting-test.js` — the reproducible test above. Run: `node cli/weighting-test.js`.

Backward compatible: with no level supplied, `M_level = 1.0` (neutral).

---

## 5. Open items

- The role weights and level bands are still **reasoned, not calibrated**. They are
  coarse and defensible, but the counter-triggers in the ledger stand: publish
  outcome data or keep the framing as a development aid, not a validated predictor.
- Function coverage: only 3 role profiles exist in code; General falls back to unit
  function weights (level bands still apply).
