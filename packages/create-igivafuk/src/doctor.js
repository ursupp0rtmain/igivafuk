import path from 'node:path';
import fs from 'node:fs/promises';
import { intro, outro } from '@clack/prompts';
import { REQUIRED_FILES, BRAND_NAME, PACKAGE_NAME, TAGLINE, WEBSITE_URL } from './constants.js';
import { pathExists } from './utils.js';

function parseDoctorArgs(argv) {
  const args = argv.slice(2);
  const options = {
    directory: process.cwd(),
    help: false,
    json: false,
  };

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--json') {
      options.json = true;
    } else if (arg === '--dir' || arg === '-C') {
      options.directory = path.resolve(args[++i]);
    } else if (!arg.startsWith('-') && arg !== 'doctor') {
      options.directory = path.resolve(arg);
    }
  }

  return options;
}

export function printDoctorHelp() {
  console.log(`
${BRAND_NAME} doctor — check if your project follows the structure

Usage:
  npx igivafuk doctor [directory] [options]

Options:
  -C, --dir <path>   Directory to check (default: current)
  --json             Output results as JSON
  -h, --help         Show help

Learn more: ${WEBSITE_URL}
`);
}

async function readManifest(directory) {
  const manifestPath = path.join(directory, '.igivafuk.json');
  if (!(await pathExists(manifestPath))) {
    return null;
  }
  const raw = await fs.readFile(manifestPath, 'utf8');
  return JSON.parse(raw);
}

export async function checkProject(directory) {
  const missing = [];
  const present = [];

  for (const file of REQUIRED_FILES) {
    const filePath = path.join(directory, file);
    if (await pathExists(filePath)) {
      present.push(file);
    } else {
      missing.push(file);
    }
  }

  const manifest = await readManifest(directory);
  const score = Math.round((present.length / REQUIRED_FILES.length) * 100);
  const healthy = missing.length === 0;

  return {
    brand: BRAND_NAME,
    directory,
    healthy,
    score,
    present,
    missing,
    manifest,
  };
}

export async function runDoctor(argv = process.argv) {
  const options = parseDoctorArgs(argv);

  if (options.help) {
    printDoctorHelp();
    return;
  }

  if (!options.json) {
    intro(` ${BRAND_NAME} doctor — ${TAGLINE}`);
  }

  const result = await checkProject(options.directory);

  if (options.json) {
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.healthy ? 0 : 1);
  }

  console.log(`\nDirectory: ${options.directory}`);
  console.log(`Score: ${result.score}% (${result.present.length}/${REQUIRED_FILES.length} required files)`);

  if (result.manifest) {
    console.log(`Scaffold: ${result.manifest.scaffold ?? 'unknown'} (${result.manifest.createdWith ?? 'unknown'})`);
  } else {
    console.log('Manifest: .igivafuk.json not found (not scaffolded with igivafuk?)');
  }

  if (result.missing.length > 0) {
    console.log('\nMissing:');
    for (const file of result.missing) {
      console.log(`  ✗ ${file}`);
    }
  } else {
    console.log('\nAll required files present. Your project has structure — keep it that way.');
  }

  if (!result.healthy) {
    console.log(`\nFix it: npx ${PACKAGE_NAME} <name> for a fresh scaffold, or add missing files manually.`);
    console.log(`Docs: ${WEBSITE_URL}`);
    process.exit(1);
  }

  outro(`Looking good. Now build something worth giving a f*** about.`);
}
