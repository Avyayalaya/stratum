# Ledger: Combined Formula (Gap Math)

> **Status: scaffold (v0.0).** This entry will be populated during Phase 1.1 architecture audit. The Decision below reflects pre-audit state per STR-001 thesis v1.0.

## Decision

Stratum's gap calculation combines function weight and level modifier into a single per-skill priority score:

```
W_final = W_function × M_level
Gap     = (5 − S) × W_final
```

Where S is the assessed score (1–5), W_function is the function-tier weight (3.0 / 2.0 / 1.5 / 1.0), and M_level is the level modifier from the 15 × 6 table.

**Application:**
- Sort gap scores descending. **Top 3 = 90-day development sprint.** Top 5 = annual development plan.
- **Hiring threshold:** any skill with `W_final ≥ 4.0` AND `S ≤ 2` is a hard no. This catches the case where a Defining skill at a level where it matters most produces a gap large enough to override all other strengths.
- The math is deterministic given (function, level, scores) — the human work is in the underlying assessment quality, not in the calculation.

The formula is intentionally simple. It does not weight by recency, urgency, or domain transfer; it does not adjust for how cleanly a skill develops vs. how stuck it is. Those judgments belong in the development plan after gap priority is set, not in the gap math itself.

## Supporting Evidence

| Claim | Source | url_verified |
|-------|--------|--------------|
| *(populated during Phase 1.1 audit)* | | |

## Counter-Evidence Triggers

| Trigger | Threshold | Action |
|---------|-----------|--------|
| *(populated during Phase 1.1 audit)* | | |

## Refinement History

- **v0.0 (2026-05-07)** — scaffold; populated in Phase 1.1.

---

*Ledger entry per Stratum Phase 1.0 deliverable D4. Source: [PLN-020](../STAGE1.md).*
