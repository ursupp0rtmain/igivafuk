import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TEXT_EXTENSIONS } from './constants.js';

export function getTemplateDir() {
  const packageRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
  );
  return path.join(packageRoot, 'templates', 'default');
}

export function toKebabCase(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function toTitleCase(value) {
  return value
    .split(/[\s-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export function toIdentifier(value) {
  const identifier = toKebabCase(value).replaceAll('-', '_');
  if (!identifier) return 'my_project';
  if (/^\d/.test(identifier)) return `project_${identifier}`;
  return identifier;
}

export function toPascalIdentifier(value) {
  const identifier = toKebabCase(value)
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  if (!identifier) return 'MyProject';
  if (/^\d/.test(identifier)) return `Project${identifier}`;
  return identifier;
}

export function buildTemplateVars({ projectName, description, version, preset }) {
  const slug = toKebabCase(projectName);
  const title = toTitleCase(projectName);
  const moduleName = toIdentifier(projectName);
  const pascalName = toPascalIdentifier(projectName);
  const languageId = preset?.language ?? 'none';

  const vars = {
    PROJECT_NAME: title || 'My Project',
    PROJECT_SLUG: slug || 'my-project',
    PROJECT_MODULE: moduleName,
    PROJECT_PASCAL: pascalName,
    PROJECT_PACKAGE: `com.example.${moduleName}`,
    PROJECT_PACKAGE_PATH: `com/example/${moduleName}`,
    PROJECT_DESCRIPTION: description || 'A structured project built with igivafuk.',
    SETUP_ID: preset?.id ?? 'default',
    SETUP_LABEL: preset?.label ?? 'Minimal',
    SETUP_LANGUAGE: languageId,
    SETUP_DESCRIPTION: preset?.description ?? 'Language-neutral project guardrails.',
    SETUP_STRUCTURE: preset?.structure ?? 'Add your stack-specific structure when the project is ready.',
    SETUP_LOCAL_SETUP: preset?.localSetup ?? 'Document the stack, install command, test command, and runtime requirements once chosen.',
    SETUP_AGENT_GUIDANCE: preset?.agentGuidance ?? 'Keep the project small and add stack-specific structure only when the architecture needs it.',
    SETUP_CONTRIBUTING_GUIDANCE: preset?.contributingGuidance ?? 'Document stack-specific commands in README.md before relying on them in CI or reviews.',
    SETUP_ARCHITECTURE_GUIDE: preset?.architectureGuide ?? 'Document the important boundaries, data flows, and trade-offs for this project here.',
    YEAR: String(new Date().getFullYear()),
    IGIVAFUK_VERSION: version,
    WEBSITE_URL: 'https://idontgivaf.uk',
    BRAND_NAME: 'igivafuk',
    TAGLINE: 'Structure over slop.',
  };

  for (const key of [
    'SETUP_STRUCTURE',
    'SETUP_LOCAL_SETUP',
    'SETUP_AGENT_GUIDANCE',
    'SETUP_CONTRIBUTING_GUIDANCE',
    'SETUP_ARCHITECTURE_GUIDE',
  ]) {
    vars[key] = applyTemplate(vars[key], vars);
  }

  return vars;
}

export function applyTemplate(content, vars) {
  return Object.entries(vars).reduce((result, [key, value]) => {
    return result.replaceAll(`{{${key}}}`, value);
  }, content);
}

function mapTemplateFileName(name) {
  if (name === '_gitignore') return '.gitignore';
  return name;
}

function isTextFile(filePath) {
  const basename = path.basename(filePath);
  const ext = path.extname(filePath);

  if (
    basename === '.gitkeep' ||
    basename === '.gitignore' ||
    basename === '_gitignore' ||
    basename === '.editorconfig'
  ) {
    return true;
  }

  return TEXT_EXTENSIONS.has(ext);
}

export async function copyTemplate({ templateDir, targetDir, vars }) {
  await fs.mkdir(targetDir, { recursive: true });

  const entries = await fs.readdir(templateDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(templateDir, entry.name);
    const destName = mapTemplateFileName(entry.name);
    const destPath = path.join(targetDir, destName);

    if (entry.isDirectory()) {
      await copyTemplate({ templateDir: sourcePath, targetDir: destPath, vars });
      continue;
    }

    if (await isTextFile(sourcePath)) {
      const content = await fs.readFile(sourcePath, 'utf8');
      await fs.writeFile(destPath, applyTemplate(content, vars), 'utf8');
      continue;
    }

    await fs.copyFile(sourcePath, destPath);
  }
}

export async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function initGit(targetDir) {
  const { execFile } = await import('node:child_process');
  const { promisify } = await import('node:util');
  const exec = promisify(execFile);

  await exec('git', ['init'], { cwd: targetDir });
  await exec('git', ['add', '.'], { cwd: targetDir });
  await exec('git', ['commit', '-m', 'Initial commit from create-igivafuk'], { cwd: targetDir });
}
