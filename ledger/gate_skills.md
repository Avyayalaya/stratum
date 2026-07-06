# Ledger: Gate-Skill Logic

> **Status: audited (v1.0) — 2026-07-06.** Supporting evidence and counter-evidence triggers populated in the Phase 1.1 architecture audit; every citation DOI-verified via CrossRef. Counter-evidence is not a disclaimer — it operationalizes the framework's stance that literature is a feeder, not a ratifier. The triggers state the conditions under which this decision gets revised.

## Decision

Stratum designates **gate skills** per function × level — skills where a score of ≤2 is a hard no regardless of strength elsewhere. Gates are cumulative: Manager-level gates include all IC gates plus additions; Director+ includes all prior plus more.

**Universal gate:** A Manager-level candidate scoring ≤2 on Trust-Building is a hard no across all functions. You cannot manage without trust.

**Function-specific gates** (illustrative, full table in Appendix E of the AI Codex Skill):

- **Product** — IC: Decision Under Uncertainty + First Principles. Manager+: Influence + Narrative Framing. Director+: Scenario Thinking + Tribal Intelligence.
- **Engineering** — IC: First Principles + Feedback Calibration. Manager+: Trust-Building + Cognitive Decoupling. Director+: Decision Under Uncertainty + Confidence Calibration.
- **Sales** — IC: Resilience + Trust-Building. Manager+: Influence + Tribal Intelligence. Director+: Strategic Patience + Narrative Framing.

Gate logic captures the irreducible behavioral capacities for the role. Strength elsewhere does not compensate for gate failure — the assessment terminates with a No Hire / No Promote recommendation.

## Supporting Evidence

| Claim | Source | url_verified |
|-------|--------|--------------|
| Minimum cut scores on job-critical dimensions are defensible practice — *under stated conditions* (criterion relevance, documented rationale). | Cascio, W. F., Alexander, R. A., & Barrett, G. V. (1988). Setting cutoff scores: Legal, psychometric, and professional issues and guidelines. *Personnel Psychology, 41*(1), 1–24. | yes — [10.1111/j.1744-6570.1988.tb00629.x](https://doi.org/10.1111/j.1744-6570.1988.tb00629.x) |
| Multiple-hurdle / multiple-cutoff (non-compensatory) selection is a recognized strategy when a minimum on a dimension is job-critical. | Cascio, W. F., & Aguinis, H. (2019). *Applied Psychology in Talent Management* (8th ed.). SAGE. | yes — [10.4135/9781506375953](https://doi.org/10.4135/9781506375953) |
| Trust/psychological safety is created through the manager and cannot be offset by an individual's cognitive strength — the empirical basis for a Trust-Building gate at the manager transition. | Edmondson, A. (1999). Psychological safety and learning behavior in work teams. *Administrative Science Quarterly, 44*(2), 350–383. | yes — [10.2307/2666999](https://doi.org/10.2307/2666999) |

## Counter-Evidence Triggers

| Trigger | Threshold | Action |
|---------|-----------|--------|
| Non-compensatory (multiple-cutoff) systems increase adverse impact versus compensatory composites of equal selection quality (De Corte, Lievens & Sackett 2007, [10.1037/0021-9010.92.5.1380](https://doi.org/10.1037/0021-9010.92.5.1380)). | Any gate applied at scale without an adverse-impact analysis. | Run an adverse-impact check on every gate; keep the gate only where its incremental value justifies the disparate-impact and false-negative cost. |
| Arbitrary cut scores carry documented legal and psychometric danger when they lack criterion-referenced validity evidence (Cascio, Alexander & Barrett 1988, [10.1111/j.1744-6570.1988.tb00629.x](https://doi.org/10.1111/j.1744-6570.1988.tb00629.x)). | A "≤2 = hard no" gate set from reasoning alone, with no calibration data behind the cut point. | Treat gate thresholds as hypotheses; document the rationale; do not present a gate as validated until criterion evidence exists. |
| Any selection procedure with adverse impact must be validated (criterion / content / construct); hard cutoffs on subjective 1–5 ratings without validation create Title VII / EEOC exposure (EEOC Uniform Guidelines 1978, 29 C.F.R. § 1607 — [govinfo](https://www.govinfo.gov/app/details/CFR-2021-title29-vol4/CFR-2021-title29-vol4-part1607)). | Deployment of Stratum gates in actual U.S. hiring decisions. | Do not use gates for legally consequential hiring without a validation study; label the framework as a development/coaching aid where validation is absent. |

## Refinement History

- **v0.0 (2026-05-07)** — scaffold.
- **v1.0 (2026-07-06)** — Phase 1.1 architecture audit: supporting + counter-evidence populated; all citations DOI-verified via CrossRef. Net: gates are a recognized strategy and the Trust-Building manager gate is well-motivated (Edmondson), but hard cutoffs on subjective 1–5 ratings carry adverse-impact and legal exposure — gates are defensible for *development framing*, not for consequential hiring without validation.

---

*Stratum architecture audit — Phase 1.1 (2026-07-06). Citations verified via CrossRef DOI resolution.*
