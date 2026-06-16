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

  test('scaffolds a language-specific project structure', async () => {
    const projectName = 'typed-app';
    const originalCwd = process.cwd();

    try {
      process.chdir(tempRoot);
      await runCreate([
        'node',
        'create-igivafuk',
        projectName,
        '-d',
        'Typed app',
        '--language',
        'typescript',
        '-y',
        '--no-git',
      ]);

      const projectDir = path.join(tempRoot, projectName);
      const manifest = JSON.parse(await fs.readFile(path.join(projectDir, '.igivafuk.json'), 'utf8'));
      const readme = await fs.readFile(path.join(projectDir, 'README.md'), 'utf8');
      const agents = await fs.readFile(path.join(projectDir, 'AGENTS.md'), 'utf8');
      const contributing = await fs.readFile(path.join(projectDir, 'CONTRIBUTING.md'), 'utf8');
      const architecture = await fs.readFile(path.join(projectDir, 'docs/architecture.md'), 'utf8');

      assert.equal(manifest.scaffold, 'typescript');
      assert.equal(manifest.language, 'typescript');
      assert.ok(readme.includes('Setup preset: **TypeScript** (`typescript`)'));
      assert.ok(readme.includes('npm run typecheck'));
      assert.ok(agents.includes('TypeScript-specific rules'));
      assert.ok(contributing.includes('For TypeScript changes'));
      assert.ok(architecture.includes('TypeScript boundaries'));
      await fs.access(path.join(projectDir, 'package.json'));
      await fs.access(path.join(projectDir, 'tsconfig.json'));
      await fs.access(path.join(projectDir, 'src/index.ts'));
      await fs.access(path.join(projectDir, 'test/index.test.ts'));
      await fs.access(path.join(projectDir, 'types/.gitkeep'));

      const check = await checkProject(projectDir);
      assert.equal(check.healthy, true);
      assert.equal(check.score, 100);
    } finally {
      process.chdir(originalCwd);
      await fs.rm(path.join(tempRoot, projectName), { recursive: true, force: true });
    }
  });

  test('scaffolds a C# project structure', async () => {
    const projectName = 'sharp-service';
    const originalCwd = process.cwd();

    try {
      process.chdir(tempRoot);
      await runCreate([
        'node',
        'create-igivafuk',
        projectName,
        '-d',
        'Sharp service',
        '--language',
        'c#',
        '-y',
        '--no-git',
      ]);

      const projectDir = path.join(tempRoot, projectName);
      const manifest = JSON.parse(await fs.readFile(path.join(projectDir, '.igivafuk.json'), 'utf8'));
      const readme = await fs.readFile(path.join(projectDir, 'README.md'), 'utf8');
      const agents = await fs.readFile(path.join(projectDir, 'AGENTS.md'), 'utf8');
      const contributing = await fs.readFile(path.join(projectDir, 'CONTRIBUTING.md'), 'utf8');
      const architecture = await fs.readFile(path.join(projectDir, 'docs/architecture.md'), 'utf8');

      assert.equal(manifest.scaffold, 'csharp');
      assert.equal(manifest.language, 'csharp');
      assert.ok(readme.includes('Setup preset: **C# / .NET** (`csharp`)'));
      assert.ok(readme.includes('dotnet build'));
      assert.ok(agents.includes('C#/.NET-specific rules'));
      assert.ok(contributing.includes('For C#/.NET changes'));
      assert.ok(architecture.includes('C#/.NET boundaries'));
      await fs.access(path.join(projectDir, 'Directory.Build.props'));
      await fs.access(path.join(projectDir, 'src/SharpService/SharpService.csproj'));
      await fs.access(path.join(projectDir, 'src/SharpService/Program.cs'));
      await fs.access(path.join(projectDir, 'tests/SharpService.Tests/SharpService.Tests.csproj'));
      await fs.access(path.join(projectDir, 'tests/SharpService.Tests/SmokeTests.cs'));

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
