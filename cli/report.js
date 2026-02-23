import fs from 'fs';
import path from 'path';
import os from 'os';
import { ROLE_WEIGHTS } from './roadmap.js';

const DOMAIN_COLORS = {
  'Cognitive Mastery': { bg: '#EEF2FF', bar: '#6366F1', text: '#3730A3' },
  'Character Core':    { bg: '#FFF7ED', bar: '#F97316', text: '#9A3412' },
  'Trust Dynamics':    { bg: '#F0FDF4', bar: '#22C55E', text: '#166534' },
};

const DOMAIN_ORDER = ['Cognitive Mastery', 'Character Core', 'Trust Dynamics'];

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

function scoreBar(score, domain) {
  const c = DOMAIN_COLORS[domain] || { bg: '#F3F4F6', bar: '#6B7280', text: '#374151' };
  const pct = (score / 5) * 100;
  return `
    <div style="display:flex;align-items:center;gap:12px;margin:6px 0;">
      <div style="flex:1;background:#E5E7EB;border-radius:4px;height:10px;overflow:hidden;">
        <div style="width:${pct}%;background:${c.bar};height:100%;border-radius:4px;"></div>
      </div>
      <span style="font-weight:700;color:${c.bar};min-width:28px;text-align:right;">${score}/5</span>
    </div>`;
}

function skillSection(scores) {
  let html = '';
  for (const domain of DOMAIN_ORDER) {
    const c = DOMAIN_COLORS[domain];
    const domainScores = scores.filter(s => SKILL_DOMAIN[s.skill] === domain);
    if (!domainScores.length) continue;

    html += `
      <div style="margin-bottom:28px;">
        <div style="background:${c.bg};border-left:4px solid ${c.bar};padding:8px 14px;margin-bottom:12px;border-radius:0 6px 6px 0;">
          <span style="font-weight:700;color:${c.text};font-size:13px;text-transform:uppercase;letter-spacing:.05em;">${domain}</span>
        </div>`;

    for (const s of domainScores) {
      const selfRatedBadge = s.selfRated
        ? `<span style="font-size:10px;color:#B45309;background:#FEF3C7;padding:1px 5px;border-radius:3px;margin-left:8px;">⚠ Self-reported</span>`
        : '';
      html += `
        <div style="margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;">
            <span style="font-size:14px;color:#111827;font-weight:500;">${s.skill}${selfRatedBadge}</span>
          </div>
          ${scoreBar(s.score, domain)}
          ${s.evidence ? `<p style="font-size:12px;color:#6B7280;margin:2px 0 0 0;font-style:italic;">"${s.evidence}"</p>` : ''}
        </div>`;
    }
    html += `</div>`;
  }
  return html;
}

function strengthsAndGaps(scores, role) {
  const weights = ROLE_WEIGHTS[role] || {};
  // Strengths: raw score (a 5 is a 5)
  const sortedByScore = [...scores].sort((a, b) => b.score - a.score);
  const strengths = sortedByScore.slice(0, 3);
  // Gaps: role-weighted priority (score / weight — lower = bigger gap for this role)
  const sortedByPriority = [...scores]
    .map(s => ({ ...s, priority: s.score / (weights[s.skill] || 1.0) }))
    .sort((a, b) => a.priority - b.priority);
  const gaps = sortedByPriority.slice(0, 3);

  const card = (s, icon, color) => {
    const domain = SKILL_DOMAIN[s.skill] || 'Cognitive Mastery';
    const c = DOMAIN_COLORS[domain];
    const weight = weights[s.skill];
    const roleTag = weight && weight > 1.0
      ? `<span style="font-size:11px;color:${c.bar};background:${c.bg};padding:2px 6px;border-radius:3px;margin-left:6px;">↑ Critical for ${role}s</span>`
      : '';
    const selfRatedTag = s.selfRated
      ? `<span style="font-size:11px;color:#B45309;background:#FEF3C7;padding:2px 6px;border-radius:3px;margin-left:6px;">⚠ Self-reported</span>`
      : '';
    return `
      <div style="border:1px solid ${c.bar}33;border-radius:8px;padding:14px 16px;background:${c.bg};">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
          <span style="font-size:18px;">${icon}</span>
          <span style="font-weight:600;color:#111827;font-size:14px;">${s.skill}</span>
          ${roleTag}${selfRatedTag}
          <span style="margin-left:auto;font-weight:700;color:${c.bar};">${s.score}/5</span>
        </div>
        ${s.evidence ? `<p style="font-size:12px;color:#6B7280;margin:0;font-style:italic;">"${s.evidence}"</p>` : ''}
      </div>`;
  };

  return `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:36px;">
      <div>
        <h3 style="font-size:14px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px;">✓ Top Strengths</h3>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${strengths.map(s => card(s, '✓', '#22C55E')).join('')}
        </div>
      </div>
      <div>
        <h3 style="font-size:14px;font-weight:700;color:#9A3412;text-transform:uppercase;letter-spacing:.05em;margin-bottom:12px;">↑ Priority Gaps (${role})</h3>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${gaps.map(s => card(s, '↑', '#F97316')).join('')}
        </div>
      </div>
    </div>`;
}

function sprintPlan(roadmapText) {
  // Extract just the sprint plan block from the roadmap text
  const match = roadmapText.match(/4-WEEK SPRINT PLAN[\s\S]*$/);
  if (!match) return '';
  const lines = match[0].split('\n').filter(l => l.trim());
  let html = '';
  for (const line of lines) {
    if (line.includes('SPRINT PLAN')) {
      html += `<h3 style="font-size:14px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:.05em;margin-bottom:16px;">4-Week Sprint Plan</h3>`;
    } else if (line.startsWith('Weeks')) {
      html += `<div style="font-weight:600;color:#111827;font-size:14px;margin:14px 0 6px;">${line}</div>`;
    } else if (line.trim().startsWith('•')) {
      html += `<div style="font-size:13px;color:#4B5563;padding:4px 0 4px 16px;border-left:2px solid #E5E7EB;">${line.trim()}</div>`;
    } else if (line.match(/^[═─]+$/)) {
      // skip dividers
    }
  }
  return html;
}

export function generateReport({ name, role, date, scores, roadmapText }) {
  const dateStr = new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const avgScore = (scores.reduce((a, s) => a + s.score, 0) / scores.length).toFixed(1);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stratum Report — ${name}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F9FAFB; color: #111827; }
    @media print { body { background: white; } .no-print { display: none; } }
  </style>
</head>
<body>
<div style="max-width:760px;margin:0 auto;padding:40px 24px;">

  <!-- Header -->
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:36px;padding-bottom:24px;border-bottom:2px solid #E5E7EB;">
    <div>
      <div style="font-size:11px;font-weight:700;color:#9CA3AF;text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">Stratum Profile</div>
      <h1 style="font-size:28px;font-weight:800;color:#111827;margin-bottom:4px;">${name}</h1>
      <div style="font-size:15px;color:#6B7280;">${role} &middot; ${dateStr}</div>
    </div>
    <div style="text-align:right;">
      <div style="font-size:11px;color:#9CA3AF;margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em;">Overall</div>
      <div style="font-size:40px;font-weight:800;color:#6366F1;line-height:1;">${avgScore}</div>
      <div style="font-size:12px;color:#9CA3AF;">out of 5.0</div>
    </div>
  </div>

  <!-- Strengths & Gaps -->
  ${strengthsAndGaps(scores, role)}

  <!-- All Skills -->
  <h2 style="font-size:16px;font-weight:700;color:#111827;margin-bottom:20px;padding-bottom:10px;border-bottom:1px solid #E5E7EB;">Full Skill Profile</h2>
  ${skillSection(scores)}

  <!-- Sprint Plan -->
  <div style="background:#FAFAFA;border:1px solid #E5E7EB;border-radius:10px;padding:24px;margin-top:8px;">
    ${sprintPlan(roadmapText)}
  </div>

  <!-- Footer -->
  <div style="margin-top:36px;padding-top:20px;border-top:1px solid #E5E7EB;">
    ${scores.some(s => s.selfRated) ? '<p style="font-size:11px;color:#B45309;margin-bottom:10px;">⚠ Skills marked "Self-reported" were not AI-scored. Self-assessment systematically overestimates skill level (Dunning-Kruger, 1999). AI-scored reassessment recommended.</p>' : ''}
    <p style="font-size:11px;color:#9CA3AF;margin-bottom:6px;">Stratum measures behavioral meta-skills — the differentiator within technically qualified pools. Technical proficiency is the prerequisite, not a replacement.</p>
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:12px;color:#9CA3AF;">Generated by <strong>Stratum</strong></span>
      <a href="https://github.com/Avyayalaya/stratum" style="font-size:12px;color:#6366F1;text-decoration:none;" class="no-print">github.com/Avyayalaya/stratum</a>
    </div>
  </div>

</div>
</body>
</html>`;

  // Save to ~/.stratum/reports/
  const reportsDir = path.join(os.homedir(), '.stratum', 'reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  const safeName = name.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  const ts = new Date(date).toISOString().slice(0, 10);
  const filePath = path.join(reportsDir, `stratum-${safeName}-${ts}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
  return filePath;
}
