# Stratum

**A Formation framework for Selecting and Forging elite humans.**

Fifteen behavioral meta-skills across three domains — Cognitive Mastery, Character Core, Trust Dynamics. Assessed through behavioral evidence (what people do under pressure), weighted by function and level (a PM and an engineer with the same raw scores get different gap priorities), used at production scale to make decisions that compound.

This repo is the canonical spec. Each architectural decision and each skill is currently being audited from first principles in public; the rigor lives in the [Evidence Ledger](./ledger/). Architecture refinements and skill deepenings are narrated on LinkedIn ([Parth Sangani](https://www.linkedin.com/in/parthsangani)).

---

## What's here

- **[Spec](./spec/)** — architecture, scoring rubric, mode classification, function profiles, level modifiers, gate logic
- **[Skills](./meta-skills/)** — 15 meta-skills across 3 domains
- **Playbooks** — [Selection](./playbooks/selection/) (assessing people for roles or teams) and [Forging](./playbooks/forging/) (developing capacity over time)
- **[Evidence Ledger](./ledger/)** — supporting + counter-evidence + refinement history per architectural choice
- **[AI Codex Skill](./ai-skill/)** — interactive Claude-powered protocol for assessment
- **[Sample Reports](./reports/)** — output design reference *(populated end of Phase 1.3)*
- **[Case Studies](./cases/)** — real teams run through Stratum *(populated end of Phase 1.3)*
- **[Future Application Surfaces](./future/)** — Parenting Companion + Self-Formation Companion stubs

---

## The 15 meta-skills

**Cognitive Mastery** (Person ↔ Problem) — First Principles · Decision Under Uncertainty · Scenario Thinking · Feedback Calibration · Bayesian Updating

**Character Core** (Person ↔ Adversity) — Strategic Patience · Resilience · Strength of Character · Cognitive Decoupling · Execution with Reversibility

**Trust Dynamics** (Person ↔ People) — Trust-Building · Influence · Narrative Framing · Tribal Intelligence · Confidence Calibration

---

## Quick start

Interactive assessment via Claude (recommended):

```
@Skill Stratum Meta-Skill Evaluation
```

Or via CLI:

```bash
git clone https://github.com/Avyayalaya/stratum.git
cd stratum && npm install
cp .env.example .env  # add ANTHROPIC_API_KEY
node cli/index.js
```

---

## Status

**v0.5 — architecture audit in progress.** Existing skill pages, playbooks, and diagnostics remain operational and used at production scale. Pages currently being audited carry an audit-in-progress banner. The audit sharpens first-principles defensibility and surfaces supporting + counter-evidence in the Evidence Ledger.

Phase 1.1 (architecture audit) ships through ~Week 9. Phase 1.2 (skill deepening) through ~Week 17. Phase 1.3 (Sample Report v1.0 + Selection Playbook v1.0 + Forging Playbook v1.0 + first case study) through ~Week 21.

---

[AGENTS.md](./AGENTS.md) — machine-readable capability manifest · [LICENSE](./LICENSE) — MIT
