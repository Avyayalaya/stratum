#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import MarkdownIt from 'markdown-it';

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

async function mainMenu() {
  let exit = false;
  while (!exit) {
    const { choice } = await inquirer.prompt({
      type: 'list',
      name: 'choice',
      message: 'Select an option',
      choices: ['Diagnostics', 'Scenarios', 'Field Notes', 'Exit']
    });

    if (choice === 'Diagnostics') {
      await runDiagnostics();
    } else if (choice === 'Scenarios') {
      await runScenarios();
    } else if (choice === 'Field Notes') {
      await showFieldNotes();
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

  let total = 0;
  console.log(`\n${domain} Diagnostic`);

  for (const sec of sections) {
    console.log(`\n${sec.skill}`);
    for (const statement of sec.statements) {
      const { score } = await inquirer.prompt({
        type: 'input',
        name: 'score',
        message: `${statement} (1-5)`,
        validate: v => /^[1-5]$/.test(v) || 'Enter a number 1-5'
      });
      total += parseInt(score, 10);
    }
  }

  const interpretation = interpretScore(total);
  console.log(`\nTotal Score: ${total}\n${interpretation}\n`);
}

function interpretScore(score) {
  if (score >= 105) return 'Deep strength – anchors trust and alignment in systems';
  if (score >= 80) return 'Solid foundation – influence and clarity are consistently felt';
  if (score >= 55) return 'Functional but uneven – watch for blind spots under pressure';
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

mainMenu();
