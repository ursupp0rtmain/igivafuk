import path from 'node:path';
import { intro, outro, text, confirm, spinner, cancel, isCancel } from '@clack/prompts';
import {
  buildTemplateVars,
  copyTemplate,
  getTemplateDir,
  initGit,
  makeScriptExecutable,
  pathExists,
  toKebabCase,
} from './utils.js';
import { BRAND_NAME, NPM_SCOPE, PACKAGE_NAME, TAGLINE, WEBSITE_URL } from './constants.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

function getPackageVersion() {
  const pkgPath = fileURLToPath(new URL('../package.json', import.meta.url));
  return JSON.parse(readFileSync(pkgPath, 'utf8')).version;
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const options = {
    projectName: undefined,
    description: undefined,
    yes: false,
    git: true,
    help: false,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--yes' || arg === '-y') {
      options.yes = true;
    } else if (arg === '--no-git') {
      options.git = false;
    } else if (arg === '--description' || arg === '-d') {
      options.description = args[++i];
    } else if (!arg.startsWith('-') && !options.projectName) {
      options.projectName = arg;
    }
  }

  return options;
}

export function printCreateHelp() {
  console.log(`
${BRAND_NAME} — ${TAGLINE}

Usage:
  npm create ${NPM_SCOPE}/igivafuk@latest <project-name>
  npx ${PACKAGE_NAME} <project-name> [options]

Options:
  -d, --description <text>  Project description
  -y, --yes                 Skip prompts and use defaults
  --no-git                  Skip git init
  -h, --help                Show help

Examples:
  npm create ${NPM_SCOPE}/igivafuk@latest my-app
  npx ${PACKAGE_NAME} my-app -d "My awesome SaaS" -y

Learn more: ${WEBSITE_URL}
`);
}

export async function runCreate(argv = process.argv) {
  const options = parseArgs(argv);

  if (options.help) {
    printCreateHelp();
    return;
  }

  intro(` ${BRAND_NAME} — you said you didn't give a f***, turns out you do`);

  let projectName = options.projectName;
  let description = options.description ?? '';
  let initGitRepo = options.git;

  if (!options.yes) {
    if (!projectName) {
      const nameResult = await text({
        message: 'Project name',
        placeholder: 'my-awesome-app',
        validate: (value) => {
          if (!value?.trim()) return 'Project name is required';
          if (!toKebabCase(value)) return 'Use letters and numbers only';
        },
      });
      if (isCancel(nameResult)) {
        cancel('Cancelled.');
        process.exit(0);
      }
      projectName = nameResult;
    }

    const descResult = await text({
      message: 'One-line description',
      placeholder: 'A structured project built with AI agents',
      initialValue: description,
    });
    if (isCancel(descResult)) {
      cancel('Cancelled.');
      process.exit(0);
    }
    description = descResult;

    const gitResult = await confirm({
      message: 'Initialize git repository?',
      initialValue: initGitRepo,
    });
    if (isCancel(gitResult)) {
      cancel('Cancelled.');
      process.exit(0);
    }
    initGitRepo = gitResult;
  }

  if (!projectName?.trim()) {
    console.error('Error: project name is required.');
    printCreateHelp();
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), projectName);

  if (await pathExists(targetDir)) {
    console.error(`Error: directory "${projectName}" already exists.`);
    process.exit(1);
  }

  const version = getPackageVersion();
  const vars = buildTemplateVars({ projectName, description, version });
  const templateDir = getTemplateDir();
  const s = spinner();

  s.start('Scaffolding structured project...');
  await copyTemplate({ templateDir, targetDir, vars });
  await makeScriptExecutable(targetDir);

  if (initGitRepo) {
    s.message('Initializing git...');
    await initGit(targetDir);
  }

  s.stop('Project created.');

  outro(`Done! cd ${projectName} and start building something good.\n\n  ${WEBSITE_URL}`);
}
