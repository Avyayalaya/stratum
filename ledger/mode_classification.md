# Ledger: Mode Classification (5 modes)

> **Status: audited (v1.0) — 2026-07-06.** Supporting evidence and counter-evidence triggers populated in the Phase 1.1 architecture audit; every citation DOI-verified via CrossRef. Counter-evidence is not a disclaimer — it operationalizes the framework's stance that literature is a feeder, not a ratifier. The triggers state the conditions under which this decision gets revised.

## Decision

Stratum classifies low scores (≤3) into five modes: **demonstrated** (specific behavioral story), **partial** (some evidence, incomplete story), **avoidance** (deflects, generalizes, changes subject), **trait_claim** (claims the skill, no story), **insufficient** (cannot provide any example). Mode classification provides intervention specificity: two people with the same score of 2 require different development approaches. `avoidance` needs acceptance work before development can start; `trait_claim` needs behavioral practice and feedback loops; `insufficient` may need scenario-based assessment to surface latent capability. Score alone underdetermines intervention; mode + score together produce actionable diagnosis.

## Supporting Evidence

| Claim | Source | url_verified |
|-------|--------|--------------|
| Behaviorally specific anchors improve rater accuracy over a bare numeric scale — precedent for classifying the *kind* of response, not only its level. | Smith, P. C., & Kendall, L. M. (1963). Retranslation of expectations: An approach to the construction of unambiguous anchors for rating scales (BARS). *Journal of Applied Psychology, 47*(2), 149–155. | yes — [10.1037/h0047060](https://doi.org/10.1037/h0047060) |
| Distinguishing "what you *would* do" from "what you *have* done" changes what a response measures — analogue for demonstrated vs. trait_claim. | McDaniel, M. A., Morgeson, F. P., Finnegan, E. B., Campion, M. A., & Braverman, E. P. (2001). Use of situational judgment tests to predict job performance. *Journal of Applied Psychology, 86*(4), 730–740. | yes — [10.1037/0021-9010.86.4.730](https://doi.org/10.1037/0021-9010.86.4.730) |
| Response-format type (behavioral tendency vs. knowledge) predicts distinct outcomes — supports classifying evidence *type*, not just score. | McDaniel, M. A., Hartman, N. S., Whetzel, D. L., & Grubb, W. L. (2007). Situational judgment tests, response instructions, and validity: A meta-analysis. *Personnel Psychology, 60*(1), 63–91. | yes — [10.1111/j.1744-6570.2007.00065.x](https://doi.org/10.1111/j.1744-6570.2007.00065.x) |

## Counter-Evidence Triggers

| Trigger | Threshold | Action |
|---------|-----------|--------|
| The specific 5-mode taxonomy (demonstrated / partial / avoidance / trait_claim / insufficient) has **no identified published precedent and no published inter-rater reliability**. An exhaustive search of BARS, competency-dictionary, SJT, and diagnostic-classification literature found no match. | Using mode labels to drive real hiring or development decisions before any inter-rater reliability study exists. | Treat mode classification as formative / hypothesis-generating until IRR is measured. Do not gate any decision on mode alone. |
| Complex behavioral rating systems degrade into halo, leniency, and central-tendency errors without rater training (Borman 1979, [10.1037/0021-9010.64.4.410](https://doi.org/10.1037/0021-9010.64.4.410)). | Two raters diverging on avoidance vs. trait_claim vs. insufficient for the same answer. | Require rater calibration; target ICC/κ ≥ .70 across trained raters before the modes are treated as reliable. |

## Refinement History

- **v0.0 (2026-05-07)** — scaffold.
- **v1.0 (2026-07-06)** — Phase 1.1 architecture audit: supporting analogues + counter-evidence populated; citations DOI-verified via CrossRef. Net: the *idea* of classifying response type has precedent (BARS, SJT), but Stratum's specific 5 modes are novel and uncalibrated — the honest gap is inter-rater reliability.

---

*Stratum architecture audit — Phase 1.1 (2026-07-06). Citations verified via CrossRef DOI resolution.*
