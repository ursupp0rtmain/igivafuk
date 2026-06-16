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
    localSetup: `No runtime stack is selected yet.

Before adding source code, document the chosen language, package manager, install command, test command, and build command here.`,
    agentGuidance: `This project is intentionally language-neutral.

- Do not add framework folders until a stack is chosen.
- Keep new files grouped by purpose and document any new conventions in README.md.
- If a language is selected later, prefer regenerating or mirroring one of the language presets instead of inventing an ad hoc layout.`,
    contributingGuidance: `Before the first implementation PR, add the chosen stack commands to README.md:

- install command
- test command
- build command
- lint/format command, if used`,
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
    localSetup: `Use Node.js 18 or newer.

\`\`\`bash
npm install
npm test
npm start
\`\`\`

Keep application code in \`src/\`, tests in \`test/\`, operational scripts in \`scripts/\`, and runtime configuration examples in \`config/\`.`,
    agentGuidance: `JavaScript-specific rules:

- Keep ESM imports explicit and include file extensions for local imports.
- Put runnable code in \`src/\`; keep tests in \`test/\` using \`node:test\`.
- Do not commit \`node_modules/\`, build output, coverage, or secrets.
- Add dependencies only when the standard library or a small local helper is not enough.`,
    contributingGuidance: `For JavaScript changes:

\`\`\`bash
npm install
npm test
\`\`\`

Update tests in \`test/\` with behavior changes and keep public exports small and intentional.`,
    architectureGuide: `# Architecture

## JavaScript boundaries

- \`src/\` contains runtime code.
- \`test/\` contains Node test runner tests.
- \`config/\` is for checked-in examples and non-secret defaults.
- \`scripts/\` is for developer or release automation.

## Decisions

Record module boundaries, external dependencies, and runtime assumptions for {{PROJECT_NAME}} here.`,
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
        content: `{{SETUP_ARCHITECTURE_GUIDE}}
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
    localSetup: `Use Node.js 18 or newer.

\`\`\`bash
npm install
npm run typecheck
npm test
\`\`\`

Keep TypeScript source in \`src/\`, tests in \`test/\`, shared declarations in \`types/\`, and generated JavaScript in \`dist/\`.`,
    agentGuidance: `TypeScript-specific rules:

- Keep \`strict\` TypeScript enabled; do not silence type errors with \`any\` unless the boundary is documented.
- Use explicit exports from \`src/\` and keep test files in \`test/\`.
- Import compiled-relative paths the NodeNext way, including \`.js\` extensions in TypeScript imports.
- This preset is framework-neutral; do not add Angular, React, Next.js, or NestJS conventions unless the project explicitly adopts that framework.`,
    contributingGuidance: `For TypeScript changes:

\`\`\`bash
npm install
npm run typecheck
npm test
\`\`\`

Update \`types/\` only for shared declarations. Keep generated \`dist/\` output out of source review unless release policy requires it.`,
    architectureGuide: `# Architecture

## TypeScript boundaries

- \`src/\` contains typed runtime code.
- \`test/\` contains typed tests that compile before execution.
- \`types/\` contains shared declarations only when needed.
- \`config/\` and \`scripts/\` stay separate from runtime modules.

## Framework note

This is a framework-neutral TypeScript setup. If {{PROJECT_NAME}} adopts Angular, React, Next.js, or NestJS, document the framework-specific app boundaries here.`,
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
        content: `{{SETUP_ARCHITECTURE_GUIDE}}
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
    localSetup: `Use Python 3.11 or newer.

\`\`\`bash
python -m venv .venv
. .venv/bin/activate
python -m pip install -e .
python -m pytest
\`\`\`

Keep importable package code under \`src/{{PROJECT_MODULE}}/\`, tests in \`tests/\`, and exploratory notebooks in \`notebooks/\`.`,
    agentGuidance: `Python-specific rules:

- Keep the \`src/\` layout intact so tests import the installed package, not the working directory by accident.
- Put package code in \`src/{{PROJECT_MODULE}}/\` and tests in \`tests/\`.
- Do not commit virtual environments, caches, notebooks with secrets, or generated data.
- Prefer small modules with typed function signatures for public boundaries.`,
    contributingGuidance: `For Python changes:

\`\`\`bash
python -m pip install -e .
python -m pytest
\`\`\`

Add or update tests in \`tests/\` for behavior changes and document new runtime dependencies in \`pyproject.toml\`.`,
    architectureGuide: `# Architecture

## Python boundaries

- \`src/{{PROJECT_MODULE}}/\` contains importable package code.
- \`tests/\` contains pytest tests.
- \`notebooks/\` is for exploration only; production logic belongs in \`src/\`.
- \`config/\` is for non-secret defaults and examples.

## Decisions

Document package boundaries, data flow, and external integrations for {{PROJECT_NAME}} here.`,
    directories: ['config', 'docs', 'notebooks', 'scripts', 'src/{{PROJECT_MODULE}}', 'tests'],
    files: [
      {
        path: 'pyproject.toml',
        content: `[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
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
        content: `{{SETUP_ARCHITECTURE_GUIDE}}
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
    localSetup: `Use Go 1.22 or newer.

\`\`\`bash
go test ./...
go run ./cmd/{{PROJECT_SLUG}}
\`\`\`

Keep binaries under \`cmd/\`, private application code under \`internal/\`, reusable packages under \`pkg/\`, and API contracts under \`api/\`.`,
    agentGuidance: `Go-specific rules:

- Keep executable entrypoints in \`cmd/{{PROJECT_SLUG}}/\`.
- Keep private application code under \`internal/\`; only use \`pkg/\` for reusable public packages.
- Run \`gofmt\` on changed Go files.
- Avoid global state unless it is an explicit process-level boundary.`,
    contributingGuidance: `For Go changes:

\`\`\`bash
gofmt -w <changed-go-files>
go test ./...
\`\`\`

Add tests next to the package they exercise and keep command wiring separate from business logic.`,
    architectureGuide: `# Architecture

## Go boundaries

- \`cmd/{{PROJECT_SLUG}}/\` contains the executable entrypoint.
- \`internal/app/\` contains private application logic.
- \`pkg/\` is reserved for reusable packages with stable APIs.
- \`api/\` is for schemas, contracts, or protocol definitions.

## Decisions

Document package ownership, dependency direction, and external service boundaries for {{PROJECT_NAME}} here.`,
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
        content: `{{SETUP_ARCHITECTURE_GUIDE}}
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
    localSetup: `Use the stable Rust toolchain.

\`\`\`bash
cargo test
cargo run
\`\`\`

Keep library code in \`src/lib.rs\`, binary wiring in \`src/main.rs\`, integration tests in \`tests/\`, and examples in \`examples/\`.`,
    agentGuidance: `Rust-specific rules:

- Keep reusable behavior in the library crate; keep \`main.rs\` thin.
- Prefer explicit error types and avoid \`unwrap()\` outside tests or examples.
- Run \`cargo fmt\` before committing Rust changes.
- Use \`crates/\` only when the project truly needs a workspace split.`,
    contributingGuidance: `For Rust changes:

\`\`\`bash
cargo fmt
cargo test
\`\`\`

Add unit tests near the code and integration tests under \`tests/\` for public behavior.`,
    architectureGuide: `# Architecture

## Rust boundaries

- \`src/lib.rs\` contains reusable crate behavior.
- \`src/main.rs\` contains binary startup and IO wiring.
- \`tests/\` contains integration tests.
- \`examples/\` demonstrates public usage.
- \`crates/\` is reserved for future workspace members.

## Decisions

Document crate boundaries, error handling strategy, and ownership of external integrations for {{PROJECT_NAME}} here.`,
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
        content: `{{SETUP_ARCHITECTURE_GUIDE}}
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
    localSetup: `Use .NET 8 SDK or newer.

\`\`\`bash
dotnet build
dotnet test
dotnet run --project src/{{PROJECT_PASCAL}}/{{PROJECT_PASCAL}}.csproj
\`\`\`

Keep production projects under \`src/\`, test projects under \`tests/\`, and shared build settings in \`Directory.Build.props\`.`,
    agentGuidance: `C#/.NET-specific rules:

- Keep namespaces aligned with the generated project name \`{{PROJECT_PASCAL}}\`.
- Keep production projects under \`src/\` and test projects under \`tests/\`.
- Use nullable reference types and treat warnings as errors.
- Do not mix infrastructure scripts, app code, and test code in the same project folder.`,
    contributingGuidance: `For C#/.NET changes:

\`\`\`bash
dotnet build
dotnet test
\`\`\`

Add tests under \`tests/{{PROJECT_PASCAL}}.Tests/\` and keep shared MSBuild settings in \`Directory.Build.props\`.`,
    architectureGuide: `# Architecture

## C#/.NET boundaries

- \`src/{{PROJECT_PASCAL}}/\` contains production code for the main project.
- \`tests/{{PROJECT_PASCAL}}.Tests/\` contains tests for public behavior.
- \`Directory.Build.props\` contains shared compiler and build settings.
- \`config/\` is for non-secret configuration examples.

## Decisions

Document project boundaries, dependency direction, and runtime hosting assumptions for {{PROJECT_NAME}} here.`,
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
        content: `{{SETUP_ARCHITECTURE_GUIDE}}
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
