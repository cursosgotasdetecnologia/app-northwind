// @ts-check
import dotenv from "dotenv";
dotenv.config();
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */

  timeout: 10000, // timeout do teste inteiro (3 segundos)
  expect: {
    timeout: 5000, // timeout de cada expect (5 segundos)
  },

  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: "html",
  reporter: [
    ["html", { open: "never" }], // gera HTML sem abrir automatico
    ["allure-playwright"],
    ["line"], // mostra no terminal tambem
    //["allure-playwright/reporter"],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,
    //baseURL: 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    // Viewport — tamanho da janela do browser
    viewport: { width: 1440, height: 900 },

    // Headless — false para ver o browser, true para CI
    headless: true,

    // SlowMo — adiciona delay entre acoes (em ms)
     slowMo: 3000, // 500ms = 0.5 segundo entre cada acao

    trace: "on-first-retry",
    // trace: 'on',            // grava trace de todos os testes
    // trace: 'off',           // nunca grava trace
    // trace: 'retain-on-failure', // grava e mantem so os que falharam

    screenshot: "only-on-failure", // so tira quando o teste falha
    //screenshot: 'on',           // tira em todos os testes
    //screenshot: "off", // nunca tira

    video: "retain-on-failure", // grava so quando o teste falha
    // video: 'on',             // grava todos os testes
    //video: "off", // nunca grava
    // video: 'on-first-retry', // grava so no primeiro retry
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    /*
    { 
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
