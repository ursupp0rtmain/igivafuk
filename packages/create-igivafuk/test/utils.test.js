import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toKebabCase, toTitleCase, applyTemplate, buildTemplateVars } from '../src/utils.js';

test('toKebabCase normalizes project names', () => {
  assert.equal(toKebabCase('My Awesome App'), 'my-awesome-app');
  assert.equal(toKebabCase('  hello_world  '), 'hello-world');
});

test('toTitleCase formats display names', () => {
  assert.equal(toTitleCase('my-awesome-app'), 'My Awesome App');
});

test('applyTemplate replaces placeholders', () => {
  const result = applyTemplate('Hello {{PROJECT_NAME}} from {{BRAND_NAME}}', {
    PROJECT_NAME: 'Test',
    BRAND_NAME: 'igivafuk',
  });
  assert.equal(result, 'Hello Test from igivafuk');
});

test('buildTemplateVars creates expected keys', () => {
  const vars = buildTemplateVars({
    projectName: 'my app',
    description: 'desc',
    version: '0.1.0',
  });
  assert.equal(vars.PROJECT_SLUG, 'my-app');
  assert.equal(vars.PROJECT_NAME, 'My App');
  assert.equal(vars.IGIVAFUK_VERSION, '0.1.0');
});
