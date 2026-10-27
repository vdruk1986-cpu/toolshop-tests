toolshop-tests

UI and API tests for the Toolshop demo web shop, written in TypeScript with Playwright.

Project structure
tests/ui – UI tests (login, search, product details)
tests/api – API tests (auth, products)
pages – Page Objects for UI tests
api – API clients (AuthApi, ProductsApi)
fixtures – custom Playwright fixtures (pages and API clients for tests)
data – test data (users)
types – TypeScript types for API responses

How to run

npm ci
npx playwright install
npx playwright test

Open the HTML report after a run:

npx playwright show-report
