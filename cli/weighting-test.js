#!/usr/bin/env node
/**
 * Weighting robustness test (Dawes 1979 check).
 *
 * Question: does Stratum's role-weighting change the development-priority
 * ranking versus a flat unit-weighted model? Dawes (1979, "The robust beauty
 * of improper linear models") predicts that mild, unvalidated weights rarely
 * reorder cases. If the top-3 gap sets are near-identical, the elaborate
 * weighting apparatus is not earning its complexity and should be simplified.
 *
 * Deterministic (seeded). No LLM required — this tests the math, not scoring.
 *
 *   node cli/weighting-test.js
 */

import { ROLE_WEIGHTS, rankByGap, effectiveWeight } from './roadmap.js';

const SKILLS = [
  'First Principles Thinking', 'Decision-Making Under Uncertainty', 'Scenario Thinking',
  'Feedback Calibration', 'Bayesian Updating', 'Strategic Patience', 'Resilience',
  'Strength of Character', 'Cognitive Decoupling', 'Execution with Reversibility',
  'Trust-Building', 'Ability to Influence', 'Narrative Framing', 'Tribal Intelligence',
  'Confidence Calibration',
];

// Uses the shipped canonical formula: gap = (5 - score) x effectiveWeight, ranked desc.
function topGaps(scoreArr, role, useWeights, level = null, n = 3) {
  const scores = scoreArr.map((v, i) => ({ skill: SKILLS[i], score: v }));
  if (useWeights) {
    return rankByGap(scores, role, level).slice(0, n).map(x => x.skill);
  }
  // unit weights: gap = (5 - score), same tie-breaks
  return scores
    .map((s, i) => ({ skill: s.skill, gap: (5 - s.score), score: s.score, i }))
    .sort((a, b) => (b.gap - a.gap) || (a.score - b.score) || (a.i - b.i))
    .slice(0, n).map(x => x.skill);
}

function jaccard(a, b) {
  const A = new Set(a), B = new Set(b);
  const inter = [...A].filter(x => B.has(x)).length;
  return inter / (A.size + B.size - inter);
}

// Seeded RNG (mulberry32) for reproducibility.
function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function runRandom(role, N, rand) {
  let same1 = 0, sameSet = 0, jac = 0;
  for (let k = 0; k < N; k++) {
    const scores = SKILLS.map(() => 1 + Math.floor(rand() * 5)); // 1..5
    const w = topGaps(scores, role, true);
    const u = topGaps(scores, role, false);
    if (w[0] === u[0]) same1++;
    if (jaccard(w, u) === 1) sameSet++;
    jac += jaccard(w, u);
  }
  return { same1: same1 / N, sameSet: sameSet / N, jac: jac / N };
}

// Adversarial archetypes (plausible score vectors) mapped to the 15 skills in order.
const ARCHETYPES = {
  // Brilliant strategist, burns trust (the simulate.js "Maya Chen" pattern)
  'toxic-brilliant': [5,5,5,3,5, 4,4,4,3,5, 1,4,4,1,3],
  // Strong cognitive, fragile under pressure
  'glass-cannon':    [5,4,5,4,4, 2,1,3,2,3, 3,3,3,3,3],
  // Warm, trusted, thin on rigor
  'beloved-lightweight': [2,2,2,3,2, 3,4,4,4,3, 5,5,4,5,4],
  // Even generalist
  'flat-generalist': [3,3,3,3,3, 3,3,3,3,3, 3,3,3,3,3],
};

const ROLES = ['Product Manager', 'Engineer', 'Operations'];
const N = 5000;
const rand = rng(42);

console.log('\n==================================================');
console.log(' WEIGHTING ROBUSTNESS TEST  (Dawes 1979 check)');
console.log(' current role weights  vs.  unit weights');
console.log('==================================================\n');

console.log(`Random profiles per role: ${N} (seeded, reproducible)\n`);
console.log('Role                | top-1 gap same | top-3 set identical | mean Jaccard');
console.log('--------------------|----------------|---------------------|-------------');
let agg = { same1: 0, sameSet: 0, jac: 0 };
for (const role of ROLES) {
  const r = runRandom(role, N, rand);
  agg.same1 += r.same1; agg.sameSet += r.sameSet; agg.jac += r.jac;
  console.log(
    `${role.padEnd(19)} | ${(r.same1 * 100).toFixed(1).padStart(12)}% | ` +
    `${(r.sameSet * 100).toFixed(1).padStart(17)}% | ${r.jac.toFixed(3).padStart(11)}`
  );
}
const n = ROLES.length;
console.log('--------------------|----------------|---------------------|-------------');
console.log(
  `${'MEAN'.padEnd(19)} | ${(agg.same1 / n * 100).toFixed(1).padStart(12)}% | ` +
  `${(agg.sameSet / n * 100).toFixed(1).padStart(17)}% | ${(agg.jac / n).toFixed(3).padStart(11)}`
);

console.log('\nAdversarial archetypes (top-3 gaps as a Product Manager):');
console.log('archetype             | weighted top-3                         | unit top-3');
for (const [name, scores] of Object.entries(ARCHETYPES)) {
  const w = topGaps(scores, 'Product Manager', true);
  const u = topGaps(scores, 'Product Manager', false);
  const flag = jaccard(w, u) === 1 ? '  (identical)' : '  <-- DIFFERS';
  console.log(`${name.padEnd(21)} | ${w.join(', ').padEnd(38)} | ${u.join(', ')}${flag}`);
}

console.log('\n--------------------------------------------------');
console.log(' LEVEL-BAND CHECK  (coarse 3x3, monotonic by design)');
console.log('--------------------------------------------------');
console.log('effectiveWeight by level (role=General, so function weight=1.0):\n');
console.log('skill                        |   IC | Manager | Executive');
for (const sk of ['First Principles Thinking', 'Strength of Character', 'Trust-Building']) {
  const ic = effectiveWeight(sk, 'General', 'IC').toFixed(2);
  const mg = effectiveWeight(sk, 'General', 'Manager').toFixed(2);
  const ex = effectiveWeight(sk, 'General', 'Executive').toFixed(2);
  console.log(`${sk.padEnd(28)} | ${ic.padStart(4)} | ${mg.padStart(7)} | ${ex.padStart(9)}`);
}
console.log('\nExpect: Cognitive falls IC->Exec, Trust rises IC->Exec (Person<->Problem -> Person<->People).');

console.log('\nInterpretation:');
console.log('If top-3 sets are identical in the large majority of cases, the current');
console.log('weighting rarely changes the development priority a person receives — i.e.');
console.log('a flat unit-weighted model would produce the same guidance (Dawes 1979).');
console.log('That is the empirical case for collapsing the weight apparatus.\n');
