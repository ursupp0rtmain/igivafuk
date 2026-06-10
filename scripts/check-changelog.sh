#!/usr/bin/env bash
set -euo pipefail

BASE_BRANCH="${1:-main}"
SKIP_LABEL="${SKIP_CHANGELOG:-}"

if [[ "${SKIP_LABEL}" == "true" ]]; then
  echo "Changelog check skipped (SKIP_CHANGELOG=true)."
  exit 0
fi

if ! git rev-parse --verify "origin/${BASE_BRANCH}" >/dev/null 2>&1; then
  echo "Base branch origin/${BASE_BRANCH} not found. Fetching..."
  git fetch origin "${BASE_BRANCH}"
fi

CHANGED_FILES=$(git diff --name-only "origin/${BASE_BRANCH}"...HEAD)

if echo "${CHANGED_FILES}" | grep -q '^CHANGELOG\.md$'; then
  echo "CHANGELOG.md was updated."
  exit 0
fi

echo "ERROR: CHANGELOG.md was not updated."
echo "Please add an entry under [Unreleased] before opening or merging this pull request."
echo ""
echo "Changed files in this branch:"
echo "${CHANGED_FILES}"
exit 1
