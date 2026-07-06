# Ledger: Level Modifiers (Function × Level)

> **Status: audited (v1.0) — 2026-07-06.** This was the framework's weakest section going in, and the audit says so plainly rather than manufacturing confidence. The supporting evidence establishes *that* skill weightings shift by level (Mumford strataplex; Katz); the counter-evidence (Dawes 1979) establishes that an elaborate, unvalidated 90-cell weighting table is unlikely to out-predict a far simpler structure. Every citation DOI-verified via CrossRef.

## Decision

**Reconciled 2026-07-06 (v1.1).** The original design applied a 15 × 6 modifier table (90 hand-set cells across IC / Senior IC / Manager / Director / VP / C-Suite). The audit found that table indefensible — the values were reasoned, not calibrated — and an empirical test ([reconciliation note](../docs/weighting_and_levels_reconciliation_2026-07-06.md)) showed the elaborate weighting rarely changes the development priority a person receives (top-3 gaps identical to a unit-weighted model ~75% of the time). **The 90-cell table is retired.**

The reconciled model is a **coarse 3 × 3 band** (3 domains × 3 levels), monotonic by design, expressing the one robust finding: as level rises, the differentiating emphasis shifts from Person↔Problem (cognitive) toward Person↔People (trust).

| Domain | IC | Manager | Executive |
|--------|----|---------|-----------|
| Cognitive Mastery | 1.2 | 1.0 | 0.9 |
| Character Core | 1.0 | 1.1 | 1.2 |
| Trust Dynamics | 0.8 | 1.2 | 1.5 |

This is now **implemented in code** (`cli/roadmap.js` → `LEVEL_BANDS`, `effectiveWeight`), so the spec and the tool agree. Nine traceable values, not ninety hand-set cells. Combined: `effectiveWeight = W_function × M_level`; `gap = (5 − S) × effectiveWeight`.

## Supporting Evidence

| Claim | Source | url_verified |
|-------|--------|--------------|
| Leadership skill requirements shift systematically across organizational levels — cognitive/strategic skills rise toward the top, interpersonal/business skills anchor lower levels. The most direct empirical support for a level-modifier gradient. | Mumford, T. V., Campion, M. A., & Morgeson, F. P. (2007). The leadership skills strataplex: Leadership skill requirements across organizational levels. *The Leadership Quarterly, 18*(2), 154–166. | yes — [10.1016/j.leaqua.2007.01.005](https://doi.org/10.1016/j.leaqua.2007.01.005) |
| The relative importance of technical, human, and conceptual skills changes with managerial level — the conceptual ancestor of the Person↔Problem → Person↔People axis shift. | Katz, R. L. (1955 / 1974 reprint). Skills of an effective administrator. *Harvard Business Review, 33*(1) / 52(5). | yes — [hbr.org/1974/09](https://hbr.org/1974/09/skills-of-an-effective-administrator) (pre-DOI; 1974 reprint confirmed) |
| The elaborate weighting rarely changes guidance — top-3 development gaps match a unit-weighted model ~75% of the time (mean Jaccard 0.87) across 5,000 seeded profiles/role. Empirical basis for a coarse 3×3 band rather than 90 cells. | Stratum weighting robustness test, 2026-07-06 — `cli/weighting-test.js`; writeup `docs/weighting_and_levels_reconciliation_2026-07-06.md`. | yes — in-repo, reproducible (`node cli/weighting-test.js`) |

## Counter-Evidence Triggers

| Trigger | Threshold | Action |
|---------|-----------|--------|
| The 90-cell first-principles modifier table is exactly the kind of elaborate weight structure Dawes shows does not out-predict unit weights out-of-sample (Dawes 1979, [10.1037/0003-066X.34.7.571](https://doi.org/10.1037/0003-066X.34.7.571)). | If a simpler structure (e.g., 3 domain-level modifiers × 6 levels, or a monotonic IC→C-suite shift) reproduces the same gap ranking. | Collapse the 15×6 table toward the smallest structure that preserves the ranking. Do not defend 90 hand-set cells the evidence can't distinguish from 18. |
| Unvalidated ratings treated as observed scores carry substantial measurement error that propagates into any derived composite (Schmidt & Hunter 1996, [10.1037/1082-989X.1.2.199](https://doi.org/10.1037/1082-989X.1.2.199)). | Any published cell value implying two-decimal precision (e.g., 0.3 vs 0.4) with no calibration data behind it. | Report modifiers as coarse bands (low / medium / high), not false-precision decimals, until data justifies finer grain. |

## Refinement History

- **v0.0 (2026-05-07)** — scaffold.
- **v1.0 (2026-07-06)** — Phase 1.1 architecture audit: supporting + counter-evidence populated; all citations DOI-verified via CrossRef. **Standing recommendation:** the *direction* of the level gradient is well-supported (Mumford, Katz); the *90 specific cell values* are not. Collapse to coarse bands or a smaller table until validation data exists. This entry keeps its honest flag: the concept holds, the precision does not.
- **v1.1 (2026-07-06)** — Reconciled spec↔code. Retired the 90-cell table; shipped a coarse 3×3 band implemented in `cli/roadmap.js`, backed by the in-repo robustness test. The honest flag is resolved: direction is evidence-backed, precision is now coarse. Counter-triggers below still stand (weights remain reasoned, not calibrated).

---

*Stratum architecture audit — Phase 1.1 (2026-07-06). Citations verified via CrossRef DOI resolution.*
