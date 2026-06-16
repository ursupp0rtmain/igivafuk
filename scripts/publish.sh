#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! grep -q '"publish:cli"' package.json 2>/dev/null; then
  echo "Error: Run this script from the igivafuk repository root."
  echo "Expected package.json with publish:cli script."
  exit 1
fi

if [[ -z "${NODE_AUTH_TOKEN:-}" ]]; then
  if command -v gh >/dev/null 2>&1; then
    export NODE_AUTH_TOKEN="$(gh auth token)"
  else
    echo "Set NODE_AUTH_TOKEN to a GitHub token with write:packages, or install gh and run gh auth login."
    exit 1
  fi
fi

npm config set @ursupp0rtmain:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken "$NODE_AUTH_TOKEN"

npm run publish:cli
