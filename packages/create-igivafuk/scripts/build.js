import * as esbuild from 'esbuild';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

await esbuild.build({
  entryPoints: {
    create: path.join(packageDir, 'src/entries/create-main.js'),
    cli: path.join(packageDir, 'src/entries/cli-main.js'),
  },
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  outdir: path.join(packageDir, 'dist'),
  logLevel: 'info',
});

console.log('Built create-igivafuk bundles in dist/');
