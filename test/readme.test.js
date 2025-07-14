import fs from 'fs/promises';
import assert from 'node:assert';
import { test } from 'node:test';

test('README lists three core domains', async () => {
  const readme = await fs.readFile('README.md', 'utf8');
  assert.ok(readme.includes('## 🧠 The Three Core Domains'));
});
