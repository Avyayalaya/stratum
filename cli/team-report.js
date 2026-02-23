import fs from 'fs';
import path from 'path';
import os from 'os';
import { ROLE_WEIGHTS } from './roadmap.js';

const HISTORY_FILE = path.join(os.homedir(), '.stratum', 'history.json');

const DOMAIN_COLORS = {
  'Cognitive Mastery': { bg: '#EEF2FF', bar: '#6366F1', text: '#3730A3' },
  'Character Core':    { bg: '#FFF7ED', bar: '#F97316', text: '#9A3412' },
  'Trust Dynamics':    { bg: '#F0FDF4', bar: '#22C55E', text: '#166534' },
};

const SKILL_DOMAIN = {
  'First Principles Thinking':        'Cognitive Mastery',
  'Decision-Making Under Uncertainty': 'Cognitive Mastery',
  'Scenario Thinking':                 'Cognitive Mastery',
  'Feedback Calibration':              'Cognitive Mastery',
  'Bayesian Updating':                 'Cognitive Mastery',
  'Strategic Patience':                'Character Core',
  'Resilience':                        'Character Core',
  'Strength of Character':             'Character Core',
  'Cognitive Decoupling':              'Character Core',
  'Execution with Reversibility':      'Character Core',
  'Trust-Building':                    'Trust Dynamics',
  'Ability to Influence':              'Trust Dynamics',
  'Narrative Framing':                 'Trust Dynamics',
  'Tribal Intelligence':               'Trust Dynamics',
  'Confidence Calibration':            'Trust Dynamics',
};

const ALL_SKILLS = Object.keys(SKILL_DOMAIN);
const DOMAINS = ['Cognitive Mastery', 'Character Core', 'Trust Dynamics'];

function loadHistory() {
  try { return JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8')); }
  catch { return []; }
}

function getLatestForMembers(memberNames) {
  const history = loadHistory();
  const members = [];
  for (const name of memberNames) {
    const entries = history.filter(h => h.name.toLowerCase() === name.toLowerCase());
    if (entries.length) members.push(entries[entries.length - 1]);
  }
  return members;
}

function scoreColor(score) {
  if (score >= 4) return '#166534';
  if (score >= 3) return '#92400E';
  return '#991B1B';
}

function scoreBg(score) {
  if (score >= 4) return '#F0FDF4';
  if (score >= 3) return '#FFFBEB';
  return '#FEF2F2';
}

function heatmapCell(score) {
  if (!score) return '<td style="padding:6px 10px;text-align:center;color:#D1D5DB;">—</td>';
  return `<td style="padding:6px 10px;text-align:center;font-weight:700;color:${scoreColor(score)};background:${scoreBg(score)};">${score}</td>`;
}

function generateTeamReport(memberNames) {
  const members = getLatestForMembers(memberNames);
  if (members.length < 2) {
    console.log(`\n⚠ Need at least 2 assessed members. Found ${members.length} in history.`);
    console.log('Run individual assessments first with: stratum → Agentic Assessment\n');
    return null;
  }

  // Build score lookup: { memberName → { skillName → scoreObj } }
  const lookup = {};
  for (const m of members) {
    lookup[m.name] = {};
    for (const s of m.scores || []) {
      lookup[m.name][s.skill] = s;
    }
  }

  // ── Team Heatmap ──
  let heatmap = `
    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:32px;">
      <thead>
        <tr style="border-bottom:2px solid #E5E7EB;">
          <th style="text-align:left;padding:8px 10px;color:#6B7280;font-size:11px;text-transform:uppercase;">Skill</th>`;
  for (const m of members) {
    heatmap += `<th style="text-align:center;padding:8px 10px;color:#6B7280;font-size:11px;text-transform:uppercase;">${m.name.split(' ')[0]}</th>`;
  }
  heatmap += `<th style="text-align:center;padding:8px 10px;color:#6B7280;font-size:11px;text-transform:uppercase;">Team Avg</th></tr></thead><tbody>`;

  let currentDomain = '';
  for (const skill of ALL_SKILLS) {
    const domain = SKILL_DOMAIN[skill];
    if (domain !== currentDomain) {
      currentDomain = domain;
      const c = DOMAIN_COLORS[domain];
      heatmap += `<tr><td colspan="${members.length + 2}" style="padding:10px 10px 4px;font-weight:700;color:${c.text};font-size:12px;text-transform:uppercase;letter-spacing:.05em;border-top:1px solid #E5E7EB;">${domain}</td></tr>`;
    }
    const scores = members.map(m => lookup[m.name]?.[skill]?.score || 0);
    const validScores = scores.filter(s => s > 0);
    const avg = validScores.length ? (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(1) : '—';

    heatmap += `<tr style="border-bottom:1px solid #F3F4F6;"><td style="padding:6px 10px;color:#374151;">${skill}</td>`;
    for (const s of scores) heatmap += heatmapCell(s || null);
    heatmap += heatmapCell(avg === '—' ? null : parseFloat(avg));
    heatmap += `</tr>`;
  }
  heatmap += `</tbody></table>`;

  // ── Blind Spots: skills where nobody scores >3 ──
  const blindSpots = [];
  for (const skill of ALL_SKILLS) {
    const maxScore = Math.max(...members.map(m => lookup[m.name]?.[skill]?.score || 0));
    if (maxScore <= 3 && maxScore > 0) {
      blindSpots.push({ skill, domain: SKILL_DOMAIN[skill], max: maxScore });
    }
  }

  let blindSpotHtml = '';
  if (blindSpots.length) {
    blindSpotHtml = `
      <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <h3 style="font-size:14px;font-weight:700;color:#991B1B;margin-bottom:12px;">🚨 Team Blind Spots</h3>
        <p style="font-size:12px;color:#7F1D1D;margin-bottom:12px;">No team member scores above 3 on these skills. The team has no one to anchor these capabilities.</p>`;
    for (const b of blindSpots) {
      blindSpotHtml += `<div style="padding:4px 0;font-size:13px;color:#991B1B;">• <strong>${b.skill}</strong> (${b.domain}) — team max: ${b.max}/5</div>`;
    }
    blindSpotHtml += `</div>`;
  }

  // ── Coverage Map: who's the team's strongest per skill ──
  let coverageHtml = `
    <div style="margin-bottom:28px;">
      <h3 style="font-size:14px;font-weight:700;color:#374151;margin-bottom:12px;">Coverage Map — Who Anchors What</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">`;
  for (const skill of ALL_SKILLS) {
    let bestName = '—';
    let bestScore = 0;
    for (const m of members) {
      const s = lookup[m.name]?.[skill]?.score || 0;
      if (s > bestScore) { bestScore = s; bestName = m.name; }
    }
    const busFactor = members.filter(m => (lookup[m.name]?.[skill]?.score || 0) >= 4).length;
    const domain = SKILL_DOMAIN[skill];
    const c = DOMAIN_COLORS[domain];
    const busTag = busFactor <= 1
      ? `<span style="font-size:10px;color:#991B1B;background:#FEF2F2;padding:1px 4px;border-radius:2px;">bus factor: ${busFactor}</span>`
      : `<span style="font-size:10px;color:#166534;background:#F0FDF4;padding:1px 4px;border-radius:2px;">covered: ${busFactor}</span>`;
    coverageHtml += `
      <div style="padding:6px 10px;border:1px solid ${c.bar}22;border-radius:6px;font-size:12px;">
        <strong>${skill}</strong> ${busTag}<br/>
        <span style="color:#6B7280;">${bestName} (${bestScore}/5)</span>
      </div>`;
  }
  coverageHtml += `</div></div>`;

  // ── Conflict Risk Pairs ──
  const conflictPairs = [];
  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) {
      const a = members[i], b = members[j];
      const aT = lookup[a.name]?.['Trust-Building']?.score || 0;
      const bT = lookup[b.name]?.['Trust-Building']?.score || 0;
      const aF = lookup[a.name]?.['Feedback Calibration']?.score || 0;
      const bF = lookup[b.name]?.['Feedback Calibration']?.score || 0;
      const aC = lookup[a.name]?.['Cognitive Decoupling']?.score || 0;
      const bC = lookup[b.name]?.['Cognitive Decoupling']?.score || 0;

      if (aT <= 2 && bT <= 2) conflictPairs.push({ a: a.name, b: b.name, reason: 'Both low on Trust-Building — disagreements fester without resolution' });
      if ((aT <= 2 && bF <= 2) || (bT <= 2 && aF <= 2)) conflictPairs.push({ a: a.name, b: b.name, reason: 'Low trust + low feedback calibration — important signal gets lost' });
      if (aC <= 2 && bC <= 2) conflictPairs.push({ a: a.name, b: b.name, reason: 'Both low on Cognitive Decoupling — conflict escalates rather than resolves' });
    }
  }

  let conflictHtml = '';
  if (conflictPairs.length) {
    conflictHtml = `
      <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <h3 style="font-size:14px;font-weight:700;color:#92400E;margin-bottom:12px;">⚡ Conflict Risk</h3>`;
    const seen = new Set();
    for (const c of conflictPairs) {
      const key = `${c.a}-${c.b}-${c.reason}`;
      if (seen.has(key)) continue;
      seen.add(key);
      conflictHtml += `<div style="padding:6px 0;font-size:13px;color:#78350F;border-bottom:1px solid #FDE68A44;">
        <strong>${c.a}</strong> ↔ <strong>${c.b}</strong>: ${c.reason}</div>`;
    }
    conflictHtml += `</div>`;
  }

  // ── Complementary Pairs ──
  const compPairs = [];
  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) {
      const a = members[i], b = members[j];
      for (const skill of ALL_SKILLS) {
        const aS = lookup[a.name]?.[skill]?.score || 0;
        const bS = lookup[b.name]?.[skill]?.score || 0;
        if (aS >= 4 && bS <= 2) compPairs.push({ strong: a.name, weak: b.name, skill, strongScore: aS, weakScore: bS });
        if (bS >= 4 && aS <= 2) compPairs.push({ strong: b.name, weak: a.name, skill, strongScore: bS, weakScore: aS });
      }
    }
  }

  let compHtml = '';
  if (compPairs.length) {
    compHtml = `
      <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
        <h3 style="font-size:14px;font-weight:700;color:#166534;margin-bottom:12px;">🤝 Complementary Strengths</h3>`;
    for (const c of compPairs.slice(0, 8)) {
      compHtml += `<div style="padding:4px 0;font-size:13px;color:#14532D;">
        <strong>${c.strong}</strong> (${c.strongScore}/5) can mentor <strong>${c.weak}</strong> (${c.weakScore}/5) on <strong>${c.skill}</strong></div>`;
    }
    compHtml += `</div>`;
  }

  // ── Hiring Recommendation ──
  const domainAvgs = {};
  for (const domain of DOMAINS) {
    const skills = ALL_SKILLS.filter(s => SKILL_DOMAIN[s] === domain);
    const allScores = skills.flatMap(skill => members.map(m => lookup[m.name]?.[skill]?.score || 0).filter(s => s > 0));
    domainAvgs[domain] = allScores.length ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1) : '0';
  }
  const weakestDomain = DOMAINS.reduce((a, b) => parseFloat(domainAvgs[a]) < parseFloat(domainAvgs[b]) ? a : b);
  const weakSkills = blindSpots.filter(b => b.domain === weakestDomain).map(b => b.skill);
  const hiringHtml = `
    <div style="background:#EEF2FF;border:1px solid #C7D2FE;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
      <h3 style="font-size:14px;font-weight:700;color:#3730A3;margin-bottom:8px;">📋 Hiring Recommendation</h3>
      <p style="font-size:13px;color:#3730A3;margin-bottom:6px;">Weakest team domain: <strong>${weakestDomain}</strong> (avg ${domainAvgs[weakestDomain]}/5)</p>
      <p style="font-size:13px;color:#3730A3;">Next hire should be screened for: <strong>${weakSkills.length ? weakSkills.join(', ') : 'overall ' + weakestDomain + ' skills'}</strong></p>
      <p style="font-size:12px;color:#6366F1;margin-top:8px;">Domain averages — Cognitive: ${domainAvgs['Cognitive Mastery']}, Character: ${domainAvgs['Character Core']}, Trust: ${domainAvgs['Trust Dynamics']}</p>
    </div>`;

  // ── Assemble HTML ──
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const teamAvg = (members.reduce((sum, m) => {
    const avg = m.scores.reduce((a, s) => a + s.score, 0) / m.scores.length;
    return sum + avg;
  }, 0) / members.length).toFixed(1);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stratum Team Report</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F9FAFB; color: #111827; }
    @media print { body { background: white; } .no-print { display: none; } }
  </style>
</head>
<body>
<div style="max-width:900px;margin:0 auto;padding:40px 24px;">

  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:36px;padding-bottom:24px;border-bottom:2px solid #E5E7EB;">
    <div>
      <div style="font-size:11px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">Stratum Team Report</div>
      <h1 style="font-size:28px;font-weight:800;color:#111827;margin-bottom:4px;">${members.length} Members</h1>
      <div style="font-size:15px;color:#6B7280;">${members.map(m => m.name).join(', ')} &middot; ${dateStr}</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:11px;color:#9CA3AF;margin-bottom:4px;text-transform:uppercase;">Team Avg</div>
      <div style="font-size:40px;font-weight:800;color:#6366F1;line-height:1;">${teamAvg}</div>
      <div style="font-size:12px;color:#9CA3AF;">out of 5.0</div>
    </div>
  </div>

  ${blindSpotHtml}
  ${conflictHtml}
  ${compHtml}
  ${hiringHtml}

  <h2 style="font-size:16px;font-weight:700;color:#111827;margin-bottom:20px;padding-bottom:10px;border-bottom:1px solid #E5E7EB;">Skill Heatmap</h2>
  ${heatmap}
  ${coverageHtml}

  <div style="margin-top:36px;padding-top:20px;border-top:1px solid #E5E7EB;">
    <p style="font-size:11px;color:#9CA3AF;margin-bottom:6px;">Stratum measures behavioral meta-skills — the differentiator within technically qualified pools. Technical proficiency is the prerequisite, not a replacement.</p>
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:12px;color:#9CA3AF;">Generated by <strong>Stratum</strong></span>
      <a href="https://github.com/Avyayalaya/stratum" style="font-size:12px;color:#6366F1;text-decoration:none;" class="no-print">github.com/Avyayalaya/stratum</a>
    </div>
  </div>

</div>
</body>
</html>`;

  const reportsDir = path.join(os.homedir(), '.stratum', 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  const ts = new Date().toISOString().slice(0, 10);
  const filePath = path.join(reportsDir, `stratum-team-${ts}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  return filePath;
}

export { generateTeamReport, getLatestForMembers };
