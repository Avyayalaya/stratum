# AGENTS.md — Stratum Capability Manifest

## Identity

- **Name:** Stratum
- **Type:** Formation framework — Selecting and Forging elite humans
- **Activities:** Selection (assessing what's truly there in a person) + Forging (growing capacity over time)
- **Domains:** Cognitive Mastery (Person↔Problem), Character Core (Person↔Adversity), Trust Dynamics (Person↔People) — 15 meta-skills total
- **Author:** Parth Sangani
- **Version:** 1.0 (v0.5 README, audit in progress through Phase 1.3)
- **License:** MIT
- **Repo:** https://github.com/Avyayalaya/stratum

## What This System Does

Stratum operates a behavioral assessment + development framework at production scale. It scores behavioral evidence (specific Situation + Action + Outcome stories) against calibrated rubrics — never trait self-report — and produces role-weighted gap priorities for hiring decisions, team composition diagnostics, and 90-day development sprints. The framework is currently being audited from first principles in public; the rigor lives in the [Evidence Ledger](./ledger/).

## Capabilities

### 1. Selection (Assessment)
- **Input:** Behavioral interview responses (situational questions probing specific past behavior); assessor context (function, level)
- **Output:** Calibrated score profile across 15 meta-skills (1–5 scale + mode classification: demonstrated / partial / avoidance / trait_claim / insufficient); role-weighted gap analysis (`W_final = W_function × M_level`); hire/no-hire recommendation with gate-skill flags
- **Quality gate:** Behavioral evidence required for any score ≥4. Trait claims default to score 2. Dunning-Kruger structurally addressed (self-report rejected as primary input).

### 2. Forging (Development)
- **Input:** Score profile from Selection + presenting problem from manager/coach
- **Output:** Top-3 gap skills (highest weighted gap), 90-day development sprint per gap (mechanism + practice context + success signal + check-in cadence), function × level-calibrated practice protocols
- **Mode-specific intervention:** `avoidance` requires acceptance work first; `trait_claim` requires behavioral practice + feedback loops; `insufficient` requires scenario-based assessment to surface latent capability

### 3. Team Composition (Diagnostic)
- **Input:** Team roster with function + level; per-member assessment outputs
- **Output:** Coverage check (≥1 person ≥4 in each domain), blind-spot detection (skills where no one is above 3), conflict-risk pairs (combinations that create friction), complementary-strength pairs, hiring recommendation for next role

## Composability (Typed Inputs / Outputs)

The [AI Codex Skill](./ai-skill/) provides the canonical interactive protocol for invoking Stratum capabilities through Claude. Schema:

| Capability | Input contract | Output contract |
|------------|----------------|-----------------|
| Selection | `{candidate_function, candidate_level, behavioral_evidence: [{question, answer}]}` | `{scores: [{skill, score, mode, evidence_summary}], gates: [{skill, status}], gap_priorities: [{skill, gap_score, weighted_priority}], recommendation: hire \| no_hire \| conditional}` |
| Forging | `{individual_score_profile, function, level, presenting_problem}` | `{top_gaps: [skill, current_score, target_score, mode], sprints: [{skill, mechanism, practice_context, success_signal, check_in_cadence}]}` |
| Team Composition | `{members: [{name, function, level, score_profile}]}` | `{coverage_status, blind_spots: [skill], conflict_risk_pairs: [{member_a, member_b, mechanism}], complementary_strengths, next_hire_priority: [skill]}` |

Orchestrators routing tasks to Stratum need only the input contracts above; outputs follow the schemas regardless of internal architecture.

## Evaluability

- **[Sample Reports](./reports/)** — *populated end of Phase 1.3.* Production-quality output design demonstrating the report bar (mechanism per low score, operational cost, trajectory under intervention, calibrated 90-day sprint).
- **[Case Studies](./cases/)** — *populated end of Phase 1.3.* Real teams run through Stratum, narrated end-to-end with consent.
- **[Evidence Ledger](./ledger/)** — *populated through Phase 1.1 + 1.2.* For every architectural choice and skill, the supporting evidence + counter-evidence triggers + refinement history. Auditable by external systems.
- **Adversarial test personas** — Stratum's scoring is stress-tested against personas designed to probe specific failure modes (quiet competence under-rated, articulate bullshitting over-rated, empathic avoidance mistaken for resilience). Personas + results land in `/cases/adversarial/` end of Phase 1.2.

## Domains × Skills

1. **Cognitive Mastery** — First Principles Thinking · Decision-Making Under Uncertainty · Scenario Thinking · Feedback Calibration · Bayesian Updating
2. **Character Core** — Strategic Patience · Resilience · Strength of Character · Cognitive Decoupling · Execution with Reversibility
3. **Trust Dynamics** — Trust-Building · Ability to Influence · Narrative Framing · Tribal Intelligence · Confidence Calibration

## How to Use

- **AI Codex Skill (recommended):** Load `./ai-skill/` into Claude or compatible AI assistant; invoke interactively
- **CLI Assessment:** `node cli/index.js` (requires `ANTHROPIC_API_KEY` in `.env`)
- **Manual:** Use [Selection Playbook](./playbooks/selection/) for hiring; [Forging Playbook](./playbooks/forging/) for development; [Diagnostics](./evaluation-tools/) for self-administered checks; [Scenario Decks](./scenario-templates/) for simulation-based assessment
- **Coaching cadence:** Run team-level Selection quarterly; run individual Forging sprints on 90-day cycles; re-assess at sprint close

## Future Application Surfaces

The 15 meta-skills are human-formation primitives — they apply beyond the workplace. Two surfaces are explicitly stubbed for dedicated future sessions:

- **[Parenting Companion](./future/parenting_companion.md)** — same skills, age-calibrated questions and observable behaviors, dose-response across childhood/adolescence
- **[Self-Formation Companion](./future/self_formation_companion.md)** — same skills, self-administered with Dunning-Kruger guardrails (third-party verification required)

## Dependencies

- **Node.js** (for CLI)
- **Anthropic API key** (for AI-powered assessment via CLI or AI Codex Skill)
- **No other external dependencies**

## Status

v0.5 — architecture audit in progress. Existing skill pages, playbooks, and diagnostics remain operational at production scale. Pages currently being audited carry an audit-in-progress banner pointing to the [Evidence Ledger](./ledger/) for the underlying first-principles work. Architecture refinements (if any) land at end of Phase 1.1; skill deepenings land at end of Phase 1.2; v1.0 ships at end of Phase 1.3.

Audit narration: [Parth on LinkedIn](https://www.linkedin.com/in/parthsangani).
