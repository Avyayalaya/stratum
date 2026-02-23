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

export async function scoreSkill(skillName, skillFile) {
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

${rubric}

Score the person 1–5 based on their answer. Return ONLY valid JSON with two fields:
- "score": integer 1–5 (overall weighted score across rubric dimensions)
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
    return { skill: skillName, score: parseInt(fallback), evidence: answer.slice(0, 100), coaching };
  }
}
