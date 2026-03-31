---
name: "Stratum Meta-Skill Evaluation"
type: "codex"
version: "2.0.0"
tags: ["Evaluation", "Meta", "Context Engineering", "Hiring", "Team Composition", "Coaching"]
created: "2026-02-24"
valid_until: "2026-08-24"
derived_from: "shared/Chatgpt_transcript_Stratum.txt, agents/planner/playbooks/stratum-advisory-playbook.md, shared/context.md"
tested_with: ["Stratum CLI (Claude-powered)", "Facilitator-mediated advisory engagements"]
license: "MIT"
description: "Interactive protocol for guided hiring interviews, team composition analysis, and performance development using the Stratum meta-skill framework. Designed for progressive disclosure — AI reads the router first, determines the mode, then follows the workflow step-by-step, surfacing only what's needed at each step."
---

# Stratum Meta-Skill Evaluation — Interactive Protocol

> **AI INSTRUCTION:** Read ONLY Section 1 (Router) first. Do NOT read the Appendices until a workflow step tells you to. This file is designed for progressive disclosure — loading everything upfront defeats the purpose.

---

## Section 1: Router

**Read this section first. Ask these questions. Then follow the workflow.**

### Step 1: Determine Mode

Ask the user:

> "What are you trying to do?"
> - **A) Hire someone** — you're interviewing a candidate for a specific role
> - **B) Diagnose a team** — you have an existing team and want to find blind spots, conflict risks, or figure out who to hire next
> - **C) Develop someone** — you want to assess an individual for coaching and build a growth plan

Map their answer:
- A → **Workflow H** (Hiring Interview)
- B → **Workflow T** (Team Composition)
- C → **Workflow D** (Performance Development)

If they're unsure, ask: *"Do you have a specific candidate in front of you, or are you looking at a team?"* Candidate → H. Team → T. Neither (just one person, already on the team) → D.

### Step 2: Determine Function and Level

Ask:

> "What function is this role/person in?"

Present the options conversationally — don't dump a table:
- Product Management
- Software Engineering
- Design (Product/UX)
- Data Science / ML
- Sales / Business Development
- Marketing
- Operations / Supply Chain
- People / HR
- Finance / Strategy
- General Management / Chief of Staff
- Founder / CEO

Then ask:

> "What level?"

- **IC** (individual contributor, early career)
- **Senior IC** (experienced, autonomous, influences without managing)
- **Manager** (manages people directly)
- **Director** (manages managers, owns a portfolio)
- **VP** (shapes org-level strategy)
- **C-Suite** (enterprise + external, board-level)

**Now you have: Mode + Function + Level.** Go to the relevant workflow.

---

## Section 2: Workflow H — Hiring Interview

> **Purpose:** Guide an interviewer through assessing a candidate for a specific role. Surface only the skills that matter for THIS function×level. One question at a time.

### H1. Load the Assessment Kit

Read **Appendix C** to find the function profile. Note:
- **Defining skills** (weight 3.0) — these are the non-negotiables
- **Critical skills** (weight 2.0) — expected at high proficiency
- **Gate skills** from **Appendix E** for this function×level — scoring ≤2 here is a hard no

Build the assessment list:
1. All gate skills for this function×level (from Appendix E)
2. All defining skills (from Appendix C)
3. All critical skills (from Appendix C)

Remove duplicates. This typically yields 5–8 skills. Tell the user:

> "For a [Level] [Function], I'll assess [N] meta-skills. These are the ones that most differentiate great from average in this role. Ready to start?"

Do NOT list all the skills upfront. Just say how many and start.

### H2. Run the Assessment (One Skill at a Time)

For each skill in the assessment list:

1. Read that skill's entry from **Appendix A** (question, probes, red flag)
2. Present ONLY the primary question to the user. Example:

   > "**Skill 1 of 6: Decision-Making Under Uncertainty**
   > Ask the candidate: *'Describe a high-stakes decision you made with incomplete information. Walk me through it.'*"

3. After the user reports the candidate's answer, evaluate it:
   - Does it contain a **specific Situation, Action, and Outcome**? → Score 4–5
   - Is it a general claim with some evidence? → Score 3–4
   - Is it a trait claim ("I'm good at this") with no story? → Score 2
   - Did they deflect or have no answer? → Score 1

4. If the answer is terse or a trait claim, suggest the probe questions from Appendix A:

   > "That answer was thin. Try probing: *'What did you know vs. guess? How did you know when you had enough to decide?'*"

5. Present your score and brief rationale to the user. Ask if they agree or want to adjust.

6. If score ≤ 3, classify the **mode** (from Appendix B — Mode Classification):
   - `demonstrated` / `partial` / `avoidance` / `trait_claim` / `insufficient`
   - Tell the user what this means in one sentence

7. **Gate check:** If this is a gate skill and score ≤ 2, flag it immediately:

   > "⚠️ This is a gate skill for [Level] [Function]. A score of [X] is a hard no — no other strength compensates. Continue assessment for development feedback, or stop here?"

8. Move to the next skill. Repeat.

### H3. Generate the Hiring Recommendation

After all skills are assessed:

1. **Gate check summary:** List any gate skill failures. If any → recommend No Hire with rationale.

2. **Calculate gap scores** using the formula from **Appendix D**:
   - $W_{final} = W_{function} \times M_{level}$
   - $G = (5 - S) \times W_{final}$
   - Sort descending

3. Present a concise scorecard:

   > **Candidate Scorecard: [Role]**
   > | Skill | Score | Weight | Gap | Mode |
   > |-------|-------|--------|-----|------|
   > *(only assessed skills, sorted by gap descending)*
   >
   > **Gate Skills:** ✅ All passed / ❌ Failed: [list]
   > **Top Strength:** [Highest score with best evidence]
   > **Top Development Area:** [Highest weighted gap]
   > **Recommendation:** Hire / No Hire / Conditional (explain)

4. If Hire or Conditional, provide the **onboarding flag**: "In the first 90 days, watch for [top gap skill] — this is where this person will need support."

---

## Section 3: Workflow T — Team Composition

> **Purpose:** Analyze an existing team's meta-skill coverage. Find blind spots, conflict risks, and complementary strengths. Recommend who to hire next.

### T1. Collect the Roster

Ask:

> "List your team members with their function and level. Just names and roles — I'll assess each one."

Example format: "Jane — Senior PM, Alex — IC Engineer, Sam — Design Manager"

Record all members.

### T2. Quick-Assess Each Member

For each team member, run an **abbreviated assessment.** You have two options — ask the user:

> "Do you want to run a full behavioral assessment for each person (takes ~10 min each), or do you want to give me your best estimate of each person's skill levels based on what you've observed? Estimate is faster but less precise."

**Option A: Manager Estimate** (faster)
- For each person, go through the 15 skills and ask the manager to rate 1–5 based on observed behavior
- Apply the **evidence quality check**: for any score of 4+, ask "Can you describe a specific situation where [Name] demonstrated this?" If they can't → downgrade to 3
- This takes ~3 min per person

**Option B: Full Assessment** (more accurate)
- Run Workflow H steps H2 for each person (but adapted — you're assessing observed behavior, not interviewing the person directly)
- This takes ~10 min per person

### T3. Generate the Team Heatmap

Once all members are scored:

1. Build a skill × member matrix:

   > | Skill | Jane (Sr PM) | Alex (IC Eng) | Sam (Design Mgr) |
   > |-------|:---:|:---:|:---:|
   > | First Principles | 4 | 5 | 3 |
   > | Decision Under Uncertainty | 5 | 3 | 3 |
   > | ... | ... | ... | ... |

2. Color-code mentally (describe to user):
   - 5 = team anchor (this person can mentor others)
   - 4 = solid coverage
   - 3 = adequate but not a strength
   - ≤2 = gap

### T4. Run Team Diagnostics

Read **Appendix F** (Team Patterns). Apply the following checks:

**Coverage Check:**
> "Does at least one person score 4+ in each of the three domains?"
- If no domain has a 4+ → critical structural gap

**Blind Spot Detection:**
> "Which skills have NO ONE above 3?"
- List these as structural blind spots
- Provide the diagnosis from the Blind Spot Patterns table

**Conflict Risk Pairs:**
> "Which specific PEOPLE (not just skills) create friction risk?"
- Cross-reference the conflict risk pair patterns against actual team members
- "Jane (low Cognitive Decoupling) + Alex (low Trust-Building) = interpersonal explosions under stress"

**Complementary Strengths:**
> "Which pairings accelerate the team?"
- "Jane (high Influence) + Sam (high Narrative Framing) = strategic storytelling pair"

### T5. Generate the Hiring Recommendation

> "Based on your team's profile, your next hire should be screened for: **[top 2–3 blind spot skills]**."
> "If you're hiring a [most likely function], here are the specific behavioral questions to use: [pull from Appendix A]"
> "The minimum viable profile for this hire: must score ≥ 3 on [blind spot skills] and meet all gate skills for [function×level]."

---

## Section 4: Workflow D — Performance Development

> **Purpose:** Assess one person for coaching and build a calibrated 90-day growth plan.

### D1. Identify the Person

Ask:
> "Who are you developing? What's their function and level?"

Also ask:
> "What's the presenting problem — why are you investing in their development now? What's not working?"

The presenting problem anchors the entire assessment. Without it, you're generating generic scores.

### D2. Run Full Assessment

Assess all 15 skills using Workflow H Step H2 (one skill at a time, with probes, scoring, and mode classification).

**Critical difference from hiring:** In development mode, mode classification matters MORE than scores. Two people with a score of 2 need completely different interventions:
- `trait_claim` → they need behavioral practice and feedback loops
- `avoidance` → they need to accept the gap before they can develop — hardest to coach
- `insufficient` → they may have the skill but can't access it — try scenario-based assessment

Tell the user the mode and what it means after each low score.

### D3. Connect to the Presenting Problem

After scoring all 15 skills, connect the findings to the problem the manager described:

> "You said [Name] struggles with [presenting problem]. Here's what the assessment shows:"
> - "Their lowest weighted gaps are [X, Y, Z] — and [X] directly explains the pattern you described."
> - "The mode is [avoidance/trait_claim/insufficient] — which means [specific coaching implication]."

This is the moment the assessment becomes useful. Generic gap lists don't change anyone's behavior. Connecting the gap to the presenting problem does.

### D4. Generate the 90-Day Sprint Plan

1. Calculate role-weighted gaps using **Appendix D** (function base × level modifier)
2. Select the **top 3 gaps** — but weight the presenting problem. If the presenting problem maps to gap #4 by math but it's what the manager cares about, elevate it.
3. For each gap, generate:

   > **Development Target: [Skill Name]**
   > - **Current score:** [X] | **Mode:** [mode]
   > - **Why this matters for a [Level] [Function]:** [one sentence from function profile]
   > - **Behavioral target:** [specific observable behavior to develop]
   > - **Practice context:** [where in their daily work they can practice this]
   > - **Success signal:** [what would a 4 look like — from Appendix B scoring rubric]
   > - **Check-in cadence:** [weekly 1:1 topic, monthly review]

4. Set the re-assessment date (90 days).

### D5. Deliver to the Manager

Present the plan in coaching language, not evaluation language:

> "This isn't a report card. It's a map of where [Name] will get the highest ROI from development effort. The math says [Skill X] matters most for their function×level, and it directly connects to what you told me isn't working."

---

## Appendix A: The 15 Meta-Skills — Questions, Probes, and Red Flags

> **AI INSTRUCTION:** Do not read this appendix upfront. Pull individual entries as needed during assessment.

### Cognitive Mastery

**CM-1: First Principles Thinking**
- **Definition:** Break problems to atomic truths and rebuild from scratch.
- **Question:** "Tell me about a time you had to solve a problem no one had solved before. How did you approach it?"
- **Probes:** "What assumptions did you question?" / "How did you decide what was fundamental vs. inherited convention?"
- **Red flag:** They describe following an existing playbook without questioning it.

**CM-2: Decision-Making Under Uncertainty**
- **Definition:** Act decisively with incomplete, conflicting, or ambiguous data.
- **Question:** "Describe a high-stakes decision you made with incomplete information. Walk me through it."
- **Probes:** "What did you know vs. guess?" / "How did you know when you had enough to decide?"
- **Red flag:** They waited for perfect information or deferred entirely.

**CM-3: Scenario Thinking**
- **Definition:** Mentally simulate multiple futures before committing.
- **Question:** "When planning something complex, how do you prepare for things going wrong?"
- **Probes:** "Give me a specific example where you mapped multiple possible outcomes." / "What early signals were you watching?"
- **Red flag:** They planned for only the happy path.

**CM-4: Feedback Calibration**
- **Definition:** Extract signal from noise and iterate without ego.
- **Question:** "Tell me about feedback that changed how you approached something."
- **Probes:** "How quickly did you act on it?" / "Was there feedback you initially disagreed with but later accepted?"
- **Red flag:** Defensiveness, or no concrete example of iteration.

**CM-5: Bayesian Updating**
- **Definition:** Revise beliefs proportionally to new evidence.
- **Question:** "Describe a situation where your initial belief turned out to be wrong. What did you do?"
- **Probes:** "How did you decide how much to adjust?" / "Did you over-correct or under-correct?"
- **Red flag:** They anchored rigidly or swung 180° without reasoning.

### Character Core

**CC-1: Strategic Patience**
- **Definition:** Delay action deliberately when timing isn't right.
- **Question:** "Tell me about a time when waiting — not acting — led to a better outcome."
- **Probes:** "How did you manage pressure to move faster?" / "How did you distinguish patience from avoidance?"
- **Red flag:** Can't separate inaction from intentional delay.

**CC-2: Resilience**
- **Definition:** Bounce forward from failure with clarity, not just endurance.
- **Question:** "Tell me about a significant professional setback. What did you do in the first 72 hours?"
- **Probes:** "How did you restore energy and clarity?" / "What did you learn that you still apply?"
- **Red flag:** Story is about enduring, not recovering and growing.

**CC-3: Strength of Character**
- **Definition:** Hold values and integrity when it's inconvenient or costly.
- **Question:** "When have you made a decision you knew would be unpopular but believed was right?"
- **Probes:** "What did it cost you?" / "Would you do it again?"
- **Red flag:** They describe policy compliance, not independent moral judgment.

**CC-4: Cognitive Decoupling**
- **Definition:** Separate emotion from reasoning in moments of tension.
- **Question:** "Describe a moment when you felt triggered at work. How did you handle it?"
- **Probes:** "What was the gap between your first impulse and actual response?" / "How do others experience you in tense moments?"
- **Red flag:** They claim they "never get emotional" (self-awareness gap).

**CC-5: Execution with Reversibility**
- **Definition:** Move boldly while preserving the ability to adapt or reverse.
- **Question:** "Tell me about a bold move you made that had a built-in exit plan."
- **Probes:** "How did you design the reversibility?" / "Did you end up needing it?"
- **Red flag:** They shipped something irreversible without considering failure paths.

### Trust Dynamics

**TD-1: Trust-Building**
- **Definition:** Create psychological safety, consistency, and dependability.
- **Question:** "How do you build trust with someone who doesn't know you yet — in a high-stakes context?"
- **Probes:** "What's the difference between being liked and being trusted?" / "Tell me about a time trust broke."
- **Red flag:** They describe trust as a personality trait, not behaviors.

**TD-2: Ability to Influence**
- **Definition:** Shape decisions and direction without formal authority.
- **Question:** "Describe a time you shifted a decision without having authority."
- **Probes:** "How did you sequence the buy-in?" / "What resistance did you face?"
- **Red flag:** They escalated instead of influencing, or it "just happened."

**TD-3: Narrative Framing**
- **Definition:** Guide perception and alignment through story, not spin.
- **Question:** "Tell me about a time you reframed a negative outcome into something productive."
- **Probes:** "What story did you tell — and to whom?" / "How did it change energy or direction?"
- **Red flag:** Spin rather than genuine sense-making.

**TD-4: Tribal Intelligence**
- **Definition:** Read and navigate invisible group dynamics, loyalty, and power.
- **Question:** "Describe entering a politically sensitive environment. What did you observe first?"
- **Probes:** "How did you figure out who held real influence?" / "How did you adapt to different groups?"
- **Red flag:** They treated every stakeholder identically, missing group dynamics.

**TD-5: Confidence Calibration**
- **Definition:** Signal certainty level clearly so others can trust your weight.
- **Question:** "When have you said 'I don't know' in a high-stakes meeting?"
- **Probes:** "How do you signal confidence without overstating certainty?" / "How do you make it easy for others to calibrate your input?"
- **Red flag:** They perform certainty on everything, or hide behind false humility.

---

## Appendix B: Scoring Rubric and Mode Classification

> **AI INSTRUCTION:** Reference during scoring. Do not present the full rubric to the user — use it to justify your scores.

### Score Scale (1–5)

| Score | Label | Evidence Standard |
|-------|-------|-------------------|
| 5 | **Demonstrated** | Specific situation, clear actions, measurable outcome. Would mentor others. |
| 4 | **Partial** | Good evidence but incomplete — missing outcome or context depth. |
| 3 | **Developing** | Shows awareness and some practice, limited complexity or stakes. |
| 2 | **Trait Claim** | Claims the skill but provides no behavioral evidence. |
| 1 | **Insufficient / Avoidance** | Cannot provide an example, deflects, or describes opposite behavior. |

### Mode Classification (for scores ≤3)

| Mode | Pattern | Intervention |
|------|---------|-------------|
| `demonstrated` | Specific, detailed behavioral story | Maintain and leverage |
| `partial` | Some evidence, incomplete story | Coaching + practice |
| `avoidance` | Deflects, generalizes, changes subject | Hardest — requires acceptance first |
| `trait_claim` | "I'm decisive" / "I'm resilient" with no story | Behavioral practice + feedback loops |
| `insufficient` | Can't provide any example | Probing + scenario-based follow-up |

**Critical distinction:** `trait_claim` and `insufficient` produce the same score but require completely different interventions.

---

## Appendix C: Function Profiles

> **AI INSTRUCTION:** Look up the relevant function when the user identifies the role. Only load the matching profile.

Each profile lists Defining (3.0), Critical (2.0), and Important (1.5) skills. Unlisted skills = Baseline (1.0).

### Product Management
| Tier | Skills | Rationale |
|------|--------|-----------|
| **Defining (3.0)** | Decision Under Uncertainty, Influence | PMs make calls with incomplete data. They own no execution — only influence. |
| **Critical (2.0)** | Scenario Thinking, Narrative Framing, Bayesian Updating | Plan multiple futures, sell the vision, update when signals change. |
| **Important (1.5)** | Feedback Calibration, First Principles, Tribal Intelligence | Iterate, reason from fundamentals, read org dynamics. |

*Failure archetype:* High Cognitive + low Trust = brilliant strategy no one executes. High Trust + low Cognitive = loved, product goes nowhere.

### Software Engineering
| Tier | Skills | Rationale |
|------|--------|-----------|
| **Defining (3.0)** | First Principles, Feedback Calibration | Solve novel problems and iterate through code review. |
| **Critical (2.0)** | Execution w/ Reversibility, Decision Under Uncertainty | Ship boldly with rollback paths. Decide vs. prototype. |
| **Important (1.5)** | Bayesian Updating, Confidence Calibration | Update technical beliefs. Signal certainty in design reviews. |

*Failure archetype:* High First Principles + low Feedback Cal = brilliant but unteachable. High Execution + low First Principles = fast shipper of wrong solutions.

### Design (Product / UX)
| Tier | Skills | Rationale |
|------|--------|-----------|
| **Defining (3.0)** | Feedback Calibration, Narrative Framing | Designers live in critique. Every design is a story about how something works. |
| **Critical (2.0)** | First Principles, Influence | Break conventions when warranted. Sell decisions to PMs/engineers. |
| **Important (1.5)** | Scenario Thinking, Resilience, Cognitive Decoupling | Map user paths, survive design kills, take harsh critique. |

*Failure archetype:* High Narrative + low Feedback Cal = beautiful work that never iterates. High Feedback Cal + low First Principles = iterates endlessly without conviction.

### Data Science / ML
| Tier | Skills | Rationale |
|------|--------|-----------|
| **Defining (3.0)** | First Principles, Bayesian Updating | Data work IS reasoning from evidence and updating beliefs. |
| **Critical (2.0)** | Confidence Calibration, Feedback Calibration | Communicating uncertainty honestly = useful vs. dangerous ML. |
| **Important (1.5)** | Decision Under Uncertainty, Scenario Thinking, Narrative Framing | Decide what to model, plan for failure, explain to non-technical audiences. |

*Failure archetype:* High First Principles + low Confidence Cal = rigorous but no one trusts outputs. High Narrative + low Bayesian = compelling stories on stale models.

### Sales / Business Development
| Tier | Skills | Rationale |
|------|--------|-----------|
| **Defining (3.0)** | Influence, Trust-Building, Resilience | Sales is trust, persuasion, and handling daily rejection. |
| **Critical (2.0)** | Tribal Intelligence, Confidence Calibration, Strategic Patience | Read buyer politics, calibrate conviction, time the close. |
| **Important (1.5)** | Narrative Framing, Scenario Thinking, Decision Under Uncertainty | Frame value, anticipate objections, pick deals. |

*Failure archetype:* High Influence + low Trust = closes deals that churn. High Resilience + low Tribal Intel = keeps knocking on wrong door.

### Marketing
| Tier | Skills | Rationale |
|------|--------|-----------|
| **Defining (3.0)** | Narrative Framing, Bayesian Updating | Marketing = story + measurement. Tell the right story, kill stories that don't work. |
| **Critical (2.0)** | Influence, Scenario Thinking | Influence without authority. Plan campaigns for multiple outcomes. |
| **Important (1.5)** | Feedback Calibration, Execution w/ Reversibility, First Principles | Iterate creative, launch with rollback, question category conventions. |

*Failure archetype:* High Narrative + low Bayesian = brilliant campaigns that keep running after they stop working.

### Operations / Supply Chain
| Tier | Skills | Rationale |
|------|--------|-----------|
| **Defining (3.0)** | Execution w/ Reversibility, Decision Under Uncertainty | Run systems. Ship changes without breaking production. Decide fast. |
| **Critical (2.0)** | Scenario Thinking, First Principles, Cognitive Decoupling | Plan for failure modes, challenge processes, stay calm when systems break. |
| **Important (1.5)** | Strategic Patience, Trust-Building, Confidence Calibration | Wait to restructure, build cross-functional trust, signal certainty in crises. |

*Failure archetype:* High Execution + low Scenario = fast but blindsided. High Scenario + low Execution = plans everything, ships nothing.

### People / HR
| Tier | Skills | Rationale |
|------|--------|-----------|
| **Defining (3.0)** | Trust-Building, Strength of Character, Cognitive Decoupling | HR is trust infrastructure. Hard calls about people while staying regulated. |
| **Critical (2.0)** | Influence, Tribal Intelligence, Narrative Framing | Shape policy without owning business. Navigate politics. Frame difficult messages. |
| **Important (1.5)** | Feedback Calibration, Decision Under Uncertainty, Resilience | Give honest feedback. Make judgment calls. Recover from org crises. |

*Failure archetype:* High Trust + low Character = liked, can't make tough calls. High Character + low Tribal Intel = principled decisions that get reversed.

### Finance / Strategy
| Tier | Skills | Rationale |
|------|--------|-----------|
| **Defining (3.0)** | Decision Under Uncertainty, Bayesian Updating | High-stakes, data-driven decisions. Your P&L updates daily. |
| **Critical (2.0)** | Scenario Thinking, Strength of Character, Confidence Calibration | Model futures. Say no to bad deals. Signal risk levels precisely. |
| **Important (1.5)** | First Principles, Cognitive Decoupling, Narrative Framing | Challenge models. Stay calm in volatility. Explain strategy to the board. |

*Failure archetype:* High Decision + low Character = large bets with others' money, rationalized risk.

### General Management / Chief of Staff
| Tier | Skills | Rationale |
|------|--------|-----------|
| **Defining (3.0)** | Influence, Narrative Framing, Trust-Building | GMs are connective tissue. Succeed through alignment, fail through misalignment. |
| **Critical (2.0)** | Cognitive Decoupling, Decision Under Uncertainty, Tribal Intelligence | Stay regulated, decide quickly, read every room. |
| **Important (1.5)** | Scenario Thinking, Strategic Patience, Resilience | Plan across timelines, hold timing, bounce back. |

*Failure archetype:* High Influence + low Cognitive Decoupling = persuasive but volatile.

### Founder / CEO
| Tier | Skills | Rationale |
|------|--------|-----------|
| **Defining (3.0)** | Decision Under Uncertainty, Resilience, Influence | Maximum ambiguity, maximum adversity, must recruit with no credibility. |
| **Critical (2.0)** | First Principles, Bayesian Updating, Execution w/ Reversibility, Narrative Framing | Challenge assumptions, pivot on signals, ship with rollback, sell the vision. |
| **Important (1.5)** | Strength of Character, Strategic Patience, Tribal Intelligence, Confidence Calibration | Hold ethics, play long games, navigate investors, signal certainty levels. |

*Failure archetype:* High Decision + low Bayesian = decisive but stubborn when market says pivot. High Resilience + low Influence = survives but can't recruit others to survive with them.

---

## Appendix D: Weight Calculation and Level Modifiers

> **AI INSTRUCTION:** Use this appendix when calculating gap scores. Do not present the raw tables to the user — show them the result.

### Combined Weight Formula

$$W_{final} = W_{function} \times M_{level}$$

Where:
- $W_{function}$ = base weight from Appendix C (Defining = 3.0, Critical = 2.0, Important = 1.5, unlisted = 1.0)
- $M_{level}$ = level modifier from the table below

### Gap Score

$$G = (5 - S) \times W_{final}$$

Sort all gap scores descending. **Top 3 = 90-day development sprint.** Top 5 = annual plan.

**Hiring threshold:** Any skill with $W_{final} \geq 4.0$ scoring ≤ 2 is a **hard no**.

### Level Modifiers

The universal pattern: as level rises, the operating surface shifts from Person↔Problem toward Person↔People.

| Skill | IC | Sr IC | Mgr | Dir | VP | C-Suite | Logic |
|-------|----|-------|-----|-----|-----|---------|-------|
| CM-1 First Principles | 1.0 | 1.2 | 1.0 | 0.9 | 1.0 | 1.2 | Peaks at Sr IC, dips at Mgr (enabling > solving), returns at C-Suite |
| CM-2 Decision Under Uncertainty | 1.0 | 1.2 | 1.3 | 1.5 | 1.8 | 2.0 | Monotonic — stakes and ambiguity rise at every level |
| CM-3 Scenario Thinking | 0.8 | 1.0 | 1.2 | 1.5 | 1.8 | 2.0 | Minimal at IC, defining at VP+ |
| CM-4 Feedback Calibration | 1.2 | 1.2 | 1.0 | 0.8 | 0.8 | 0.8 | Peaks at IC/Sr IC, decreases (you give more than receive) |
| CM-5 Bayesian Updating | 0.8 | 1.0 | 1.0 | 1.2 | 1.5 | 1.8 | Low at IC, critical at C-Suite (market signal → strategy pivots) |
| CC-1 Strategic Patience | 0.5 | 0.8 | 1.0 | 1.2 | 1.5 | 2.0 | IC can be impatient productively; C-Suite timing IS strategy |
| CC-2 Resilience | 1.0 | 1.0 | 1.2 | 1.2 | 1.5 | 1.8 | Failures get more visible and costly at every level |
| CC-3 Strength of Character | 0.8 | 1.0 | 1.2 | 1.5 | 1.8 | 2.5 | At C-Suite, your integrity IS the institution |
| CC-4 Cognitive Decoupling | 0.8 | 1.0 | 1.5 | 1.5 | 1.8 | 2.0 | Jumps at Mgr — can't explode at reports |
| CC-5 Execution w/ Reversibility | 1.2 | 1.2 | 1.0 | 1.0 | 1.2 | 1.0 | Highest at IC/Sr IC, dips at middle mgmt, returns at VP |
| TD-1 Trust-Building | 0.8 | 1.0 | 1.8 | 1.8 | 2.0 | 2.0 | Jumps at Mgr — you cannot manage without trust |
| TD-2 Influence | 0.5 | 0.8 | 1.2 | 1.5 | 2.0 | 2.5 | Low at IC, defining at VP+ |
| TD-3 Narrative Framing | 0.5 | 0.8 | 1.0 | 1.5 | 2.0 | 2.5 | Irrelevant at IC, defining at C-Suite |
| TD-4 Tribal Intelligence | 0.3 | 0.5 | 1.0 | 1.5 | 2.0 | 2.5 | Near-zero at IC, accelerates steeply |
| TD-5 Confidence Calibration | 0.8 | 1.0 | 1.2 | 1.5 | 1.8 | 2.0 | Higher you go, more people calibrate on your signal |

---

## Appendix E: Minimum Viable Profiles — Hire/No-Hire Gates

> **AI INSTRUCTION:** Check gate skills FIRST before running the full assessment. A gate failure at ≤ 2 is a hard no.

Gates are **cumulative**: Manager gates include all IC gates + additions. Director+ includes all prior.

| Function | IC Gate Skills | + Manager | + Director+ |
|----------|---------------|-----------|-------------|
| **Product** | Decision Under Uncertainty, First Principles | Influence, Narrative Framing | Scenario Thinking, Tribal Intelligence |
| **Engineering** | First Principles, Feedback Calibration | Trust-Building, Cognitive Decoupling | Decision Under Uncertainty, Confidence Calibration |
| **Design** | Feedback Calibration, First Principles | Influence, Narrative Framing | Resilience, Trust-Building |
| **Data/ML** | First Principles, Bayesian Updating | Confidence Calibration, Narrative Framing | Decision Under Uncertainty, Influence |
| **Sales** | Resilience, Trust-Building | Influence, Tribal Intelligence | Strategic Patience, Narrative Framing |
| **Marketing** | Narrative Framing, Feedback Calibration | Bayesian Updating, Influence | Scenario Thinking, Decision Under Uncertainty |
| **Operations** | Execution w/ Reversibility, Decision Under Uncertainty | Scenario Thinking, Cognitive Decoupling | Trust-Building, Strategic Patience |
| **People/HR** | Trust-Building, Cognitive Decoupling | Strength of Character, Influence | Tribal Intelligence, Narrative Framing |
| **Finance** | Decision Under Uncertainty, Bayesian Updating | Strength of Character, Scenario Thinking | Confidence Calibration, Narrative Framing |
| **Gen. Mgmt** | Influence, Trust-Building | Cognitive Decoupling, Narrative Framing | Tribal Intelligence, Strategic Patience |
| **Founder** | Decision Under Uncertainty, Resilience, Influence | *(N/A)* | First Principles, Bayesian Updating, Strength of Character |

**Universal gate:** Manager+ scoring ≤ 2 on Trust-Building = hard no regardless of function.

---

## Appendix F: Team Composition Patterns

> **AI INSTRUCTION:** Use during Workflow T only.

### Blind Spot Patterns

| Pattern | Diagnosis |
|---------|-----------|
| High Cognitive + Low Trust | Smart people who can't collaborate |
| High Character + Low Cognitive | Principled people who make poor decisions |
| High Trust + Low Character | Likeable people who fold under pressure |
| Low Feedback Cal across team | Culture suppresses honest feedback |
| Low Scenario Thinking across team | Plans for only the happy path |

### Conflict Risk Pairs

| Pair | Risk |
|------|------|
| Low Trust-Building + Low Cognitive Decoupling | Interpersonal explosions under stress |
| Low Confidence Calibration + High Influence | Persuasive but unreliable signal |
| Low First Principles + High Narrative Framing | Compelling stories built on weak logic |

### Complementary Strengths

| Pair | Leverage |
|------|---------|
| High First Principles + High Narrative Framing | One sees truth, the other communicates it |
| High Resilience + High Strategic Patience | One recovers, the other holds timing |
| High Tribal Intelligence + High Influence | One maps the terrain, the other moves through it |

---

## Appendix G: Failure Modes

> **AI INSTRUCTION:** Self-check against these after completing any assessment. If you detect a failure mode in your own scoring, flag it to the user.

**FM-1: Likert Collapse** — All scores cluster 3–4. Detection: SD < 0.8 across 15 skills. Fix: re-score with evidence quality gate.

**FM-2: Trait Claim Acceptance** — High scores for "I'm very resilient" with no story. Fix: probe or downgrade to 2.

**FM-3: Domain Conflation** — Cognitive skills rated on interpersonal performance. "Sounding smart" is Narrative Framing, not First Principles.

**FM-4: Anti-Grit Blindness** — Resilience score based on endurance, not recovery. Ask "What changed?" If nothing → grit, not resilience.

**FM-5: Halo Effect** — One strong domain inflates others. Fix: score domains independently.

**FM-6: Dunning-Kruger** — Self-report shows no gaps. Fix: never use self-report as primary; always require behavioral evidence.

**FM-7: Assessment Fatigue** — Later skills score lower regardless. Fix: randomize skill order, break at domain boundaries.

---

## Appendix H: Stress Tests

> **AI INSTRUCTION:** After building any scorecard, verify against these. If a result fails a stress test, re-examine the weights.

| Test | Expected Result |
|------|----------------|
| IC Engineer scores 2 on Tribal Intelligence | Low priority ($G < 2.0$) |
| VP Engineering scores 2 on Tribal Intelligence | Top-3 gap ($G > 5.0$) |
| IC Sales scores 2 on First Principles | Low-medium ($G < 3.0$) |
| Senior PM scores 2 on Decision Under Uncertainty | Hard no / top-1 ($G > 7.0$) |
| Director HR scores 5 on First Principles | Not flagged as strength ($W_{final} < 2.0$) |
| Founder scores 3 on Resilience | Critical ($G > 6.0$) |
| Manager (any function) scores 2 on Trust-Building | Hard no |
| C-Suite scores 3 on Strength of Character | Critical ($G > 5.0$) |
| IC Designer scores 2 on Influence | Low ($G < 2.5$) |
| VP Designer scores 2 on Influence | Top-3 ($G > 5.0$) |
