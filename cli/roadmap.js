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

function getPriority(skillName, rawScore, role) {
  const weight = (ROLE_WEIGHTS[role] || {})[skillName] || 1.0;
  // priority = effective gap score (lower = bigger gap for this role)
  return rawScore / weight;
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

export function generateRoadmap(scores, role) {
  const valid = scores.filter(s => s && s.score);
  const prioritized = valid
    .map(s => ({ ...s, priority: getPriority(s.skill, s.score, role) }))
    .sort((a, b) => a.priority - b.priority);

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
