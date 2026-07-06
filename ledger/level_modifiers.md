# Ledger: Level Modifiers (Function × Level)

> **Status: audited (v1.0) — 2026-07-06.** This was the framework's weakest section going in, and the audit says so plainly rather than manufacturing confidence. The supporting evidence establishes *that* skill weightings shift by level (Mumford strataplex; Katz); the counter-evidence (Dawes 1979) establishes that an elaborate, unvalidated 90-cell weighting table is unlikely to out-predict a far simpler structure. Every citation DOI-verified via CrossRef.

## Decision

Stratum applies level-specific modifiers to function weights via a 15 × 6 table (15 skills × 6 levels: IC, Senior IC, Manager, Director, VP, C-Suite). Level modifiers reflect the universal pattern that the operating surface shifts from Person↔Problem (the IC's interface) toward Person↔People (the executive's interface) as level rises. Concrete instances of this pattern:

- **Tribal Intelligence** at IC = 0.3 modifier; at C-Suite = 2.5 modifier
- **Trust-Building** jumps sharply at the Manager transition (1.0 → 1.8) — you cannot manage without trust
- **First Principles Thinking** peaks at Senior IC (1.2), dips at Manager (1.0 — enabling > solving), returns at C-Suite (1.2)
- **Strength of Character** at C-Suite = 2.5 — your integrity IS the institution

Combined weight: `W_final = W_function × M_level`. Gap = `(5 − S) × W_final`. Hiring threshold: `W_final ≥ 4.0` AND `S ≤ 2` = hard no.

**Audit priority for Phase 1.1:** each of the 90 cells needs defensible reasoning OR the table needs simplification. The current values were derived from first-principles reasoning + practitioner experience, not from data — the audit must either ground each cell or shrink the table to a smaller defensible structure.

## Supporting Evidence

| Claim | Source | url_verified |
|-------|--------|--------------|
| Leadership skill requirements shift systematically across organizational levels — cognitive/strategic skills rise toward the top, interpersonal/business skills anchor lower levels. The most direct empirical support for a level-modifier gradient. | Mumford, T. V., Campion, M. A., & Morgeson, F. P. (2007). The leadership skills strataplex: Leadership skill requirements across organizational levels. *The Leadership Quarterly, 18*(2), 154–166. | yes — [10.1016/j.leaqua.2007.01.005](https://doi.org/10.1016/j.leaqua.2007.01.005) |
| The relative importance of technical, human, and conceptual skills changes with managerial level — the conceptual ancestor of the Person↔Problem → Person↔People axis shift. | Katz, R. L. (1955 / 1974 reprint). Skills of an effective administrator. *Harvard Business Review, 33*(1) / 52(5). | yes — [hbr.org/1974/09](https://hbr.org/1974/09/skills-of-an-effective-administrator) (pre-DOI; 1974 reprint confirmed) |

## Counter-Evidence Triggers

| Trigger | Threshold | Action |
|---------|-----------|--------|
| The 90-cell first-principles modifier table is exactly the kind of elaborate weight structure Dawes shows does not out-predict unit weights out-of-sample (Dawes 1979, [10.1037/0003-066X.34.7.571](https://doi.org/10.1037/0003-066X.34.7.571)). | If a simpler structure (e.g., 3 domain-level modifiers × 6 levels, or a monotonic IC→C-suite shift) reproduces the same gap ranking. | Collapse the 15×6 table toward the smallest structure that preserves the ranking. Do not defend 90 hand-set cells the evidence can't distinguish from 18. |
| Unvalidated ratings treated as observed scores carry substantial measurement error that propagates into any derived composite (Schmidt & Hunter 1996, [10.1037/1082-989X.1.2.199](https://doi.org/10.1037/1082-989X.1.2.199)). | Any published cell value implying two-decimal precision (e.g., 0.3 vs 0.4) with no calibration data behind it. | Report modifiers as coarse bands (low / medium / high), not false-precision decimals, until data justifies finer grain. |

## Refinement History

- **v0.0 (2026-05-07)** — scaffold.
- **v1.0 (2026-07-06)** — Phase 1.1 architecture audit: supporting + counter-evidence populated; all citations DOI-verified via CrossRef. **Standing recommendation:** the *direction* of the level gradient is well-supported (Mumford, Katz); the *90 specific cell values* are not. Collapse to coarse bands or a smaller table until validation data exists. This entry keeps its honest flag: the concept holds, the precision does not.

---

*Stratum architecture audit — Phase 1.1 (2026-07-06). Citations verified via CrossRef DOI resolution.*
