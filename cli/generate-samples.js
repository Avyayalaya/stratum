#!/usr/bin/env node
/**
 * Generate illustrative sample artifacts with the real Stratum engine.
 *
 * Uses hand-authored scores (no LLM) for a fictional team, runs the actual
 * report + team-report generators, and copies the output HTML into the repo's
 * reports/ folder. The data is ILLUSTRATIVE — a designed team, not a real client
 * — so nothing here claims production usage.
 *
 *   node cli/generate-samples.js
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { generateRoadmap } from './roadmap.js';
import { generateReport } from './report.js';
import { generateTeamReport } from './team-report.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, '..');
const REPORTS = path.join(REPO, 'reports');
const HISTORY = path.join(os.homedir(), '.stratum', 'history.json');

const S = [
  'First Principles Thinking', 'Decision-Making Under Uncertainty', 'Scenario Thinking',
  'Feedback Calibration', 'Bayesian Updating', 'Strategic Patience', 'Resilience',
  'Strength of Character', 'Cognitive Decoupling', 'Execution with Reversibility',
  'Trust-Building', 'Ability to Influence', 'Narrative Framing', 'Tribal Intelligence',
  'Confidence Calibration',
];

// Fictional "Meridian" pod at the (fictional) Nova AI. Each persona probes a
// different failure mode of the framework.
function mk(vec, modes = {}, evid = {}) {
  return vec.map((score, i) => ({
    skill: S[i], score,
    mode: modes[S[i]] || (score >= 4 ? 'demonstrated' : score >= 3 ? 'partial' : 'trait_claim'),
    evidence: evid[S[i]] || '',
  }));
}

const TEAM = [
  {
    name: 'Maya Chen', role: 'Product Manager', level: 'Executive',
    // Brilliant strategist who burns trust. High cognitive/character, low trust.
    scores: mk(
      [5,5,5,3,4, 4,4,4,3,5, 1,4,4,1,3],
      { 'Trust-Building': 'trait_claim', 'Tribal Intelligence': 'avoidance', 'Feedback Calibration': 'trait_claim' },
      { 'First Principles Thinking': 'Rebuilt the fraud model from three core signals; cut false positives 62%.',
        'Trust-Building': 'Says "my track record builds trust" — no example of building it deliberately.',
        'Tribal Intelligence': 'Two engineers asked to transfer; she frames peer feedback as noise.' },
    ),
  },
  {
    name: 'Devin Osei', role: 'Engineer', level: 'Manager',
    // Strong cognitive, fragile under pressure.
    scores: mk(
      [5,4,4,4,4, 2,1,3,2,3, 3,2,2,3,3],
      { 'Resilience': 'insufficient', 'Cognitive Decoupling': 'avoidance' },
      { 'Resilience': 'After the outage he went quiet for a week; no recovery story.' },
    ),
  },
  {
    name: 'Priya Nair', role: 'Operations', level: 'Manager',
    // Warm, trusted, thin on rigor.
    scores: mk(
      [2,2,2,3,2, 3,4,4,4,3, 5,5,4,5,4],
      {},
      { 'Trust-Building': 'Runs the retro everyone feels safe in; conflict surfaces early on her team.' },
    ),
  },
  {
    name: 'Sam Ree', role: 'Product Manager', level: 'IC',
    // Solid generalist, no spikes.
    scores: mk([3,3,3,3,3, 3,3,3,3,3, 3,3,3,3,3]),
  },
];

fs.mkdirSync(REPORTS, { recursive: true });

// Preserve any real personal history, seed sample-only, restore afterward.
let backup = null;
if (fs.existsSync(HISTORY)) backup = fs.readFileSync(HISTORY, 'utf8');
fs.mkdirSync(path.dirname(HISTORY), { recursive: true });

const now = new Date().toISOString();
fs.writeFileSync(HISTORY, JSON.stringify(
  TEAM.map(m => ({ timestamp: now, name: m.name, role: m.role, level: m.level, domain: 'Full Stratum', scores: m.scores })),
  null, 2,
));

const out = [];
try {
  // Individual sample — Maya Chen (the "high average, disqualifying gap" case).
  const maya = TEAM[0];
  const roadmap = generateRoadmap(maya.scores, maya.role, maya.level);
  const indPath = generateReport({
    name: maya.name, role: maya.role, level: maya.level, date: now,
    scores: maya.scores, roadmapText: roadmap,
  });
  const indDest = path.join(REPORTS, 'sample_report_maya_chen_2026-07-06.html');
  fs.copyFileSync(indPath, indDest);
  out.push(indDest);

  // Team sample — the whole Meridian pod.
  const teamPath = generateTeamReport(TEAM.map(m => m.name));
  if (teamPath) {
    const teamDest = path.join(REPORTS, 'sample_team_report_meridian_2026-07-06.html');
    fs.copyFileSync(teamPath, teamDest);
    out.push(teamDest);
  }
} finally {
  if (backup !== null) fs.writeFileSync(HISTORY, backup);
  else fs.rmSync(HISTORY, { force: true });
}

console.log('Generated (illustrative):');
for (const f of out) console.log('  ' + path.relative(REPO, f));
