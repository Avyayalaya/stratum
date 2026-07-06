# Ledger: Role Weighting (Function Profiles)

> **Status: audited (v1.0) — 2026-07-06.** Supporting evidence and counter-evidence triggers populated in the Phase 1.1 architecture audit; every citation DOI-verified via CrossRef. Counter-evidence is not a disclaimer — it operationalizes the framework's stance that literature is a feeder, not a ratifier. The triggers state the conditions under which this decision gets revised.

## Decision

Stratum applies function-specific weights to each meta-skill, in four tiers:

- **3.0 — Defining.** Separates extraordinary from average for this function. A gap here is disqualifying.
- **2.0 — Critical.** Expected at high proficiency. A gap causes visible failure.
- **1.5 — Important.** Contributes meaningfully. A gap limits the person's ceiling.
- **1.0 — Baseline.** Minimum competency. Not a differentiator.

Function profiles are defined for: Product Management, Software Engineering, Design (Product/UX), Data Science / ML, Sales / Business Development, Marketing, Operations / Supply Chain, People / HR, Finance / Strategy, General Management, Founder / CEO. Each profile names which skills sit at Defining vs. Critical vs. Important tiers. The weights anchor the gap-priority math: skills mattering more for the role surface in development sprints first.

## Supporting Evidence

| Claim | Source | url_verified |
|-------|--------|--------------|
| Weighting predictors by demonstrated job relevance is the professional standard, grounded in job analysis. | Society for Industrial and Organizational Psychology (2018). *Principles for the Validation and Use of Personnel Selection Procedures* (5th ed.). *Industrial and Organizational Psychology, 11*(S1), 1–97. | yes — [10.1017/iop.2018.195](https://doi.org/10.1017/iop.2018.195) |
| Skills, abilities, and activities are rated for Importance *per occupation* at national scale — the operational analogue to function-specific weighting. | National Center for O\*NET Development (2024). *O\*NET Database*, U.S. Dept. of Labor. | yes — [onetcenter.org/database.html](https://www.onetcenter.org/database.html) |
| Predictor validity differs across job families (e.g., cognitive ability matters more for complex jobs) — supports moderating weights by function. | Hunter, J. E., & Hunter, R. F. (1984). Validity and utility of alternative predictors of job performance. *Psychological Bulletin, 96*(1), 72–98. | yes — [10.1037/0033-2909.96.1.72](https://doi.org/10.1037/0033-2909.96.1.72) |

## Counter-Evidence Triggers

| Trigger | Threshold | Action |
|---------|-----------|--------|
| Across dozens of judgment domains, unit weights (every skill weighted 1.0) predict outcomes as well as — or better than — optimized differential weights out-of-sample (Dawes 1979, [10.1037/0003-066X.34.7.571](https://doi.org/10.1037/0003-066X.34.7.571)). | If a flat unit-weighted model reproduces the same gap ranking as the 4-tier weights on held-out cases. | Justify the 4-tier scheme empirically or collapse it toward unit weights. The burden of proof is on the weights, not on simplicity. |

## Refinement History

- **v0.0 (2026-05-07)** — scaffold.
- **v1.0 (2026-07-06)** — Phase 1.1 architecture audit: supporting + counter-evidence populated; all citations DOI-verified via CrossRef. Net: weighting *by job relevance* is standard practice; the specific 4-tier magnitudes need an out-of-sample test against a unit-weight baseline (Dawes) before they earn their complexity.

---

*Stratum architecture audit — Phase 1.1 (2026-07-06). Citations verified via CrossRef DOI resolution.*
