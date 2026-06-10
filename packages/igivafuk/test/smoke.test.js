import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

test('igivafuk package resolves create-igivafuk', () => {
  const pkg = require('create-igivafuk/package.json');
  assert.equal(pkg.name, 'create-igivafuk');
});
