import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import inquirer from 'inquirer';

const client = new Anthropic(); // uses ANTHROPIC_API_KEY env var

function extractQuestion(content) {
  const match = content.match(/### Behavioral Interview Questions\n([\s\S]*?)(?=\n###|\n---)/);
  if (!match) return null;
  const lines = match[1].split('\n').filter(l => l.trim().startsWith('-'));
  if (!lines.length) return null;
  return lines[0].replace(/^-\s*"?/, '').replace(/"?\s*$/, '').trim();
}

function extractRubric(content) {
  const match = content.match(/### Scoring Rubric[\s\S]*?(?=\n---|\n## )/);
  return match ? match[0] : '';
}

function extractCoaching(content) {
  const match = content.match(/## Coaching Recommendations([\s\S]*?)(?=\n---|\n## |$)/);
  return match ? match[1].trim() : '';
}

export async function scoreSkill(skillName, skillFile, role = 'General') {
  let content = '';
  try {
    content = fs.readFileSync(skillFile, 'utf8');
  } catch {
    return null; // file missing — skip gracefully
  }

  const question = extractQuestion(content);
  const rubric = extractRubric(content);
  const coaching = extractCoaching(content);

  if (!question) return null;

  console.log(`\n── ${skillName} ──`);
  console.log(`\n${question}\n`);

  const { answer } = await inquirer.prompt({
    type: 'input',
    name: 'answer',
    message: '▶',
  });

  if (!answer.trim()) return null;

  const system = `You are evaluating a professional's mastery of the meta-skill: "${skillName}".
This person works as a ${role}. Evaluate their answer in the professional context of that role. Evidence grounded in their actual work domain (real decisions, real situations, real people) should be weighted higher than abstract or hypothetical examples.

${rubric}

Scoring rules:
1. If the answer contains no specific behavioral evidence — no concrete situation described, no observable actions taken, no outcome referenced — score no higher than 2 regardless of the claim. Set evidence to "Insufficient behavioral evidence provided."
2. Score based on specific behavioral evidence of the meta-skill in action, not self-reported character traits. Claims of discipline, persistence, or consistency without concrete situational evidence are not sufficient for scores above 2.
3. Score 1–5 based on rubric dimensions. Return ONLY valid JSON:
- "score": integer 1–5
- "evidence": one sentence max 20 words — what the answer concretely reveals about their level

No markdown, no explanation. Raw JSON only.`;

  try {
    const msg = await client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 150,
      system,
      messages: [{ role: 'user', content: `Answer: "${answer}"` }],
    });

    const parsed = JSON.parse(msg.content[0].text.trim());
    const score = Math.min(5, Math.max(1, parseInt(parsed.score)));
    console.log(`  → ${score}/5  ${parsed.evidence}`);
    return { skill: skillName, score, evidence: parsed.evidence, coaching };
  } catch {
    // Fallback to self-rating if API fails
    const { fallback } = await inquirer.prompt({
      type: 'input',
      name: 'fallback',
      message: 'Rate yourself 1–5:',
      validate: v => /^[1-5]$/.test(v) || 'Enter 1–5',
    });
    return { skill: skillName, score: parseInt(fallback), evidence: answer.slice(0, 100), coaching, selfRated: true };
  }
}
