// Role weights: higher weight = this skill matters MORE for this role.
// Lower weighted score = bigger priority gap for that person.
export const ROLE_WEIGHTS = {
  'Product Manager': {
    'First Principles Thinking': 1.3,
    'Decision-Making Under Uncertainty': 1.3,
    'Narrative Framing': 1.2,
    'Ability to Influence': 1.2,
    'Feedback Calibration': 1.1,
    'Trust-Building': 1.1,
  },
  'Engineer': {
    'First Principles Thinking': 1.3,
    'Bayesian Updating': 1.3,
    'Execution with Reversibility': 1.2,
    'Feedback Calibration': 1.2,
    'Scenario Thinking': 1.1,
  },
  'Operations': {
    'Execution with Reversibility': 1.3,
    'Scenario Thinking': 1.3,
    'Feedback Calibration': 1.2,
    'Resilience': 1.2,
    'Trust-Building': 1.1,
  },
};

// Domain of each skill — used to apply level-band emphasis.
export const SKILL_DOMAIN = {
  'First Principles Thinking': 'Cognitive Mastery',
  'Decision-Making Under Uncertainty': 'Cognitive Mastery',
  'Scenario Thinking': 'Cognitive Mastery',
  'Feedback Calibration': 'Cognitive Mastery',
  'Bayesian Updating': 'Cognitive Mastery',
  'Strategic Patience': 'Character Core',
  'Resilience': 'Character Core',
  'Strength of Character': 'Character Core',
  'Cognitive Decoupling': 'Character Core',
  'Execution with Reversibility': 'Character Core',
  'Trust-Building': 'Trust Dynamics',
  'Ability to Influence': 'Trust Dynamics',
  'Narrative Framing': 'Trust Dynamics',
  'Tribal Intelligence': 'Trust Dynamics',
  'Confidence Calibration': 'Trust Dynamics',
};

// Coarse level bands (3 domains x 3 levels) — replaces the old 15x6 table.
// Grounded in the leadership-skills strataplex (Mumford, Campion & Morgeson 2007)
// and Katz (1955): as level rises, the differentiating emphasis shifts from
// Person<->Problem (cognitive) toward Person<->People (trust). Coarse by design —
// the audit (ledger/level_modifiers.md) found fine-grained cells indefensible.
export const LEVEL_BANDS = {
  'Cognitive Mastery': { IC: 1.2, Manager: 1.0, Executive: 0.9 },
  'Character Core':    { IC: 1.0, Manager: 1.1, Executive: 1.2 },
  'Trust Dynamics':    { IC: 0.8, Manager: 1.2, Executive: 1.5 },
};

function levelModifier(skill, level) {
  if (!level) return 1.0; // no level supplied -> neutral
  const domain = SKILL_DOMAIN[skill];
  return (LEVEL_BANDS[domain] && LEVEL_BANDS[domain][level]) || 1.0;
}

// effectiveWeight = function importance x level-band emphasis.
export function effectiveWeight(skill, role, level = null) {
  const w = (ROLE_WEIGHTS[role] || {})[skill] || 1.0;
  return w * levelModifier(skill, level);
}

// Development priority = weighted distance from mastery. Bigger gap = higher priority.
// gap = (5 - score) x effectiveWeight   (canonical formula; matches the spec)
export function rankByGap(scores, role, level = null) {
  return [...scores]
    .map(s => ({ ...s, gap: (5 - s.score) * effectiveWeight(s.skill, role, level) }))
    .sort((a, b) => (b.gap - a.gap) || (a.score - b.score));
}

function interpretScore(score) {
  if (score >= 5) return 'Deep strength — coach others here';
  if (score >= 4) return 'Solid — apply deliberately';
  if (score >= 3) return 'Functional — refine under pressure';
  if (score >= 2) return 'Developing — build rituals';
  return 'Growth area — start here first';
}

function getCoachingBullets(coaching, score) {
  if (!coaching) return [];
  let tier = 'Low';
  if (score >= 4) tier = 'High';
  else if (score >= 3) tier = 'Mid';

  const match = coaching.match(new RegExp(`### For ${tier} Scores[\\s\\S]*?(?=### For|$)`));
  if (!match) return [];
  return match[0]
    .split('\n')
    .filter(l => l.trim().startsWith('-'))
    .slice(0, 3)
    .map(l => l.replace(/^-\s*/, '').trim());
}

const LINE = '─'.repeat(50);
const DLINE = '═'.repeat(50);

export function generateRoadmap(scores, role, level = null) {
  const valid = scores.filter(s => s && s.score);
  const prioritized = rankByGap(valid, role, level);

  const gaps = prioritized.slice(0, 3);
  const strengths = [...prioritized].sort((a, b) => b.score - a.score).slice(0, 3);

  let out = `\n${DLINE}\n`;
  out += `STRATUM PROFILE — ${role.toUpperCase()}\n`;
  out += `${DLINE}\n\n`;

  out += `STRENGTHS\n${LINE}\n`;
  for (const s of strengths) {
    out += `  ✓  ${s.skill.padEnd(32)} ${s.score}/5\n`;
    if (s.evidence) out += `     ${s.evidence}\n`;
  }

  out += `\nGAPS  (prioritised for your role)\n${LINE}\n`;
  for (const s of gaps) {
    out += `  ↑  ${s.skill.padEnd(32)} ${s.score}/5\n`;
    if (s.evidence) out += `     ${s.evidence}\n`;
  }

  out += `\n4-WEEK SPRINT PLAN\n${LINE}\n`;

  const plan = [
    { label: 'Weeks 1–2', skill: gaps[0] },
    { label: 'Weeks 3–4', skill: gaps[1] || gaps[0] },
  ];

  for (const p of plan) {
    if (!p.skill) continue;
    out += `\n${p.label}: ${p.skill.skill} (${interpretScore(p.skill.score)})\n`;
    const bullets = getCoachingBullets(p.skill.coaching, p.skill.score);
    for (const b of bullets) out += `  • ${b} — Target: 3 instances this sprint. Note what shifted.\n`;
  }

  out += `\n${DLINE}\n`;
  return out;
}
