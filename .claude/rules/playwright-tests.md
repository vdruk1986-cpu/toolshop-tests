---
paths:
  - "tests/**/*.spec.ts"
  - "pages/**/*.ts"
---
- Locators: getByTestId or getByRole only, no CSS classes.
- No waitForTimeout; use web-first assertions: await expect(...).
- Assertions only in tests, never inside Page Objects.
- Check the real result, not only that the page shows the input back.