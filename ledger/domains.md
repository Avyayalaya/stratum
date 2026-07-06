# Ledger: Three-Domain Logic

> **Status: audited (v1.0) — 2026-07-06.** Supporting evidence and counter-evidence triggers populated in the Phase 1.1 architecture audit; every citation DOI-verified via CrossRef. Counter-evidence is not a disclaimer — it operationalizes the framework's stance that literature is a feeder, not a ratifier. The triggers state the conditions under which this decision gets revised.

## Decision

Stratum organizes 15 meta-skills across three domains: **Cognitive Mastery** (Person↔Problem), **Character Core** (Person↔Adversity), **Trust Dynamics** (Person↔People). The three-domain structure reflects the claim that every performance failure that doesn't trace to technical incompetence traces to one of these three interfaces. The ordering is causal: cognition provides the reasoning substrate; character allows it to operate under real pressure; trust dynamics multiplies individual capability across team systems.

## Supporting Evidence

| Claim | Source | url_verified |
|-------|--------|--------------|
| Team performance turns on the interpersonal (Person↔People) interface — psychological safety predicts team learning and performance independent of individual ability. | Edmondson, A. (1999). Psychological safety and learning behavior in work teams. *Administrative Science Quarterly, 44*(2), 350–383. | yes — [10.2307/2666999](https://doi.org/10.2307/2666999) |
| Trust is a construct distinct from competence, with its own structure (ability, benevolence, integrity) — warrant for a separate Trust Dynamics domain. | Mayer, R. C., Davis, J. H., & Schoorman, F. D. (1995). An integrative model of organizational trust. *Academy of Management Review, 20*(3), 709–734. | yes — [10.2307/258792](https://doi.org/10.2307/258792) |
| The quality of the interpersonal relationship predicts outcomes beyond task skill (LMX in-group / out-group). | Graen, G. B., & Uhl-Bien, M. (1995). Relationship-based approach to leadership: LMX theory over 25 years. *The Leadership Quarterly, 6*(2), 219–247. | yes — [10.1016/1048-9843(95)90036-5](https://doi.org/10.1016/1048-9843%2895%2990036-5) |
| A small, level-sensitive skill taxonomy (technical / human / conceptual) is an established structural precedent. | Katz, R. L. (1955 / 1974 reprint). Skills of an effective administrator. *Harvard Business Review, 33*(1) / 52(5). | yes — [hbr.org/1974/09](https://hbr.org/1974/09/skills-of-an-effective-administrator) (pre-DOI; 1974 reprint confirmed) |
| The broadest validated predictor split in selection is cognitive vs. non-cognitive — grounds separating Cognitive Mastery from Character / Trust. | Schmidt, F. L., & Hunter, J. E. (1998). The validity and utility of selection methods in personnel psychology. *Psychological Bulletin, 124*(2), 262–274. | yes — [10.1037/0033-2909.124.2.262](https://doi.org/10.1037/0033-2909.124.2.262) |

## Counter-Evidence Triggers

| Trigger | Threshold | Action |
|---------|-----------|--------|
| The empirically derived structure of individual differences is five factors (Big Five / FFM), derived by factor analysis across instruments and observers (McCrae & Costa 1987, [10.1037/0022-3514.52.1.81](https://doi.org/10.1037/0022-3514.52.1.81)); Stratum's three domains were never factor-analyzed. | If a factor analysis of Stratum's 15-skill ratings fails to recover three coherent, non-overlapping factors. | State plainly in the spec that the three domains are a *conceptual* organization, not a psychometric one. Restructure the domains if the factors don't hold. |
| A six-factor structure (HEXACO) replicates cross-culturally, and its Honesty-Humility factor is only partially captured by Stratum (Ashton & Lee 2007, [10.1177/1088868306294907](https://doi.org/10.1177/1088868306294907)). | If the 15 skills leave an integrity / honesty dimension under-represented (i.e., Strength of Character does not fully carry it). | Audit the skill set for a missing honesty axis; add or re-scope a skill rather than force-fit it into an existing domain. |

## Refinement History

- **v0.0 (2026-05-07)** — scaffold.
- **v1.0 (2026-07-06)** — Phase 1.1 architecture audit: supporting + counter-evidence populated; all citations DOI-verified via CrossRef. Net: each domain maps to a validated construct, but the three-way *cut* is theoretical, not factor-derived — the spec must say so and stay open to restructuring.

---

*Stratum architecture audit — Phase 1.1 (2026-07-06). Citations verified via CrossRef DOI resolution.*
