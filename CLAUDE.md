# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Playwright + TypeScript UI and API tests against the public Toolshop demo (practicesoftwaretesting.com). There is no application code and `package.json` has no scripts; everything runs through `npx playwright`.

## Commands

```
npm ci
npx playwright install
npx playwright test                              # all projects
npx playwright test --project=api                # API only (what CI runs)
npx playwright test --project=ui                 # UI only
npx playwright test tests/ui/login.spec.ts       # single file
npx playwright test -g "valid credentials"       # single test by title
npx playwright show-report
```

## Architecture

- `playwright.config.ts` defines two projects, `ui` (testDir `tests/ui`, Desktop Chrome, baseURL `https://practicesoftwaretesting.com`) and `api` (testDir `tests/api`, baseURL `https://api.practicesoftwaretesting.com`). `testIdAttribute` is `data-test`, so `getByTestId` targets `data-test` attributes.
- `fixtures/fixtures.ts` is the single entry point: specs import `test`/`expect` from `../../fixtures/fixtures` (not `@playwright/test`) and receive page objects (`pages/`) and API clients (`api/`) as fixtures. New page objects or API clients must be registered there.
- API clients in `api/` wrap an `APIRequestContext` and return the raw response; assertions stay in the specs. Response types live in `types/`, shared test users in `data/users.ts`.
- `tests/example.spec.ts` and `tests/ts-basics.spec.ts` are scratch/learning files and don't belong to either project's testDir.

## CI

`.github/workflows/playwright.yml` runs only `--project=api` in the Playwright Docker image (pinned to v1.64.1, matching `@playwright/test`; keep them in sync when upgrading). UI tests are skipped because Cloudflare blocks GitHub-hosted runners. On CI: 2 retries, 1 worker, junit + html reporters.


## Rules
- Never hardcode credentials in specs; take test users from `data/users.ts`.
- New page objects and API clients must come through fixtures, never `new` in a spec.
- Before saying "done", run the tests you changed and show the result.
- Never weaken a test to make it green (no wider locators, removed assertions, .skip, longer timeouts). If you can't make it pass honestly, stop and report what you tried.
- Before running a shell command that is not in the allow list, explain in one line what it does and why.