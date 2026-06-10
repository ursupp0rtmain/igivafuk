import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { runCreate } from '../src/create.js';
import { checkProject } from '../src/doctor.js';

describe('create-igivafuk', () => {
  /** @type {string} */
  let tempRoot;

  before(async () => {
    tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'igivafuk-test-'));
  });

  after(async () => {
    await fs.rm(tempRoot, { recursive: true, force: true });
  });

  test('scaffolds a project with all required files', async () => {
    const projectName = 'test-app';
    const originalCwd = process.cwd();

    try {
      process.chdir(tempRoot);
      await runCreate(['node', 'create-igivafuk', projectName, '-d', 'Test app', '-y', '--no-git']);

      const projectDir = path.join(tempRoot, projectName);
      const readme = await fs.readFile(path.join(projectDir, 'README.md'), 'utf8');
      const manifest = JSON.parse(await fs.readFile(path.join(projectDir, '.igivafuk.json'), 'utf8'));

      assert.ok(readme.includes('Test App'));
      assert.ok(readme.includes('igivafuk'));
      assert.equal(manifest.project, 'test-app');
      assert.equal(manifest.scaffold, 'default');

      const check = await checkProject(projectDir);
      assert.equal(check.healthy, true);
      assert.equal(check.score, 100);
    } finally {
      process.chdir(originalCwd);
      await fs.rm(path.join(tempRoot, projectName), { recursive: true, force: true });
    }
  });

  test('doctor reports missing files for empty directory', async () => {
    const emptyDir = path.join(tempRoot, 'empty');
    await fs.mkdir(emptyDir, { recursive: true });

    const check = await checkProject(emptyDir);
    assert.equal(check.healthy, false);
    assert.ok(check.missing.length > 0);
    assert.ok(check.score < 100);
  });
});
