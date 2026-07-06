# Ledger: Combined Formula (Gap Math)

> **Status: audited (v1.0) — 2026-07-06.** Supporting evidence and counter-evidence triggers populated in the Phase 1.1 architecture audit; every citation DOI-verified via CrossRef. Counter-evidence is not a disclaimer — it operationalizes the framework's stance that literature is a feeder, not a ratifier. The triggers state the conditions under which this decision gets revised. This is the layer where the honest counter-evidence is heaviest.

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
| Predictor validity is moderated by job complexity — a theoretical warrant for varying `W_final` across roles and levels. | Hunter, J. E., & Hunter, R. F. (1984). Validity and utility of alternative predictors of job performance. *Psychological Bulletin, 96*(1), 72–98. | yes — [10.1037/0033-2909.96.1.72](https://doi.org/10.1037/0033-2909.96.1.72) |
| Combining compensatory and non-compensatory (multiple-hurdle) methods is sanctioned practice — *when each is grounded in job analysis*, a condition Stratum has not yet met. | Society for Industrial and Organizational Psychology (2018). *Principles for the Validation and Use of Personnel Selection Procedures* (5th ed.), §3.3–3.4. *Industrial and Organizational Psychology, 11*(S1), 1–97. | yes — [10.1017/iop.2018.195](https://doi.org/10.1017/iop.2018.195) |

## Counter-Evidence Triggers

| Trigger | Threshold | Action |
|---------|-----------|--------|
| **Load-bearing counter.** Unit-weighted linear composites consistently match or beat empirically optimized differential weights out-of-sample; `W_final = W_function × M_level` multiplies two *unvalidated* weight vectors — the exact regime that fails to beat unit weights (Dawes 1979, [10.1037/0003-066X.34.7.571](https://doi.org/10.1037/0003-066X.34.7.571); Einhorn & Hogarth 1975, [10.1016/0030-5073(75)90044-6](https://doi.org/10.1016/0030-5073%2875%2990044-6)). | If a unit-weighted gap score reproduces the same development-priority ranking. | Adopt unit weighting as the default; treat differential weights as an enhancement that must earn its keep on held-out data. |
| Case rankings are largely insensitive to the specific coefficient values in a linear model (Wainer 1976, [10.1037/0033-2909.83.2.213](https://doi.org/10.1037/0033-2909.83.2.213)). | If wide perturbation of `W_function` / `M_level` leaves the gap sort essentially unchanged. | Stop defending precise weight magnitudes; the ranking — not the exact `W_final` — is the product. |
| The formula multiplies weights onto a gap `(5 − S)` where `S` is a single-rater 1–5 behavioral score; single-supervisor performance ratings have interrater reliability ≈ .52 (Viswesvaran, Ones & Schmidt 1996, [10.1037/0021-9010.81.5.557](https://doi.org/10.1037/0021-9010.81.5.557)); compounding unreliable inputs amplifies error (Schmidt & Hunter 1996, [10.1037/1082-989X.1.2.199](https://doi.org/10.1037/1082-989X.1.2.199)). | The hard-no gate (`W_final ≥ 4.0 ∧ S ≤ 2`) applied to a score with reliability ≈ .52. | Publish the gate's false-positive rate under realistic rater noise; require ≥2 independent raters before a gate fires; state the gate's confidence interval, not a point verdict. |

## Refinement History

- **v0.0 (2026-05-07)** — scaffold.
- **v1.0 (2026-07-06)** — Phase 1.1 architecture audit: supporting + counter-evidence populated; all citations DOI-verified via CrossRef. **Standing recommendation:** run the framework's own simulator with (a) the current weights and (b) unit weights; if the development-priority rankings match, adopt unit weighting per Dawes. The hard-no gate must not ship a point verdict on a single-rater score with reliability ≈ .52 — report a confidence interval or require multiple raters.

---

*Stratum architecture audit — Phase 1.1 (2026-07-06). Citations verified via CrossRef DOI resolution.*
