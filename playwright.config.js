import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 240000,

  use: {
    browserName: 'chromium',
    headless: false,

    // ✅ Maximize browser window
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 30000,
    navigationTimeout: 60000,
  },
});
