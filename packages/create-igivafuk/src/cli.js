import { BRAND_NAME, TAGLINE, WEBSITE_URL } from './constants.js';

function printMainHelp() {
  console.log(`
${BRAND_NAME} — ${TAGLINE}

Usage:
  npx igivafuk <command> [options]

Commands:
  create [name]   Scaffold a new structured project
  doctor [dir]    Check if a project follows igivafuk structure

Options:
  -h, --help      Show help

Quick start:
  npm create igivafuk@latest my-app
  npx igivafuk doctor

Website: ${WEBSITE_URL}
`);
}

export async function runCli(argv = process.argv) {
  const [, , command, ...rest] = argv;

  if (!command || command === '--help' || command === '-h') {
    printMainHelp();
    return;
  }

  if (command === 'create') {
    const { runCreate } = await import('./create.js');
    await runCreate(['node', 'create-igivafuk', ...rest]);
    return;
  }

  if (command === 'doctor') {
    const { runDoctor } = await import('./doctor.js');
    await runDoctor(['node', 'igivafuk', 'doctor', ...rest]);
    return;
  }

  console.error(`Unknown command: ${command}`);
  printMainHelp();
  process.exit(1);
}
