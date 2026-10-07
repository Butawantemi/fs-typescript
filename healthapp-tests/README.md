# Health App E2E Tests

End-to-end tests for the Health App API using Playwright.

## Prerequisites

- Node.js (v20 or higher)
- The healthapp server must be running on `http://localhost:3000`

## Installation

```bash
npm install
npx playwright install
```

## Running the Tests

### Run all tests
```bash
npm test
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### View test report
```bash
npm run report
```

## Test Coverage

The test suite covers the following endpoints:

### GET /hello
- Basic greeting endpoint

### GET /bmi
- Valid BMI calculation
- Missing height parameter
- Missing weight parameter
- Non-numeric height
- Non-numeric weight

### POST /exercises
- Valid exercise statistics calculation
- Missing daily_exercises
- Missing target
- Non-numeric target
- Non-numeric values in daily_exercises array

## GitHub Actions

The repository includes a GitHub Actions workflow that:
1. Builds and starts the healthapp server
2. Runs the E2E tests
3. Uploads test reports as artifacts

The workflow runs on pushes and pull requests to main/master branches.
