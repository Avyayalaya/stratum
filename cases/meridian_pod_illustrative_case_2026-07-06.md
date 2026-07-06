# Case Study — The Meridian Pod (Illustrative)

> **This is an illustrative case, not a real client.** The team below is fictional —
> a designed stress-test of the framework, the same "Nova AI / Meridian" pod used in
> `cli/simulate.js`. The scores are hand-authored to probe specific failure modes, not
> collected from real assessments. Regenerate the reports with `node cli/generate-samples.js`.
>
> Reports: [individual (Maya Chen)](../reports/sample_report_maya_chen_2026-07-06.html) ·
> [team](../reports/sample_team_report_meridian_2026-07-06.html)

---

## The team

A four-person product pod at a (fictional) Series-C AI company, six months from a
traction milestone. Each member is built to test one thing Stratum should or shouldn't catch.

| Member | Role · Level | Shape | Probes |
|--------|--------------|-------|--------|
| **Maya Chen** | PM · Executive | Brilliant strategist, burns trust | Does a high average hide a disqualifying gap? |
| **Devin Osei** | Engineer · Manager | Strong cognitively, fragile under pressure | Does the framework separate thinking from composure? |
| **Priya Nair** | Operations · Manager | Deeply trusted, thin on rigor | Is warmth mistaken for capability? |
| **Sam Ree** | PM · IC | Solid generalist, no spikes | Does an even profile read as "fine"? |

---

## The headline: Maya Chen

Maya's overall score is **3.7 / 5** — the kind of number a naive "average the interview"
process waves through. Stratum does not.

- Two skills flag red: **Trust-Building 1/5** (a *trait claim* — "my track record builds
  trust," no example of building it) and **Tribal Intelligence 1/5** (an *avoidance*
  pattern — two engineers asked to transfer; she reads peer feedback as noise).
- Because she is assessed at **Executive** level, the Trust-domain band (×1.5) pushes those
  exact gaps to the **top of her development priorities**: Trust-Building, Tribal
  Intelligence, Confidence Calibration. At IC level the same scores would rank lower; at the
  level she actually operates, they are the whole story.

This is the case the framework exists for: **a strong average concealing a gap that gets
more disqualifying the more senior the seat.** The report says so on its face — the risk
flags sit next to the 3.7, not buried under it.

---

## The team readout

**Domain averages** — Cognitive ~3.5, Character 3.2, Trust 3.2. Weakest: Trust Dynamics
(tied with Character).

**No blind spots.** Every one of the 15 skills has at least one person scoring ≥4 — the
team can *anchor* each capability. That is the good news, and it is easy to stop there.

**The fragility the heatmap shows underneath it:** the person who anchors Trust (Priya, 5/5)
is the weakest on cognitive rigor (First Principles 2/5), and the people who anchor cognitive
rigor (Maya, Devin) are the weakest on Trust. Rigor and trust live in different people who
don't overlap. The **Complementary Strengths** map turns that into mentoring paths — Priya
coaches Maya on Trust-Building; Maya coaches Priya on First Principles — but if either leaves,
a whole domain goes with them.

**Hiring recommendation (from the tool):** next hire screened for **Trust Dynamics** — the
weakest team domain — not for another strong cognitive profile the pod already has twice.

---

## An honest limitation this case exposes

The team report's **Conflict Risk** heuristic flagged *nothing* — because it only fires when
**both** people in a pair score low (both low on Trust-Building, both low on Cognitive
Decoupling, etc.). Maya's risk is *solo*: one person low on trust among three who are fine.
The pairwise rule misses it. The individual risk flags catch her; the pair heuristic doesn't.

The lesson is the framework's own stance (see [`ledger/gate_skills.md`](../ledger/gate_skills.md)):
these are **structured judgment aids, not verdicts.** A real assessor reads the individual
flags and the heatmap together and does not outsource the call to a pairwise rule.

---

## What this case demonstrates

1. Level and domain weighting do real work — Maya's trust gaps rank where they should *because*
   she's assessed at Executive level (the coarse 3×3 bands from `cli/roadmap.js`).
2. "No blind spots" is not "no risk" — coverage can hide single-person dependency.
3. The framework surfaces; the human decides. The tool flags Maya, maps the mentoring, and
   names the next hire — it does not issue a hire/no-hire verdict.

## Caveats

Illustrative scores; single-rater; not validated against outcome data. Every scoring and
weighting choice, with its supporting **and** counter-evidence, is in the
[Evidence Ledger](../ledger/). Treat the output as a structured conversation starter, not a
prediction.
