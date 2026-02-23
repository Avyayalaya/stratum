# Stratum: A Leadership Framework for Hiring, Evaluating, and Scaling Elite Teams

**Stratum** is a leadership framework for building elite teams. It focuses on hiring the right people, evaluating them on core meta-skills, and scaling a culture of trust and clarity. Use it to identify, assess, and grow the behaviors behind outstanding collaboration.

This repository includes three fully scaffolded meta-skill domains, along with tactical tools, interview simulations, and flywheel case studies that bring them to life in real-world teams.

> **Why Stratum?**
> Because great teams aren't built on tactics—they’re built on thinking, character, and trust, practiced daily.

---

## 🧠 The Three Core Domains

Each domain includes 5 meta-skills, foundational documents, tactical playbooks, and live examples.

### 1. [Cognitive Mastery](./meta-skills/cognitive-mastery.md)
> *“Think clearly under uncertainty.”*

| Meta-Skill | Link |
|------------|------|
| [First Principles Thinking](./meta-skills/first-principles-thinking.md) | Break down problems to fundamentals |
| [Decision-Making Under Uncertainty](./meta-skills/decision-making.md) | Act without full information |
| [Scenario Thinking](./meta-skills/scenario-thinking.md) | Anticipate multiple futures |
| [Feedback Calibration](./meta-skills/feedback-calibration.md) | Integrate signal without distortion |
| [Bayesian Updating](./meta-skills/bayesian-updating.md) | Revise beliefs based on evidence |

### 2. [Character Core](./meta-skills/character-core.md)
> *“Stand tall when it’s hard to.”*

| Meta-Skill | Link |
|------------|------|
| [Strategic Patience](./meta-skills/strategic-patience.md) | Wait with clarity |
| [Resilience](./meta-skills/resilience.md) | Recover and recommit |
| [Strength of Character](./meta-skills/strength-of-character.md) | Act with integrity under pressure |
| [Cognitive Decoupling](./meta-skills/cognitive-decoupling.md) | Think through emotion, not from it |
| [Execution with Reversibility](./meta-skills/execution-with-reversibility.md) | Move fast with optionality |

### 3. [Trust Dynamics](./meta-skills/trust-dynamics.md)
> *“Shape perception, build belief, and lead without mandate.”*

| Meta-Skill | Link |
|------------|------|
| [Trust-Building](./meta-skills/trust-building.md) | Be counted on under pressure |
| [Ability to Influence](./meta-skills/ability-to-influence.md) | Move people without power |
| [Narrative Framing](./meta-skills/narrative-framing.md) | Guide meaning and momentum |
| [Tribal Intelligence](./meta-skills/tribal-intelligence.md) | Read social signals and group norms |
| [Confidence Calibration](./meta-skills/confidence-calibration.md) | Express what you know—and what you don’t |

---

## 🧪 Practice Tools & Tactical Layers

### 🔍 Diagnostics
- [Cognitive Mastery Diagnostic](./evaluation-tools/cognitive-mastery-diagnostic.md)
- [Character Core Diagnostic](./evaluation-tools/character-core-diagnostic.md)
- [Trust Dynamics Diagnostic](./evaluation-tools/trust-dynamics-diagnostic.md)

### 🎮 Simulation Decks
- [Cognitive Mastery Scenarios](./scenario-templates/cognitive-scenarios.md)
- [Character Core Scenarios](./scenario-templates/character-scenarios.md)
- [Trust Dynamics Scenarios](./scenario-templates/trust-dynamics-scenarios.md)

### 📓 Field Notes
- [Cognitive Mastery Field Notes](./coaching-playbook/cognitive-field-notes.md)
- [Character Core Field Notes](./coaching-playbook/character-field-notes.md)
- [Trust Dynamics Field Notes](./coaching-playbook/trust-dynamics-field-notes.md)

### 👥 Role Playbooks
- [Engineering Playbook](./coaching-playbook/engineering/README.md)
- [Product Playbook](./coaching-playbook/product/README.md)
- [Operations Playbook](./coaching-playbook/operations/README.md)

### 🔁 Flywheel Case Studies
- [Cognitive Mastery Flywheel](./meta-skills/cognitive-flywheel-case.md)
- [Character Core Flywheel](./meta-skills/character-flywheel-case.md)
- [Trust Dynamics Flywheel](./meta-skills/trust-dynamics-flywheel-case.md)

---

## 🚀 Quick Start

```bash
git clone https://github.com/Avyayalaya/stratum.git
cd stratum
npm install

# Set your Anthropic API key (needed for Agentic Assessment)
cp .env.example .env
# edit .env and add your ANTHROPIC_API_KEY

node cli/index.js
```

---

## 🤖 Agentic Assessment (New)

The agentic mode replaces Likert self-rating with **behavioral evidence**. Instead of rating yourself 1–5, you answer real questions about real situations. Claude evaluates your answer against the skill rubric and returns a calibrated score + evidence summary.

**What you get:**
- A score profile across all 15 meta-skills (or 3 in quick mode)
- Role-weighted gap analysis (PM, Engineer, Operations, or General)
- A 4-week sprint plan with specific rituals pulled from the coaching playbook
- History saved to `~/.stratum/history.json` — tracks progress over time

**Why it's more accurate than self-rating:**
- Removes Dunning-Kruger inflation — your answer is the evidence, not your self-image
- Scores are calibrated against the same rubric across all people
- Evidence text becomes your coaching anchor in 1:1s

---



### During Hiring
- Apply the domain [Diagnostics](./evaluation-tools/cognitive-mastery-diagnostic.md) and [Scenario Decks](./scenario-templates/cognitive-scenarios.md) as advanced interview tools.
- Evaluate candidates against the [Meta-Skill Framework](./framework/overview.md) to surface strengths and gaps.

### Team Evaluation
- Run diagnostics regularly to measure progress and spot coaching opportunities.
- Debrief real projects using the flywheel case studies.
- Reinforce growth areas through the field notes and playbooks.

### Scaling Your Team
- Establish rituals from the playbooks so culture scales with headcount.
- Use meta-skill flywheels to onboard new hires quickly.
- Revisit diagnostics each quarter to keep hiring standards high.

---

## 👤 Author & License
Built by [Parth Sangani](https://www.linkedin.com/in/parthsangani/) — product leader, systems thinker, and leadership strategist.

Stratum is MIT licensed. Fork, remix, build teams with it, or integrate into your own coaching frameworks.


---

## 💬 Contributions & Feedback
If this framework helped you—or you’ve adapted it for your org, team, or portfolio—reach out. Open an issue, suggest an improvement, or drop a note.

> Every high-functioning team runs on invisible code. Stratum makes that code visible—and buildable.	

---

## Tags
`#stratum` `#leadership` `#meta-skills` `#team-building` `#decision-making` `#trust` `#clarity`
