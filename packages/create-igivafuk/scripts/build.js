import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outdir = path.join(packageDir, 'dist');

const buildConfig = {
  entryPoints: {
    create: path.join(packageDir, 'src/entries/create-main.js'),
    cli: path.join(packageDir, 'src/entries/cli-main.js'),
  },
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  outdir,
  logLevel: 'info',
};

async function buildWithLocalEsbuild() {
  const esbuild = await import('esbuild');
  await esbuild.build(buildConfig);
}

function buildWithNpxEsbuild() {
  const flags = ['--bundle', '--platform=node', '--target=node18', '--format=esm'];
  const version = '0.25.0';

  for (const [name, entry] of Object.entries(buildConfig.entryPoints)) {
    execFileSync(
      'npx',
      ['--yes', `esbuild@${version}`, entry, ...flags, `--outfile=${path.join(outdir, `${name}.js`)}`],
      { stdio: 'inherit', cwd: packageDir },
    );
  }
}

try {
  await buildWithLocalEsbuild();
} catch {
  console.log('Local esbuild not found, using npx esbuild...');
  buildWithNpxEsbuild();
}

console.log('Built create-igivafuk bundles in dist/');
