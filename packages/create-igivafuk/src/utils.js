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

export function buildTemplateVars({ projectName, description, version }) {
  const slug = toKebabCase(projectName);
  const title = toTitleCase(projectName);

  return {
    PROJECT_NAME: title || 'My Project',
    PROJECT_SLUG: slug || 'my-project',
    PROJECT_DESCRIPTION: description || 'A structured project built with igivafuk.',
    YEAR: String(new Date().getFullYear()),
    IGIVAFUK_VERSION: version,
    WEBSITE_URL: 'https://idontgivaf.uk',
    BRAND_NAME: 'igivafuk',
    TAGLINE: 'Structure over slop.',
  };
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
