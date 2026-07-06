# Ledger: Combined Formula (Gap Math)

> **Status: audited (v1.0) — 2026-07-06.** Supporting evidence and counter-evidence triggers populated in the Phase 1.1 architecture audit; every citation DOI-verified via CrossRef. Counter-evidence is not a disclaimer — it operationalizes the framework's stance that literature is a feeder, not a ratifier. The triggers state the conditions under which this decision gets revised. This is the layer where the honest counter-evidence is heaviest.

## Decision

**Reconciled 2026-07-06 (v1.1).** The gap calculation combines function weight and level band into one per-skill priority score, now implemented in code (`cli/roadmap.js`):

```
effectiveWeight = W_function × M_level
gap             = (5 − S) × effectiveWeight     # ranked descending; bigger gap = higher priority
```

Where S is the assessed score (1–5), **W_function** is a coarse role-importance multiplier (~1.0–1.3; see `ROLE_WEIGHTS`), and **M_level** is the coarse 3 × 3 level band (see [level_modifiers.md](./level_modifiers.md)). The earlier 4-tier weights and 15 × 6 table were retired after the audit (see the [reconciliation note](../docs/weighting_and_levels_reconciliation_2026-07-06.md)).

**Application:**
- Sort gaps descending. **Top 3 = development sprint.**
- The math is deterministic given (function, level, scores) — the real work is assessment quality, not calculation.

**Hard-no gate: deliberately NOT shipped.** The original design proposed a `W_final ≥ 4.0 AND S ≤ 2` hard no. The audit ([gate_skills.md](./gate_skills.md)) shows a hard cutoff on a single-rater 1–5 score (interrater reliability ≈ .52) carries adverse-impact and false-negative risk. The tool surfaces **soft risk flags** for scores ≤ 2, not a terminating verdict, pending validation data.

## Supporting Evidence

| Claim | Source | url_verified |
|-------|--------|--------------|
| Predictor validity is moderated by job complexity — a theoretical warrant for varying `W_final` across roles and levels. | Hunter, J. E., & Hunter, R. F. (1984). Validity and utility of alternative predictors of job performance. *Psychological Bulletin, 96*(1), 72–98. | yes — [10.1037/0033-2909.96.1.72](https://doi.org/10.1037/0033-2909.96.1.72) |
| Combining compensatory and non-compensatory (multiple-hurdle) methods is sanctioned practice — *when each is grounded in job analysis*, a condition Stratum has not yet met. | Society for Industrial and Organizational Psychology (2018). *Principles for the Validation and Use of Personnel Selection Procedures* (5th ed.), §3.3–3.4. *Industrial and Organizational Psychology, 11*(S1), 1–97. | yes — [10.1017/iop.2018.195](https://doi.org/10.1017/iop.2018.195) |
| Empirically, the weighting rarely reorders development priorities vs. unit weights (top-3 identical ~75%, Jaccard 0.87) — supports the reconciled coarse model over the retired 4-tier / 90-cell one. | Stratum weighting robustness test, 2026-07-06 — `cli/weighting-test.js`; `docs/weighting_and_levels_reconciliation_2026-07-06.md`. | yes — in-repo, reproducible (`node cli/weighting-test.js`) |

## Counter-Evidence Triggers

| Trigger | Threshold | Action |
|---------|-----------|--------|
| **Load-bearing counter.** Unit-weighted linear composites consistently match or beat empirically optimized differential weights out-of-sample; `W_final = W_function × M_level` multiplies two *unvalidated* weight vectors — the exact regime that fails to beat unit weights (Dawes 1979, [10.1037/0003-066X.34.7.571](https://doi.org/10.1037/0003-066X.34.7.571); Einhorn & Hogarth 1975, [10.1016/0030-5073(75)90044-6](https://doi.org/10.1016/0030-5073%2875%2990044-6)). | If a unit-weighted gap score reproduces the same development-priority ranking. | Adopt unit weighting as the default; treat differential weights as an enhancement that must earn its keep on held-out data. |
| Case rankings are largely insensitive to the specific coefficient values in a linear model (Wainer 1976, [10.1037/0033-2909.83.2.213](https://doi.org/10.1037/0033-2909.83.2.213)). | If wide perturbation of `W_function` / `M_level` leaves the gap sort essentially unchanged. | Stop defending precise weight magnitudes; the ranking — not the exact `W_final` — is the product. |
| The formula multiplies weights onto a gap `(5 − S)` where `S` is a single-rater 1–5 behavioral score; single-supervisor performance ratings have interrater reliability ≈ .52 (Viswesvaran, Ones & Schmidt 1996, [10.1037/0021-9010.81.5.557](https://doi.org/10.1037/0021-9010.81.5.557)); compounding unreliable inputs amplifies error (Schmidt & Hunter 1996, [10.1037/1082-989X.1.2.199](https://doi.org/10.1037/1082-989X.1.2.199)). | The hard-no gate (`W_final ≥ 4.0 ∧ S ≤ 2`) applied to a score with reliability ≈ .52. | Publish the gate's false-positive rate under realistic rater noise; require ≥2 independent raters before a gate fires; state the gate's confidence interval, not a point verdict. |

## Refinement History

- **v0.0 (2026-05-07)** — scaffold.
- **v1.0 (2026-07-06)** — Phase 1.1 architecture audit: supporting + counter-evidence populated; all citations DOI-verified via CrossRef. **Standing recommendation:** run the framework's own simulator with (a) the current weights and (b) unit weights; if the development-priority rankings match, adopt unit weighting per Dawes. The hard-no gate must not ship a point verdict on a single-rater score with reliability ≈ .52 — report a confidence interval or require multiple raters.
- **v1.1 (2026-07-06)** — Ran that test (`cli/weighting-test.js`): top-3 rankings match a unit-weighted model ~75% of the time. Reconciled spec↔code onto the canonical `gap = (5 − S) × W_function × M_level` with coarse weights + coarse 3×3 level bands, implemented in `cli/roadmap.js`. Hard-no gate deliberately **not** shipped — soft risk flags only. Counter-triggers below stand (weights remain reasoned, not calibrated).

---

*Stratum architecture audit — Phase 1.1 (2026-07-06). Citations verified via CrossRef DOI resolution.*
