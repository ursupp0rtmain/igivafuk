#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! grep -q '"publish:cli"' package.json 2>/dev/null; then
  echo "Error: Run this script from the igivafuk repository root."
  echo "Expected package.json with publish:cli script."
  exit 1
fi

if ! npm whoami >/dev/null 2>&1; then
  echo "Not logged in to npm. Run: npm login"
  exit 1
fi

npm run publish:cli
