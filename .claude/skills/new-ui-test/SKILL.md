---
name: new-ui-test
description: Use when asked to add a new Playwright UI test for the Toolshop site. Follows this project's Page Object and fixtures structure.
---
1. Read the scenario. If the expected result is unclear, ask before writing code.
2. Find the Page Object in pages/. Add locators and action methods there. No assertions in Page Objects.
3. If the Page Object is new, register it in fixtures/fixtures.ts.
4. Write the test in tests/ui/<feature>.spec.ts. Use fixtures, take data from data/.
5. Assertions: check the real result (for example, the product list), not only the input echo.
6. Run `npx playwright test tests/ui/<file> --project=ui --repeat-each=3`. Fix until green 3 times.
7. Report: what the test checks and the run result.

8. If a locator is not found: read error-context.md or the trace to find the real element. If you still can't find it, stop and ask me. Do not guess further.