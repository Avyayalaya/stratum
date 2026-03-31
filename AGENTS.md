# AGENTS.md — Stratum Capability Manifest

## Identity
- **Name:** Stratum
- **Type:** Leadership evaluation and coaching framework
- **Author:** Parth Sangani
- **Version:** 1.0
- **License:** MIT

## What This System Does
Stratum provides a structured framework for hiring, evaluating, and developing teams based on 15 meta-skills across 3 domains. It includes an AI-powered assessment CLI that uses Claude to evaluate behavioral evidence against calibrated rubrics.

## Capabilities

### 1. Meta-Skill Assessment
- **Input:** Behavioral evidence (answers to situational questions)
- **Output:** Calibrated score profile across 15 meta-skills, role-weighted gap analysis, 4-week sprint plan
- **Quality:** Removes Dunning-Kruger inflation via behavioral evidence scoring

### 2. Hiring Evaluation
- **Input:** Candidate interview responses
- **Output:** Structured evaluation against meta-skill rubrics with diagnostics and scenario simulations
- **Assets:** 3 diagnostics, 3 scenario decks, hiring playbook

### 3. Team Coaching
- **Input:** Team diagnostic results, role context
- **Output:** Personalized coaching plans, field notes, flywheel case studies
- **Assets:** 3 field notes, 3 role playbooks (engineering, product, operations)

## Domains
1. **Cognitive Mastery** — First Principles Thinking, Decision-Making Under Uncertainty, Scenario Thinking, Feedback Calibration, Bayesian Updating
2. **Character Core** — Strategic Patience, Resilience, Strength of Character, Cognitive Decoupling, Execution with Reversibility
3. **Trust Dynamics** — Trust-Building, Ability to Influence, Narrative Framing, Tribal Intelligence, Confidence Calibration

## How to Use
- **CLI Assessment:** `node cli/index.js` (requires ANTHROPIC_API_KEY)
- **Hiring:** Use diagnostics + scenario decks as interview tools
- **Coaching:** Run diagnostics quarterly, debrief with flywheel cases, use field notes for 1:1s

## Dependencies
- Node.js (for CLI)
- Anthropic API key (for AI-powered assessment)
- No other external dependencies
