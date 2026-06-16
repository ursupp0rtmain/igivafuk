import fs from 'node:fs/promises';
import path from 'node:path';
import { applyTemplate, toKebabCase } from './utils.js';

export const DEFAULT_LANGUAGE_PRESET_ID = 'default';

export const LANGUAGE_PRESETS = [
  {
    id: 'default',
    aliases: ['base', 'minimal', 'none'],
    label: 'Minimal',
    language: 'none',
    description: 'Language-neutral guardrails only. Pick this when the stack is not decided yet.',
    structure: `{{PROJECT_SLUG}}/
+-- .github/
+-- AGENTS.md
+-- CHANGELOG.md
+-- CONTRIBUTING.md
+-- README.md`,
    directories: [],
    files: [],
  },
  {
    id: 'javascript',
    aliases: ['js', 'node', 'nodejs'],
    label: 'JavaScript',
    language: 'javascript',
    description: 'Node-friendly JavaScript layout with source, tests, config, scripts, and docs separated.',
    structure: `{{PROJECT_SLUG}}/
+-- src/
|   +-- index.js
+-- test/
|   +-- index.test.js
+-- config/
+-- docs/
|   +-- architecture.md
+-- scripts/
+-- package.json`,
    directories: ['config', 'docs', 'scripts', 'src', 'test'],
    files: [
      {
        path: 'package.json',
        content: `{
  "name": "{{PROJECT_SLUG}}",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "test": "node --test"
  }
}
`,
      },
      {
        path: 'src/index.js',
        content: `import { pathToFileURL } from 'node:url';

export function main() {
  return '{{PROJECT_SLUG}} is ready.';
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(main());
}
`,
      },
      {
        path: 'test/index.test.js',
        content: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { main } from '../src/index.js';

test('main returns a ready message', () => {
  assert.equal(main(), '{{PROJECT_SLUG}} is ready.');
});
`,
      },
      {
        path: 'docs/architecture.md',
        content: `# Architecture

Document the important boundaries, data flows, and trade-offs for {{PROJECT_NAME}} here.
`,
      },
      { path: 'config/.gitkeep', content: '' },
      { path: 'scripts/.gitkeep', content: '' },
    ],
  },
  {
    id: 'typescript',
    aliases: ['ts', 'node-ts', 'nodejs-ts'],
    label: 'TypeScript',
    language: 'typescript',
    description: 'TypeScript layout with compiled source, tests, typed config, scripts, and docs separated.',
    structure: `{{PROJECT_SLUG}}/
+-- src/
|   +-- index.ts
+-- test/
|   +-- index.test.ts
+-- types/
+-- config/
+-- docs/
|   +-- architecture.md
+-- scripts/
+-- package.json
+-- tsconfig.json`,
    directories: ['config', 'docs', 'scripts', 'src', 'test', 'types'],
    files: [
      {
        path: 'package.json',
        content: `{
  "name": "{{PROJECT_SLUG}}",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "npx tsc -p tsconfig.json",
    "typecheck": "npx tsc --noEmit",
    "test": "npm run build && node --test"
  }
}
`,
      },
      {
        path: 'tsconfig.json',
        content: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "declaration": true,
    "outDir": "dist",
    "rootDir": ".",
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts", "test/**/*.ts", "types/**/*.ts"]
}
`,
      },
      {
        path: 'src/index.ts',
        content: `export function main(): string {
  return '{{PROJECT_SLUG}} is ready.';
}
`,
      },
      {
        path: 'test/index.test.ts',
        content: `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { main } from '../src/index.js';

test('main returns a ready message', () => {
  assert.equal(main(), '{{PROJECT_SLUG}} is ready.');
});
`,
      },
      {
        path: 'docs/architecture.md',
        content: `# Architecture

Document the important boundaries, data flows, and trade-offs for {{PROJECT_NAME}} here.
`,
      },
      { path: 'config/.gitkeep', content: '' },
      { path: 'scripts/.gitkeep', content: '' },
      { path: 'types/.gitkeep', content: '' },
    ],
  },
  {
    id: 'python',
    aliases: ['py'],
    label: 'Python',
    language: 'python',
    description: 'Python src-layout with import-safe package code, tests, config, scripts, notebooks, and docs.',
    structure: `{{PROJECT_SLUG}}/
+-- src/
|   +-- {{PROJECT_MODULE}}/
|       +-- __init__.py
|       +-- main.py
+-- tests/
|   +-- test_smoke.py
+-- config/
+-- docs/
|   +-- architecture.md
+-- notebooks/
+-- scripts/
+-- pyproject.toml`,
    directories: ['config', 'docs', 'notebooks', 'scripts', 'src/{{PROJECT_MODULE}}', 'tests'],
    files: [
      {
        path: 'pyproject.toml',
        content: `[project]
name = "{{PROJECT_SLUG}}"
version = "0.1.0"
requires-python = ">=3.11"

[tool.pytest.ini_options]
testpaths = ["tests"]
pythonpath = ["src"]
`,
      },
      {
        path: 'src/{{PROJECT_MODULE}}/__init__.py',
        content: `"""{{PROJECT_SLUG}} package."""

from .main import main

__all__ = ["main"]
`,
      },
      {
        path: 'src/{{PROJECT_MODULE}}/main.py',
        content: `def main() -> str:
    return "{{PROJECT_SLUG}} is ready."
`,
      },
      {
        path: 'tests/test_smoke.py',
        content: `from {{PROJECT_MODULE}} import main


def test_main_returns_ready_message() -> None:
    assert main() == "{{PROJECT_SLUG}} is ready."
`,
      },
      {
        path: 'docs/architecture.md',
        content: `# Architecture

Document the important boundaries, data flows, and trade-offs for {{PROJECT_NAME}} here.
`,
      },
      { path: 'config/.gitkeep', content: '' },
      { path: 'notebooks/.gitkeep', content: '' },
      { path: 'scripts/.gitkeep', content: '' },
    ],
  },
  {
    id: 'go',
    aliases: ['golang'],
    label: 'Go',
    language: 'go',
    description: 'Go module layout with cmd entrypoint, internal app code, reusable pkg space, configs, and docs.',
    structure: `{{PROJECT_SLUG}}/
+-- cmd/
|   +-- {{PROJECT_SLUG}}/
|       +-- main.go
+-- internal/
|   +-- app/
|       +-- app.go
|       +-- app_test.go
+-- pkg/
+-- api/
+-- configs/
+-- docs/
|   +-- architecture.md
+-- scripts/
+-- go.mod`,
    directories: ['api', 'cmd/{{PROJECT_SLUG}}', 'configs', 'docs', 'internal/app', 'pkg', 'scripts'],
    files: [
      {
        path: 'go.mod',
        content: `module {{PROJECT_SLUG}}

go 1.22
`,
      },
      {
        path: 'cmd/{{PROJECT_SLUG}}/main.go',
        content: `package main

import (
	"fmt"

	"{{PROJECT_SLUG}}/internal/app"
)

func main() {
	fmt.Println(app.Message())
}
`,
      },
      {
        path: 'internal/app/app.go',
        content: `package app

func Message() string {
	return "{{PROJECT_SLUG}} is ready."
}
`,
      },
      {
        path: 'internal/app/app_test.go',
        content: `package app

import "testing"

func TestMessage(t *testing.T) {
	if got := Message(); got != "{{PROJECT_SLUG}} is ready." {
		t.Fatalf("Message() = %q", got)
	}
}
`,
      },
      {
        path: 'docs/architecture.md',
        content: `# Architecture

Document the important boundaries, data flows, and trade-offs for {{PROJECT_NAME}} here.
`,
      },
      { path: 'api/.gitkeep', content: '' },
      { path: 'configs/.gitkeep', content: '' },
      { path: 'pkg/.gitkeep', content: '' },
      { path: 'scripts/.gitkeep', content: '' },
    ],
  },
  {
    id: 'rust',
    aliases: ['rs', 'cargo'],
    label: 'Rust',
    language: 'rust',
    description: 'Cargo-ready Rust layout with library, binary entrypoint, integration tests, examples, benches, and docs.',
    structure: `{{PROJECT_SLUG}}/
+-- src/
|   +-- lib.rs
|   +-- main.rs
+-- tests/
|   +-- smoke.rs
+-- benches/
+-- crates/
+-- docs/
|   +-- architecture.md
+-- examples/
+-- Cargo.toml`,
    directories: ['benches', 'crates', 'docs', 'examples', 'src', 'tests'],
    files: [
      {
        path: 'Cargo.toml',
        content: `[package]
name = "{{PROJECT_MODULE}}"
version = "0.1.0"
edition = "2021"

[dependencies]
`,
      },
      {
        path: 'src/lib.rs',
        content: `pub fn message() -> &'static str {
    "{{PROJECT_SLUG}} is ready."
}
`,
      },
      {
        path: 'src/main.rs',
        content: `fn main() {
    println!("{}", {{PROJECT_MODULE}}::message());
}
`,
      },
      {
        path: 'tests/smoke.rs',
        content: `#[test]
fn message_is_ready() {
    assert_eq!({{PROJECT_MODULE}}::message(), "{{PROJECT_SLUG}} is ready.");
}
`,
      },
      {
        path: 'docs/architecture.md',
        content: `# Architecture

Document the important boundaries, data flows, and trade-offs for {{PROJECT_NAME}} here.
`,
      },
      { path: 'benches/.gitkeep', content: '' },
      { path: 'crates/.gitkeep', content: '' },
      { path: 'examples/.gitkeep', content: '' },
    ],
  },
  {
    id: 'csharp',
    aliases: ['c', 'c#', 'cs', 'dotnet', 'net'],
    label: 'C# / .NET',
    language: 'csharp',
    description: 'Modern .NET layout with source project, test project space, shared build props, config, scripts, and docs.',
    structure: `{{PROJECT_SLUG}}/
+-- src/
|   +-- {{PROJECT_PASCAL}}/
|       +-- {{PROJECT_PASCAL}}.csproj
|       +-- Program.cs
+-- tests/
|   +-- {{PROJECT_PASCAL}}.Tests/
|       +-- {{PROJECT_PASCAL}}.Tests.csproj
|       +-- SmokeTests.cs
+-- config/
+-- docs/
|   +-- architecture.md
+-- scripts/
+-- Directory.Build.props`,
    directories: [
      'config',
      'docs',
      'scripts',
      'src/{{PROJECT_PASCAL}}',
      'tests/{{PROJECT_PASCAL}}.Tests',
    ],
    files: [
      {
        path: 'Directory.Build.props',
        content: `<Project>
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
  </PropertyGroup>
</Project>
`,
      },
      {
        path: 'src/{{PROJECT_PASCAL}}/{{PROJECT_PASCAL}}.csproj',
        content: `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
  </PropertyGroup>
</Project>
`,
      },
      {
        path: 'src/{{PROJECT_PASCAL}}/Program.cs',
        content: `namespace {{PROJECT_PASCAL}};

public static class Program
{
    public static string Message() => "{{PROJECT_SLUG}} is ready.";

    public static void Main()
    {
        Console.WriteLine(Message());
    }
}
`,
      },
      {
        path: 'tests/{{PROJECT_PASCAL}}.Tests/{{PROJECT_PASCAL}}.Tests.csproj',
        content: `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <IsPackable>false</IsPackable>
    <IsTestProject>true</IsTestProject>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="18.6.0" />
    <PackageReference Include="MSTest.TestAdapter" Version="4.2.3" />
    <PackageReference Include="MSTest.TestFramework" Version="4.2.3" />
    <ProjectReference Include="../../src/{{PROJECT_PASCAL}}/{{PROJECT_PASCAL}}.csproj" />
  </ItemGroup>
</Project>
`,
      },
      {
        path: 'tests/{{PROJECT_PASCAL}}.Tests/SmokeTests.cs',
        content: `using Microsoft.VisualStudio.TestTools.UnitTesting;
using {{PROJECT_PASCAL}};

namespace {{PROJECT_PASCAL}}.Tests;

[TestClass]
public sealed class SmokeTests
{
    [TestMethod]
    public void MessageIsReady()
    {
        Assert.AreEqual("{{PROJECT_SLUG}} is ready.", Program.Message());
    }
}
`,
      },
      {
        path: 'docs/architecture.md',
        content: `# Architecture

Document the important boundaries, data flows, and trade-offs for {{PROJECT_NAME}} here.
`,
      },
      { path: 'config/.gitkeep', content: '' },
      { path: 'scripts/.gitkeep', content: '' },
    ],
  },
];

export function resolveLanguagePreset(value = DEFAULT_LANGUAGE_PRESET_ID) {
  const normalized = toKebabCase(value || DEFAULT_LANGUAGE_PRESET_ID);
  return LANGUAGE_PRESETS.find((preset) => {
    return preset.id === normalized || preset.aliases.includes(normalized);
  });
}

export function formatLanguagePresetList() {
  return LANGUAGE_PRESETS.map((preset) => {
    const aliases = preset.aliases.length > 0 ? ` (${preset.aliases.join(', ')})` : '';
    return `  ${preset.id}${aliases} - ${preset.label}: ${preset.description}`;
  }).join('\n');
}

function renderRelativePath(templatePath, vars) {
  const rendered = applyTemplate(templatePath, vars);
  const normalized = path.normalize(rendered);

  if (path.isAbsolute(normalized) || normalized === '..' || normalized.startsWith(`..${path.sep}`)) {
    throw new Error(`Unsafe preset path: ${templatePath}`);
  }

  return normalized;
}

export async function applyLanguagePreset({ targetDir, vars, preset }) {
  for (const directory of preset.directories) {
    const relativePath = renderRelativePath(directory, vars);
    await fs.mkdir(path.join(targetDir, relativePath), { recursive: true });
  }

  for (const file of preset.files) {
    const relativePath = renderRelativePath(file.path, vars);
    const filePath = path.join(targetDir, relativePath);

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, applyTemplate(file.content, vars), 'utf8');
  }
}
