#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import os from 'os';
import inquirer from 'inquirer';
import MarkdownIt from 'markdown-it';
import { scoreSkill } from './scorer.js';
import { generateRoadmap } from './roadmap.js';
import { generateReport } from './report.js';
import { generateTeamReport } from './team-report.js';

const SKILLS = [
  { domain: 'Cognitive Mastery',  skill: 'First Principles Thinking',        file: 'first-principles-thinking.md' },
  { domain: 'Cognitive Mastery',  skill: 'Decision-Making Under Uncertainty', file: 'decision-making.md' },
  { domain: 'Cognitive Mastery',  skill: 'Scenario Thinking',                 file: 'scenario-thinking.md' },
  { domain: 'Cognitive Mastery',  skill: 'Feedback Calibration',              file: 'feedback-calibration.md' },
  { domain: 'Cognitive Mastery',  skill: 'Bayesian Updating',                 file: 'bayesian-updating.md' },
  { domain: 'Character Core',     skill: 'Strategic Patience',                file: 'strategic-patience.md' },
  { domain: 'Character Core',     skill: 'Resilience',                        file: 'resilience.md' },
  { domain: 'Character Core',     skill: 'Strength of Character',             file: 'strength-of-character.md' },
  { domain: 'Character Core',     skill: 'Cognitive Decoupling',              file: 'cognitive-decoupling.md' },
  { domain: 'Character Core',     skill: 'Execution with Reversibility',      file: 'execution-with-reversibility.md' },
  { domain: 'Trust Dynamics',     skill: 'Trust-Building',                    file: 'trust-building.md' },
  { domain: 'Trust Dynamics',     skill: 'Ability to Influence',              file: 'ability-to-influence.md' },
  { domain: 'Trust Dynamics',     skill: 'Narrative Framing',                 file: 'narrative-framing.md' },
  { domain: 'Trust Dynamics',     skill: 'Tribal Intelligence',               file: 'tribal-intelligence.md' },
  { domain: 'Trust Dynamics',     skill: 'Confidence Calibration',            file: 'confidence-calibration.md' },
];

const md = new MarkdownIt();

const DOMAIN_MAP = {
  'Cognitive Mastery': {
    diagnostic: 'cognitive-mastery-diagnostic.md',
    scenarios: 'cognitive-scenarios.md',
    notes: 'cognitive-field-notes.md'
  },
  'Character Core': {
    diagnostic: 'character-core-diagnostic.md',
    scenarios: 'character-scenarios.md',
    notes: 'character-field-notes.md'
  },
  'Trust Dynamics': {
    diagnostic: 'trust-dynamics-diagnostic.md',
    scenarios: 'trust-scenarios.md',
    notes: 'trust-field-notes.md'
  }
};

const BASE_PATHS = {
  diagnostics: path.join(process.cwd(), 'evaluation-tools'),
  scenarios: path.join(process.cwd(), 'scenario-templates'),
  notes: path.join(process.cwd(), 'coaching-playbook')
};

const HISTORY_DIR = path.join(os.homedir(), '.stratum');
const HISTORY_FILE = path.join(HISTORY_DIR, 'history.json');

function loadHistory() {
  try {
    const data = fs.readFileSync(HISTORY_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveHistory(history) {
  if (!fs.existsSync(HISTORY_DIR)) {
    fs.mkdirSync(HISTORY_DIR, { recursive: true });
  }
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

async function mainMenu() {
  let exit = false;
  while (!exit) {
    const { choice } = await inquirer.prompt({
      type: 'list',
      name: 'choice',
      message: 'Select an option',
      choices: ['Agentic Assessment', 'Team Report', 'Scenario Assessment', 'Diagnostics', 'Scenarios', 'Field Notes', 'History', 'Exit']
    });

    if (choice === 'Agentic Assessment') {
      await runAgenticAssessment();
    } else if (choice === 'Team Report') {
      await runTeamReport();
    } else if (choice === 'Scenario Assessment') {
      await runScenarioAssessment();
    } else if (choice === 'Diagnostics') {
      await runDiagnostics();
    } else if (choice === 'Scenarios') {
      await runScenarios();
    } else if (choice === 'Field Notes') {
      await showFieldNotes();
    } else if (choice === 'History') {
      await showHistory();
    } else {
      exit = true;
    }
  }
}

function parseDiagnostic(content) {
  const lines = content.split(/\r?\n/);
  const sections = [];
  let current = null;
  for (const line of lines) {
    const skillMatch = line.match(/^###\s+\d+\.\s+(.*)/);
    if (skillMatch) {
      if (current) sections.push(current);
      current = { skill: skillMatch[1].trim(), statements: [] };
      continue;
    }
    const bullet = line.match(/^-\s+(.*)/);
    if (bullet && current) {
      current.statements.push(bullet[1].trim());
    }
  }
  if (current) sections.push(current);
  return sections;
}

async function runDiagnostics() {
  const { domain } = await inquirer.prompt({
    type: 'list',
    name: 'domain',
    message: 'Choose a domain',
    choices: Object.keys(DOMAIN_MAP)
  });

  const file = path.join(BASE_PATHS.diagnostics, DOMAIN_MAP[domain].diagnostic);
  const content = fs.readFileSync(file, 'utf8');
  const sections = parseDiagnostic(content);

  console.log(`\n${domain} Diagnostic`);

  const scores = [];
  for (const sec of sections) {
    console.log(`\n${sec.skill}`);
    let secTotal = 0;
    for (const statement of sec.statements) {
      const { score } = await inquirer.prompt({
        type: 'input',
        name: 'score',
        message: `${statement} (1-5)`,
        validate: v => /^[1-5]$/.test(v) || 'Enter a number 1-5'
      });
      secTotal += parseInt(score, 10);
    }
    const interpretation = interpretScore(secTotal);
    console.log(`Score: ${secTotal} - ${interpretation}`);
    scores.push({ skill: sec.skill, score: secTotal });
  }

  const history = loadHistory();
  history.push({
    timestamp: new Date().toISOString(),
    domain,
    scores
  });
  saveHistory(history);
  console.log('Results saved.');
}

function interpretScore(score) {
  if (score >= 21) return 'Deep strength – anchors trust and alignment in systems';
  if (score >= 16) return 'Solid foundation – influence and clarity are consistently felt';
  if (score >= 11) return 'Functional but uneven – watch for blind spots under pressure';
  return 'Growth area – may erode trust without intention or clarity';
}

function parseScenarios(content) {
  const blocks = content.split(/\n---\n/).filter(b => b.includes('Simulation'));
  const scenarios = [];
  for (const block of blocks) {
    const titleMatch = block.match(/##\s+Simulation\s+\d+:\s+\*\*(.+?)\*\*/);
    const situationMatch = block.match(/###\s+\xf0\x9f\xa7\xa0\s+Situation\n([\s\S]*?)\n###/);
    const promptMatch = block.match(/###\s+\xf0\x9f\x94\x8d\s+Prompt\n([\s\S]*?)\n###/);
    const insightMatch = block.match(/###\s+\xf0\x9f\xa7\xa8\s+Hidden Insight\n([\s\S]*)/);
    if (titleMatch) {
      scenarios.push({
        title: titleMatch[1].trim(),
        situation: situationMatch ? situationMatch[1].trim() : '',
        prompt: promptMatch ? promptMatch[1].trim() : '',
        insight: insightMatch ? insightMatch[1].trim() : ''
      });
    }
  }
  return scenarios;
}

async function runScenarios() {
  const { domain } = await inquirer.prompt({
    type: 'list',
    name: 'domain',
    message: 'Choose a domain',
    choices: Object.keys(DOMAIN_MAP)
  });

  const file = path.join(BASE_PATHS.scenarios, DOMAIN_MAP[domain].scenarios);
  const content = fs.readFileSync(file, 'utf8');
  const scenarios = parseScenarios(content);

  for (const sc of scenarios) {
    console.log(`\n=== ${sc.title} ===`);
    console.log(`\nSituation:\n${sc.situation}\n`);
    await inquirer.prompt({ type: 'input', name: 'next', message: 'Press Enter to see the prompt' });
    console.log(`\nPrompt:\n${sc.prompt}\n`);
    await inquirer.prompt({ type: 'input', name: 'next', message: 'Press Enter to reveal the hidden insight' });
    console.log(`\nHidden Insight:\n${sc.insight}\n`);
  }
}

function parseFieldNotes(content) {
  const match = content.match(/## \xf0\x9f\x94\x8d Microbehaviors[^]*?(?=##|$)/);
  if (!match) return [];
  return match[0]
    .split(/\n/)
    .filter(l => l.startsWith('- '))
    .map(l => l.slice(2).trim());
}

async function showFieldNotes() {
  const { domain } = await inquirer.prompt({
    type: 'list',
    name: 'domain',
    message: 'Choose a domain',
    choices: Object.keys(DOMAIN_MAP)
  });

  const file = path.join(BASE_PATHS.notes, DOMAIN_MAP[domain].notes);
  const content = fs.readFileSync(file, 'utf8');
  const notes = parseFieldNotes(content);
  if (!notes.length) {
    console.log('No field notes found.');
    return;
  }
  const { note } = await inquirer.prompt({
    type: 'list',
    name: 'note',
    message: 'Choose a microbehavior to practice',
    choices: notes
  });
  console.log(`\nSelected microbehavior:\n${note}\n`);
}

async function showHistory() {
  const history = loadHistory();
  if (!history.length) {
    console.log('No diagnostic history found.');
    return;
  }

  const choices = history.map((h, i) => ({
    name: `${new Date(h.timestamp).toLocaleString()} - ${h.domain}`,
    value: i
  }));
  choices.push(new inquirer.Separator(), 'Progress Summary', 'Back');

  const { selection } = await inquirer.prompt({
    type: 'list',
    name: 'selection',
    message: 'Select a record or view summary',
    choices
  });

  if (selection === 'Back') return;
  if (selection === 'Progress Summary') {
    showProgressSummary(history);
    return;
  }

  const rec = history[selection];
  console.log(`\n${rec.domain} Diagnostic on ${new Date(rec.timestamp).toLocaleString()}`);
  for (const s of rec.scores) {
    console.log(`${s.skill}: ${s.score}`);
  }
  console.log('');
}

function showProgressSummary(history) {
  const summary = {};
  for (const h of history) {
    const total = h.scores.reduce((a, b) => a + b.score, 0);
    if (!summary[h.domain]) summary[h.domain] = { total: 0, count: 0 };
    summary[h.domain].total += total;
    summary[h.domain].count += 1;
  }
  console.log('\nAverage Scores by Domain:');
  for (const [domain, data] of Object.entries(summary)) {
    const avg = (data.total / data.count).toFixed(2);
    console.log(`${domain}: ${avg}`);
  }
  console.log('');
}

async function runAgenticAssessment() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('\n⚠  ANTHROPIC_API_KEY not set. Set it and re-run.\n');
    return;
  }

  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Who is being assessed? (name or "me")',
  });

  const { role } = await inquirer.prompt({
    type: 'list',
    name: 'role',
    message: 'Role',
    choices: ['Product Manager', 'Engineer', 'Operations', 'General'],
  });

  const { mode } = await inquirer.prompt({
    type: 'list',
    name: 'mode',
    message: 'Assessment depth',
    choices: [
      { name: 'Full  — 15 skills (~20 min, complete profile)', value: 'full' },
      { name: 'Quick — 3 skills, one per domain (~5 min)',    value: 'quick' },
    ],
  });

  const BASE = path.join(process.cwd(), 'meta-skills');

  let skillsToRun = SKILLS;
  if (mode === 'quick') {
    skillsToRun = [
      SKILLS.find(s => s.domain === 'Cognitive Mastery'),
      SKILLS.find(s => s.domain === 'Character Core'),
      SKILLS.find(s => s.domain === 'Trust Dynamics'),
    ];
  }

  console.log(`\nStarting ${mode === 'quick' ? 'quick' : 'full'} assessment for ${name} (${role})`);
  console.log('Answer each question honestly — specific situations beat generalities.\n');

  let currentDomain = '';
  const results = [];

  for (const { domain, skill, file } of skillsToRun) {
    if (domain !== currentDomain) {
      currentDomain = domain;
      console.log(`\n${'━'.repeat(50)}`);
      console.log(`  ${domain.toUpperCase()}`);
      console.log(`${'━'.repeat(50)}`);
    }

    const result = await scoreSkill(skill, path.join(BASE, file), role);
    if (result) results.push(result);
  }

  if (!results.length) {
    console.log('\nNo results to report.');
    return;
  }

  const roadmap = generateRoadmap(results, role);
  console.log(roadmap);

  // Generate shareable HTML report
  const reportPath = generateReport({
    name,
    role,
    date: new Date().toISOString(),
    scores: results,
    roadmapText: roadmap,
  });
  console.log(`\n📄 Report saved: ${reportPath}\n`);

  // Save to history
  const history = loadHistory();
  const previousForPerson = history.filter(h => h.name === name);
  history.push({
    timestamp: new Date().toISOString(),
    name,
    role,
    mode,
    domain: 'Full Stratum',
    assessmentNumber: previousForPerson.length + 1,
    aiScoredCount: results.filter(r => !r.selfRated).length,
    selfRatedCount: results.filter(r => r.selfRated).length,
    scores: results.map(r => ({ skill: r.skill, score: r.score, evidence: r.evidence, mode: r.mode || 'partial', selfRated: !!r.selfRated })),
  });
  saveHistory(history);
}

// ── Team Report ──
async function runTeamReport() {
  const history = loadHistory();
  const uniqueNames = [...new Set(history.map(h => h.name))];

  if (uniqueNames.length < 2) {
    console.log('\n⚠ Need at least 2 assessed individuals in history. Run individual assessments first.\n');
    return;
  }

  const { selected } = await inquirer.prompt({
    type: 'checkbox',
    name: 'selected',
    message: 'Select team members (min 2)',
    choices: uniqueNames,
    validate: v => v.length >= 2 || 'Select at least 2 members',
  });

  const reportPath = generateTeamReport(selected);
  if (reportPath) {
    console.log(`\n📊 Team report saved: ${reportPath}\n`);
  }
}

// ── Scenario Assessment ──
async function runScenarioAssessment() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('\n⚠  ANTHROPIC_API_KEY not set. Set it and re-run.\n');
    return;
  }

  const { name } = await inquirer.prompt({ type: 'input', name: 'name', message: 'Who is being assessed?' });
  const { role } = await inquirer.prompt({
    type: 'list', name: 'role', message: 'Role',
    choices: ['Product Manager', 'Engineer', 'Operations', 'General'],
  });

  const SCENARIO_FILES = {
    'Cognitive Mastery': 'cognitive-scenarios.md',
    'Character Core': 'character-scenarios.md',
    'Trust Dynamics': 'trust-scenarios.md',
  };

  const scenarioDir = path.join(process.cwd(), 'scenario-templates');
  const results = [];

  for (const [domain, file] of Object.entries(SCENARIO_FILES)) {
    let content = '';
    try { content = fs.readFileSync(path.join(scenarioDir, file), 'utf8'); }
    catch { console.log(`  ⊘ Missing ${file}`); continue; }

    // Extract first scenario from file
    const scenarioMatch = content.match(/##\s+(?:Scenario\s*\d*|Simulation\s*\d*)[:\s]*(.*?)(?=\n)/i);
    const situationMatch = content.match(/🧠\s*\*?\*?Situation\*?\*?:?\s*([\s\S]*?)(?=🔍|###)/);
    const promptMatch = content.match(/🔍\s*\*?\*?Prompt\*?\*?:?\s*([\s\S]*?)(?=🧨|###|##)/);

    if (!situationMatch || !promptMatch) continue;

    const situation = situationMatch[1].trim();
    const prompt = promptMatch[1].trim().split('\n').filter(l => l.trim()).slice(0, 2).join('\n');

    console.log(`\n${'━'.repeat(50)}`);
    console.log(`  ${domain.toUpperCase()} — SCENARIO`);
    console.log(`${'━'.repeat(50)}`);
    console.log(`\n${situation}\n`);
    console.log(`${prompt}\n`);

    let { answer } = await inquirer.prompt({ type: 'input', name: 'answer', message: '▶' });
    if (!answer.trim()) continue;

    // Get the target skills for this scenario
    const targetMatch = content.match(/Target Skills?:?\s*([\s\S]*?)(?=🧠|###)/i);
    const targetSkills = targetMatch ? targetMatch[1].trim() : domain;

    // Find the rubric for the primary skill of this domain
    const domainSkills = SKILLS.filter(s => s.domain === domain);
    let rubric = '';
    if (domainSkills.length) {
      try {
        const skillContent = fs.readFileSync(path.join(process.cwd(), 'meta-skills', domainSkills[0].file), 'utf8');
        const rubricMatch = skillContent.match(/### Scoring Rubric[\s\S]*?(?=\n---|\n## )/);
        rubric = rubricMatch ? rubricMatch[0] : '';
      } catch {}
    }

    const system = `You are evaluating a professional's response to a scenario testing "${domain}" meta-skills.
This person works as a ${role}. The scenario tests: ${targetSkills}

${rubric}

Scoring rules:
1. Score based on the quality of their reasoning, decision-making approach, and awareness of tradeoffs — not on whether they chose the "right" answer.
2. Higher scores for: considering multiple stakeholders, identifying hidden risks, proposing reversible actions, acknowledging uncertainty.
3. Return ONLY valid JSON:
- "score": integer 1–5
- "evidence": one sentence max 20 words
- "mode": "demonstrated" | "partial" | "avoidance" | "trait_claim" | "insufficient"

Raw JSON only.`;

    try {
      const Anthropic = (await import('@anthropic-ai/sdk')).default;
      const client = new Anthropic();
      const msg = await client.messages.create({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 200,
        system,
        messages: [{ role: 'user', content: `Scenario response: "${answer}"` }],
      });

      const parsed = JSON.parse(msg.content[0].text.trim());
      const score = Math.min(5, Math.max(1, parseInt(parsed.score)));
      const mode = ['demonstrated', 'partial', 'avoidance', 'trait_claim', 'insufficient'].includes(parsed.mode) ? parsed.mode : 'partial';
      console.log(`  → ${score}/5  [${mode}]  ${parsed.evidence}`);
      results.push({ skill: `${domain} (scenario)`, score, evidence: parsed.evidence, mode });
    } catch (e) {
      console.log(`  ⚠ Scoring failed: ${e.message}`);
    }
  }

  if (results.length) {
    console.log(`\n${'═'.repeat(50)}`);
    console.log(`SCENARIO ASSESSMENT — ${name} (${role})`);
    for (const r of results) {
      console.log(`  ${r.score >= 4 ? '●' : r.score >= 3 ? '◐' : '○'} ${r.skill.padEnd(35)} ${r.score}/5`);
    }
    console.log(`${'═'.repeat(50)}\n`);

    const history = loadHistory();
    history.push({
      timestamp: new Date().toISOString(),
      name, role, mode: 'scenario', domain: 'Scenario Assessment',
      scores: results.map(r => ({ skill: r.skill, score: r.score, evidence: r.evidence, mode: r.mode })),
    });
    saveHistory(history);
  }
}

mainMenu();
