This test suite focuses on 3 critical paths of the SauceDemo web application: 
1. Login 
2. Adding a product to the shopping cart 
3. Placing an order 

When a test fails, a bug report is created in xls format. 

The test environment can be configured by changing the base URL in the .env file. 

The test suite is ran automatically (via Github Actions), every day at noon from Monday to Friday. 

In order to run the tests locally, you need to follow the next steps: 

## Clone The Repo

```
git clone git@github.com:klava0303/quantinuum.git
```

## Install Dependencies
Download and install Nodejs https://nodejs.org/en

Install xlsx for creating bug reports in xls format:
```
npm install xlsx
```

Install dotenv for environment variables:
```
npm install dotenv
```

## Run all tests via CLI 
```
npx playwright test 
```

By default Playwright will run all tests in Chrome, Firefox and Webkit in headless mode. 
To specify a browser, tag with: 
```
npx playwright test --project=chromium 
```
(alternatively: firefox, webkit)

To run tests in headed mode, tag with: 
```
npx playwright test --headed 
```

## Run a specific test file
```
npx playwright test login.spec.ts --project=chromium --headed
```

## Reporting 
To see full test report 
```
npx playwright show-report
```
Additionally, when the suite is ran automatically via Github Actions, you can download the created bug reports from Github Actions UI. 
